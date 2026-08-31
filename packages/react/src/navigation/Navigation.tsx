'use client'

import {
  decideNavigation,
  explain,
  type InstanceOverride,
  type NavigationPresentation
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useTraits } from '../provider'

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  readonly presentation?: InstanceOverride<NavigationPresentation>
  readonly toggleLabel?: string
  readonly children: React.ReactNode
}

export function NavigationRoot({
  presentation,
  toggleLabel = 'Menu',
  children,
  ...rest
}: NavigationProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const traits = useTraits()
  const listId = React.useId()
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const decision = decideNavigation(policy, traits, presentation)

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)}`)
    }
    if (decision.presentation !== 'drawer') setDrawerOpen(false)
  }, [decision.presentation])

  return (
    <nav
      {...rest}
      data-scope="navigation"
      data-presentation={decision.presentation}
      data-drawer-open={drawerOpen || undefined}
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
      <ul id={listId} data-part="list">
        {children}
      </ul>
    </nav>
  )
}

export interface NavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  readonly href: string
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
  return (
    <li data-part="item">
      <a
        {...rest}
        href={href}
        data-part="link"
        aria-current={current ? 'page' : undefined}
      >
        {icon ? (
          <span data-part="icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span data-part="label">
          {children}
        </span>
      </a>
    </li>
  )
}
