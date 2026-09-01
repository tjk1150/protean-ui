'use client'

import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
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

/* An actions menu: a contextual overlay, so it rides the same decision the
   Dialog contextual role and Select use - an anchored popover for pointers,
   an action sheet for compact touch. No new policy surface. */

interface MenuLocalContextValue {
  readonly decision: Decision<OverlayPresentation> | null
}

const MenuLocalContext = /*#__PURE__*/ React.createContext<MenuLocalContextValue | null>(null)

function useMenuLocalContext(part: string): MenuLocalContextValue {
  const context = React.useContext(MenuLocalContext)
  if (!context) {
    throw new Error(`<Menu.${part}> must be rendered inside <Menu.Root>.`)
  }
  return context
}

export interface MenuRootProps {
  readonly presentation?: InstanceOverride<OverlayPresentation>
  readonly defaultOpen?: boolean
  readonly children: React.ReactNode
}

export function MenuRoot({
  presentation,
  defaultOpen = false,
  children
}: MenuRootProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const readTraits = useReadTraits()

  const decide = React.useCallback(
    () => decideOverlay(policy, readTraits(), 'contextual', presentation),
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

  const localValue = React.useMemo<MenuLocalContextValue>(() => ({ decision }), [decision])

  return (
    <MenuLocalContext.Provider value={localValue}>
      <BaseMenu.Root
        open={open}
        onOpenChange={(next) => handleOpenChange(next)}
        modal={decision?.presentation === 'sheet'}
      >
        {children}
      </BaseMenu.Root>
    </MenuLocalContext.Provider>
  )
}

export interface MenuTriggerProps {
  readonly className?: string
  readonly 'aria-label'?: string
  readonly children: React.ReactNode
}

export function MenuTrigger({
  className,
  'aria-label': ariaLabel,
  children
}: MenuTriggerProps): React.JSX.Element {
  const { decision } = useMenuLocalContext('Trigger')
  return (
    <BaseMenu.Trigger
      className={className}
      aria-label={ariaLabel}
      data-scope="menu"
      data-part="trigger"
      data-presentation={decision?.presentation}
    >
      {children}
    </BaseMenu.Trigger>
  )
}

export interface MenuContentProps {
  readonly children: React.ReactNode
}

export function MenuContent({ children }: MenuContentProps): React.JSX.Element | null {
  const { decision } = useMenuLocalContext('Content')
  const boundary = React.useContext(BoundaryContext)

  if (!decision) return null

  const presentation = decision.presentation
  const sheet = presentation === 'sheet'
  // Action sheets portal into the nearest boundary; anchored popovers stay
  // at the document level, same contract as Dialog and Select.
  const contained = sheet && boundary !== null
  const containedAttr = contained ? { 'data-contained': '' } : {}
  const portalProps = contained && boundary ? { container: boundary } : {}

  return (
    <BaseMenu.Portal {...portalProps}>
      {sheet ? (
        <BaseMenu.Backdrop
          data-scope="menu"
          data-part="backdrop"
          data-presentation={presentation}
          {...containedAttr}
        />
      ) : null}
      <BaseMenu.Positioner
        data-scope="menu"
        data-part="positioner"
        data-presentation={presentation}
        side="bottom"
        align="start"
        sideOffset={sheet ? 0 : 6}
        {...containedAttr}
      >
        <BaseMenu.Popup
          data-scope="menu"
          data-part="popup"
          data-presentation={presentation}
          {...containedAttr}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export interface MenuItemProps {
  readonly onSelect?: () => void
  readonly disabled?: boolean
  /** Marks a destructive action; stamped as data-variant="danger" for styling. */
  readonly destructive?: boolean
  readonly children: React.ReactNode
}

export function MenuItem({
  onSelect,
  disabled,
  destructive,
  children
}: MenuItemProps): React.JSX.Element {
  const { decision } = useMenuLocalContext('Item')
  return (
    <BaseMenu.Item
      data-scope="menu"
      data-part="item"
      data-presentation={decision?.presentation}
      {...(destructive ? { 'data-variant': 'danger' } : {})}
      disabled={disabled}
      onClick={() => onSelect?.()}
    >
      {children}
    </BaseMenu.Item>
  )
}

export function MenuSeparator(): React.JSX.Element {
  const { decision } = useMenuLocalContext('Separator')
  return (
    <BaseSeparator
      data-scope="menu"
      data-part="separator"
      data-presentation={decision?.presentation}
    />
  )
}
