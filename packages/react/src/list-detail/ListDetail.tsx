'use client'

import {
  decideListDetail,
  explain,
  type Decision,
  type InstanceOverride,
  type ListDetailPresentation
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useTraits } from '../provider'

/* Master-detail: two panes on medium and expanded, one screen at a time on
   compact. Both panes live in one DOM tree in every presentation - the
   default policy is expressed as media-query CSS, and detail activation is a
   prop the app owns (wire it to your router or state), so the server renders
   it right by construction. */

interface ListDetailLocalContextValue {
  readonly decision: Decision<ListDetailPresentation>
  readonly onBack?: () => void
}

const ListDetailLocalContext = /*#__PURE__*/ React.createContext<ListDetailLocalContextValue | null>(
  null
)

function useListDetailLocalContext(part: string): ListDetailLocalContextValue {
  const context = React.useContext(ListDetailLocalContext)
  if (!context) {
    throw new Error(`<ListDetail.${part}> must be rendered inside <ListDetail.Root>.`)
  }
  return context
}

export interface ListDetailRootProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly presentation?: InstanceOverride<ListDetailPresentation>
  /* Whether a detail is currently active. In the stack presentation this is
     which screen shows; in panes both stay visible. Drive it from your
     selection state or route so the server always knows it. */
  readonly detailActive?: boolean
  readonly onBack?: () => void
  readonly children: React.ReactNode
}

export function ListDetailRoot({
  presentation,
  detailActive = false,
  onBack,
  children,
  ...rest
}: ListDetailRootProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const traits = useTraits()
  const rootRef = React.useRef<HTMLDivElement | null>(null)

  const decision = decideListDetail(policy, traits, presentation)

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)}`)
    }
  }, [decision.presentation])

  // In the stack, activating the detail is a screen change: move focus there
  // so keyboard and screen-reader users land where the content is. Panes show
  // both sides, so focus stays wherever the user put it.
  const wasActive = React.useRef(detailActive)
  React.useEffect(() => {
    if (detailActive && !wasActive.current && decision.presentation === 'stack') {
      rootRef.current?.querySelector<HTMLElement>('[data-part="detail"]')?.focus()
    }
    wasActive.current = detailActive
  }, [detailActive, decision.presentation])

  const value = React.useMemo<ListDetailLocalContextValue>(
    () => ({ decision, onBack }),
    [decision, onBack]
  )

  return (
    <ListDetailLocalContext.Provider value={value}>
      <div
        {...rest}
        ref={rootRef}
        data-scope="list-detail"
        data-presentation={decision.presentation}
        data-detail-active={detailActive || undefined}
      >
        {children}
      </div>
    </ListDetailLocalContext.Provider>
  )
}

export interface ListDetailSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode
}

export function ListDetailList({ children, ...rest }: ListDetailSlotProps): React.JSX.Element {
  useListDetailLocalContext('List')
  return (
    <div {...rest} data-part="list">
      {children}
    </div>
  )
}

export function ListDetailDetail({ children, ...rest }: ListDetailSlotProps): React.JSX.Element {
  useListDetailLocalContext('Detail')
  return (
    <div {...rest} data-part="detail" tabIndex={-1}>
      {children}
    </div>
  )
}

export interface ListDetailBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
}

/* Shown by the reference stylesheet only in the stack presentation, where
   the detail replaces the list and needs a way back. */
export function ListDetailBack({ children, onClick, ...rest }: ListDetailBackProps): React.JSX.Element {
  const { decision, onBack } = useListDetailLocalContext('Back')
  return (
    <button
      {...rest}
      type="button"
      data-part="back"
      data-presentation={decision.presentation}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onBack?.()
      }}
    >
      {children}
    </button>
  )
}
