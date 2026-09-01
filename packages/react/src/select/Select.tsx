'use client'

import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { Select as BaseSelect } from '@base-ui/react/select'
import {
  decideOverlay,
  explain,
  type Decision,
  type InstanceOverride,
  type OverlayPresentation
} from '@protean-ui/core'
import * as React from 'react'
import { BoundaryContext } from '../boundary'
import { useProteanContext, useReadTraits } from '../provider'

export interface SelectOption {
  readonly value: string
  readonly label: React.ReactNode
}

interface SelectLocalContextValue {
  readonly decision: Decision<OverlayPresentation> | null
  readonly ariaLabel?: string
  readonly searchable: boolean
  readonly searchPlaceholder?: string
  readonly emptyLabel: React.ReactNode
  readonly optionFor: (value: string) => SelectOption | undefined
}

const SelectLocalContext = /*#__PURE__*/ React.createContext<SelectLocalContextValue | null>(null)

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
  /** Renders a filter input inside the popup, backed by the combobox pattern. Requires items. */
  readonly searchable?: boolean
  readonly searchPlaceholder?: string
  readonly emptyLabel?: React.ReactNode
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
  searchable = false,
  searchPlaceholder,
  emptyLabel = 'No results',
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

  const optionFor = React.useCallback(
    (optionValue: string) => items?.find((option) => option.value === optionValue),
    [items]
  )

  const localValue = React.useMemo<SelectLocalContextValue>(
    () => ({ decision, ariaLabel, searchable, searchPlaceholder, emptyLabel, optionFor }),
    [decision, ariaLabel, searchable, searchPlaceholder, emptyLabel, optionFor]
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

  if (searchable) {
    if (!items) {
      throw new Error('<Select.Root searchable> requires the items prop.')
    }
    const selected = value === undefined ? undefined : value === null ? null : optionFor(value)
    const defaultSelected = defaultValue === undefined ? undefined : (optionFor(defaultValue ?? '') ?? null)
    return (
      <SelectLocalContext.Provider value={localValue}>
        <BaseCombobox.Root
          items={items as SelectOption[]}
          {...(selected !== undefined ? { value: selected } : {})}
          {...(defaultSelected !== undefined ? { defaultValue: defaultSelected } : {})}
          onValueChange={(next: SelectOption | null) => onValueChange?.(next?.value ?? null)}
          open={open}
          onOpenChange={(next) => handleOpenChange(next)}
          name={name}
          disabled={disabled}
          modal={decision?.presentation === 'sheet'}
        >
          {children}
        </BaseCombobox.Root>
      </SelectLocalContext.Provider>
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
  const { decision, ariaLabel: rootLabel, searchable } = useSelectLocalContext('Trigger')

  if (searchable) {
    return (
      <BaseCombobox.Trigger
        className={className}
        aria-label={ariaLabel ?? rootLabel}
        data-scope="select"
        data-part="trigger"
        data-presentation={decision?.presentation}
      >
        <span data-scope="select" data-part="value">
          <BaseCombobox.Value placeholder={placeholder} />
        </span>
      </BaseCombobox.Trigger>
    )
  }

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
  /** Ignored in searchable mode, where the list renders from items so Base UI can filter it. */
  readonly children?: React.ReactNode
}

export function SelectContent({ children }: SelectContentProps): React.JSX.Element | null {
  const { decision, ariaLabel, searchable, searchPlaceholder, emptyLabel } =
    useSelectLocalContext('Content')
  const boundary = React.useContext(BoundaryContext)

  if (!decision) return null

  const presentation = decision.presentation
  const sheet = presentation === 'sheet'
  // Sheets portal into the nearest boundary so the panel acts as the viewport;
  // anchored popovers stay at the document level.
  const contained = sheet && boundary !== null
  const containedAttr = contained ? { 'data-contained': '' } : {}
  const portalProps = contained && boundary ? { container: boundary } : {}

  if (searchable) {
    return (
      <BaseCombobox.Portal {...portalProps}>
        {sheet ? (
          <BaseCombobox.Backdrop
            data-scope="select"
            data-part="backdrop"
            data-presentation={presentation}
            {...containedAttr}
          />
        ) : null}
        <BaseCombobox.Positioner
          data-scope="select"
          data-part="positioner"
          data-presentation={presentation}
          {...containedAttr}
          side="bottom"
          align="start"
          sideOffset={sheet ? 0 : 6}
        >
          <BaseCombobox.Popup
            data-scope="select"
            data-part="popup"
            data-presentation={presentation}
            {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
            {...containedAttr}
          >
            <BaseCombobox.Input
              data-scope="select"
              data-part="search"
              data-presentation={presentation}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder ?? ariaLabel}
            />
            <BaseCombobox.Empty data-scope="select" data-part="empty">
              {emptyLabel}
            </BaseCombobox.Empty>
            <BaseCombobox.List data-scope="select" data-part="list">
              {(option: SelectOption) => (
                <BaseCombobox.Item
                  key={option.value}
                  value={option}
                  data-scope="select"
                  data-part="item"
                >
                  <span data-scope="select" data-part="item-text">
                    {option.label}
                  </span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    )
  }

  return (
    <BaseSelect.Portal {...portalProps}>
      {sheet ? (
        <BaseSelect.Backdrop
          data-scope="select"
          data-part="backdrop"
          data-presentation={presentation}
          {...containedAttr}
        />
      ) : null}
      <BaseSelect.Positioner
        data-scope="select"
        data-part="positioner"
        data-presentation={presentation}
        {...containedAttr}
        side="bottom"
        align="start"
        sideOffset={sheet ? 0 : 6}
        alignItemWithTrigger={false}
      >
        <BaseSelect.Popup
          data-scope="select"
          data-part="popup"
          data-presentation={presentation}
          {...containedAttr}
        >
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
  const { searchable, optionFor } = useSelectLocalContext('Item')

  if (searchable) {
    // The object value keeps Base UI's default label-based filtering working.
    const option = optionFor(value) ?? { value, label: children }
    return (
      <BaseCombobox.Item value={option} data-scope="select" data-part="item">
        <span data-scope="select" data-part="item-text">
          {children}
        </span>
      </BaseCombobox.Item>
    )
  }

  return (
    <BaseSelect.Item value={value} data-scope="select" data-part="item">
      <BaseSelect.ItemText data-scope="select" data-part="item-text">
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}
