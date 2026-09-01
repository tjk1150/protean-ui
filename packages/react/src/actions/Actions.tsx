'use client'

import * as React from 'react'

/* A toolbar of actions. Mark the ones that may step aside with `secondary`:
   the reference stylesheet keeps everything inline where there is room and
   collapses the secondary set behind a More toggle on compact - as a bottom
   panel on touch, a small flyout for pointers. The marking derives from
   props alone, never from the environment, so the markup is identical on
   the server and every client: which set shows is entirely CSS, like the
   navigation bar's overflow. No policy domain, no JavaScript decision - a
   structural component in the Screen family. */

interface ActionsLocalContextValue {
  readonly closeOverflow: () => void
}

const ActionsLocalContext = /*#__PURE__*/ React.createContext<ActionsLocalContextValue | null>(null)

export interface ActionsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly moreLabel?: string
  readonly children: React.ReactNode
}

function hasSecondary(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) && (child.props as { secondary?: boolean }).secondary === true
  )
}

export function ActionsRoot({
  moreLabel = 'More',
  children,
  ...rest
}: ActionsRootProps): React.JSX.Element {
  const [overflowOpen, setOverflowOpen] = React.useState(false)
  const overflowing = hasSecondary(children)

  const value = React.useMemo<ActionsLocalContextValue>(
    () => ({ closeOverflow: () => setOverflowOpen(false) }),
    []
  )

  return (
    <ActionsLocalContext.Provider value={value}>
      <div
        {...rest}
        role="toolbar"
        data-scope="actions"
        data-overflow-open={overflowOpen || undefined}
      >
        {children}
        {overflowing ? (
          <button
            type="button"
            data-part="overflow-toggle"
            aria-expanded={overflowOpen}
            onClick={() => setOverflowOpen((current) => !current)}
          >
            {moreLabel}
          </button>
        ) : null}
      </div>
    </ActionsLocalContext.Provider>
  )
}

export interface ActionsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /* May step aside when space is tight; collapsed behind More on compact. */
  readonly secondary?: boolean
  /** Marks a destructive action; stamped as data-variant="danger" for styling. */
  readonly destructive?: boolean
  readonly icon?: React.ReactNode
  readonly children: React.ReactNode
}

export function ActionsItem({
  secondary,
  destructive,
  icon,
  children,
  onClick,
  ...rest
}: ActionsItemProps): React.JSX.Element {
  const context = React.useContext(ActionsLocalContext)
  if (!context) {
    throw new Error('<Actions.Item> must be rendered inside <Actions.Root>.')
  }
  return (
    <button
      {...rest}
      type="button"
      data-part="item"
      data-secondary={secondary || undefined}
      {...(destructive ? { 'data-variant': 'danger' } : {})}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && secondary) context.closeOverflow()
      }}
    >
      {icon ? (
        <span data-part="icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span data-part="label">{children}</span>
    </button>
  )
}
