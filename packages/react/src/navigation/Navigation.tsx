'use client'

import {
  decideNavigation,
  explain,
  type InstanceOverride,
  type NavigationPresentation
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useTraits } from '../provider'

const NavigationOverflowContext = React.createContext<boolean>(false)

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  readonly presentation?: InstanceOverride<NavigationPresentation>
  readonly toggleLabel?: string
  /** Bar slots before items collapse into the overflow panel. Counts the toggle itself. */
  readonly maxBarItems?: number
  readonly overflowLabel?: string
  readonly children: React.ReactNode
}

export function NavigationRoot({
  presentation,
  toggleLabel = 'Menu',
  maxBarItems = 5,
  overflowLabel = 'More',
  children,
  ...rest
}: NavigationProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const traits = useTraits()
  const listId = React.useId()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [overflowOpen, setOverflowOpen] = React.useState(false)

  const decision = decideNavigation(policy, traits, presentation)

  // Overflow slots derive from child count alone, never from the environment,
  // so server and client always agree on the markup.
  const items = React.Children.toArray(children)
  const overflowing = items.length > maxBarItems
  const primaryCount = overflowing ? maxBarItems - 1 : items.length

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)}`)
    }
    if (decision.presentation !== 'drawer') setDrawerOpen(false)
    if (decision.presentation !== 'bar') setOverflowOpen(false)
  }, [decision.presentation])

  const closeOverflowOnNavigate = (event: React.MouseEvent<HTMLUListElement>) => {
    if (!overflowOpen) return
    const target = event.target as HTMLElement
    if (target.closest('[data-part="link"]')) setOverflowOpen(false)
  }

  return (
    <nav
      {...rest}
      data-scope="navigation"
      data-presentation={decision.presentation}
      data-drawer-open={drawerOpen || undefined}
      data-overflow-open={overflowOpen || undefined}
    >
      <button
        type="button"
        data-part="drawer-toggle"
        aria-expanded={drawerOpen}
        aria-controls={listId}
        onClick={() => setDrawerOpen((current) => !current)}
      >
        {toggleLabel}
      </button>
      <ul id={listId} data-part="list" onClick={closeOverflowOnNavigate}>
        {items.map((item, index) => (
          <NavigationOverflowContext.Provider key={index} value={overflowing && index >= primaryCount}>
            {item}
          </NavigationOverflowContext.Provider>
        ))}
        {overflowing ? (
          <li data-part="overflow-toggle-item">
            <button
              type="button"
              data-part="overflow-toggle"
              aria-expanded={overflowOpen}
              aria-controls={listId}
              onClick={() => setOverflowOpen((current) => !current)}
            >
              {overflowLabel}
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export interface NavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  readonly href?: string
  readonly icon?: React.ReactNode
  readonly current?: boolean
  readonly children: React.ReactNode
}

export function NavigationItem({
  href,
  icon,
  current = false,
  children,
  ...rest
}: NavigationItemProps): React.JSX.Element {
  const overflow = React.useContext(NavigationOverflowContext)
  const inner = (
    <>
      {icon ? (
        <span data-part="icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span data-part="label">{children}</span>
    </>
  )

  return (
    <li data-part="item" data-overflow={overflow || undefined}>
      {href === undefined ? (
        <button
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          type="button"
          data-part="link"
          aria-current={current ? 'page' : undefined}
        >
          {inner}
        </button>
      ) : (
        <a {...rest} href={href} data-part="link" aria-current={current ? 'page' : undefined}>
          {inner}
        </a>
      )}
    </li>
  )
}
