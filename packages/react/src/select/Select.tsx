'use client'

import { Select as BaseSelect } from '@base-ui/react/select'
import {
  decideOverlay,
  explain,
  type Decision,
  type InstanceOverride,
  type OverlayPresentation
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useReadTraits } from '../provider'

export interface SelectOption {
  readonly value: string
  readonly label: React.ReactNode
}

interface SelectLocalContextValue {
  readonly decision: Decision<OverlayPresentation> | null
  readonly ariaLabel?: string
}

const SelectLocalContext = React.createContext<SelectLocalContextValue | null>(null)

function useSelectLocalContext(part: string): SelectLocalContextValue {
  const context = React.useContext(SelectLocalContext)
  if (!context) {
    throw new Error(`<Select.${part}> must be rendered inside <Select.Root>.`)
  }
  return context
}

export interface SelectRootProps {
  readonly presentation?: InstanceOverride<OverlayPresentation> | 'native'
  readonly value?: string | null
  readonly defaultValue?: string | null
  readonly onValueChange?: (value: string | null) => void
  readonly defaultOpen?: boolean
  readonly items?: readonly SelectOption[]
  readonly name?: string
  readonly disabled?: boolean
  readonly 'aria-label'?: string
  readonly children: React.ReactNode
}

export function SelectRoot({
  presentation,
  value,
  defaultValue,
  onValueChange,
  defaultOpen = false,
  items,
  name,
  disabled,
  'aria-label': ariaLabel,
  children
}: SelectRootProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const readTraits = useReadTraits()

  const decide = React.useCallback(
    () =>
      decideOverlay(
        policy,
        readTraits(),
        'contextual',
        presentation === 'native' ? undefined : presentation
      ),
    [policy, readTraits, presentation]
  )

  const [open, setOpen] = React.useState(defaultOpen)
  const [decision, setDecision] = React.useState<Decision<OverlayPresentation> | null>(() =>
    defaultOpen ? decide() : null
  )

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        const nextDecision = decide()
        setDecision(nextDecision)
        if (process.env.NODE_ENV !== 'production') {
          console.debug(`[protean] ${explain(nextDecision)}`)
        }
      }
      setOpen(next)
    },
    [decide]
  )

  const localValue = React.useMemo<SelectLocalContextValue>(
    () => ({ decision, ariaLabel }),
    [decision, ariaLabel]
  )

  if (presentation === 'native') {
    if (!items) {
      throw new Error('<Select.Root presentation="native"> requires the items prop.')
    }
    return (
      <select
        data-scope="select"
        data-presentation="native"
        name={name}
        disabled={disabled}
        aria-label={ariaLabel}
        value={value ?? undefined}
        defaultValue={value === undefined ? (defaultValue ?? undefined) : undefined}
        onChange={(event) => onValueChange?.(event.target.value)}
      >
        {items.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <SelectLocalContext.Provider value={localValue}>
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onValueChange?.(next)}
        open={open}
        onOpenChange={handleOpenChange}
        items={items ? items.map(({ value: v, label }) => ({ value: v, label })) : undefined}
        name={name}
        disabled={disabled}
        modal={decision?.presentation === 'sheet'}
      >
        {children}
      </BaseSelect.Root>
    </SelectLocalContext.Provider>
  )
}

export interface SelectTriggerProps {
  readonly placeholder?: string
  readonly 'aria-label'?: string
  readonly className?: string
}

export function SelectTrigger({
  placeholder,
  className,
  'aria-label': ariaLabel
}: SelectTriggerProps): React.JSX.Element {
  const { decision, ariaLabel: rootLabel } = useSelectLocalContext('Trigger')
  return (
    <BaseSelect.Trigger
      className={className}
      aria-label={ariaLabel ?? rootLabel}
      data-scope="select"
      data-part="trigger"
      data-presentation={decision?.presentation}
    >
      <BaseSelect.Value data-scope="select" data-part="value" placeholder={placeholder} />
    </BaseSelect.Trigger>
  )
}

export interface SelectContentProps {
  readonly children: React.ReactNode
}

export function SelectContent({ children }: SelectContentProps): React.JSX.Element | null {
  const { decision } = useSelectLocalContext('Content')

  if (!decision) return null

  const presentation = decision.presentation
  const sheet = presentation === 'sheet'

  return (
    <BaseSelect.Portal>
      {sheet ? (
        <BaseSelect.Backdrop data-scope="select" data-part="backdrop" data-presentation={presentation} />
      ) : null}
      <BaseSelect.Positioner
        data-scope="select"
        data-part="positioner"
        data-presentation={presentation}
        side="bottom"
        align="start"
        sideOffset={sheet ? 0 : 6}
        alignItemWithTrigger={false}
      >
        <BaseSelect.Popup data-scope="select" data-part="popup" data-presentation={presentation}>
          <BaseSelect.List data-scope="select" data-part="list">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export interface SelectItemProps {
  readonly value: string
  readonly children: React.ReactNode
}

export function SelectItem({ value, children }: SelectItemProps): React.JSX.Element {
  return (
    <BaseSelect.Item value={value} data-scope="select" data-part="item">
      <BaseSelect.ItemText data-scope="select" data-part="item-text">
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}
