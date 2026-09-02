'use client'

import * as React from 'react'

/* Material's second canonical layout: main content with a supporting pane.
   Where there is room the pane sits beside the content; on compact the
   reference stylesheet collapses it behind a toggle and raises it as a
   non-modal bottom sheet - the same DOM, morphed by CSS, like the navigation
   overflow. Whether compact collapses to a sheet or simply stacks the pane
   below is the author's call (`compact` prop), never the environment's, so
   the markup is identical on the server and every client. No policy domain:
   chrome is always on screen, so CSS owns the default presentation. */

interface SupportingPaneLocalContextValue {
  readonly paneId: string
  readonly paneLabel: string
}

const SupportingPaneLocalContext =
  /*#__PURE__*/ React.createContext<SupportingPaneLocalContextValue | null>(null)

function useSupportingPaneLocalContext(part: string): SupportingPaneLocalContextValue {
  const context = React.useContext(SupportingPaneLocalContext)
  if (!context) {
    throw new Error(`<SupportingPane.${part}> must be rendered inside <SupportingPane.Root>.`)
  }
  return context
}

export interface SupportingPaneRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /* Names the pane (complementary region) and labels the compact toggle. */
  readonly paneLabel: string
  /* What compact does with the pane: collapse behind a toggle into a bottom
     sheet (default), or simply stack it below the main content. */
  readonly compact?: 'sheet' | 'stacked'
  readonly defaultOpen?: boolean
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
  readonly children: React.ReactNode
}

export function SupportingPaneRoot({
  paneLabel,
  compact = 'sheet',
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
  ...rest
}: SupportingPaneRootProps): React.JSX.Element {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen
  const setOpen = (next: boolean) => {
    setInternalOpen(next)
    onOpenChange?.(next)
  }
  const paneId = React.useId()

  const value = React.useMemo<SupportingPaneLocalContextValue>(
    () => ({ paneId, paneLabel }),
    [paneId, paneLabel]
  )

  return (
    <SupportingPaneLocalContext.Provider value={value}>
      <div
        {...rest}
        data-scope="supporting"
        data-compact={compact === 'stacked' ? 'stacked' : undefined}
        data-open={open || undefined}
        onKeyDown={(event) => {
          rest.onKeyDown?.(event)
          if (!event.defaultPrevented && event.key === 'Escape' && open) setOpen(false)
        }}
      >
        {children}
        {compact === 'sheet' ? (
          <>
            <div data-part="backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
            <button
              type="button"
              data-part="pane-toggle"
              aria-expanded={open}
              aria-controls={paneId}
              onClick={() => setOpen(!open)}
            >
              {paneLabel}
            </button>
          </>
        ) : null}
      </div>
    </SupportingPaneLocalContext.Provider>
  )
}

export interface SupportingPaneMainProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode
}

export function SupportingPaneMain({
  children,
  ...rest
}: SupportingPaneMainProps): React.JSX.Element {
  useSupportingPaneLocalContext('Main')
  return (
    <div {...rest} data-part="main">
      {children}
    </div>
  )
}

export interface SupportingPanePaneProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: React.ReactNode
}

export function SupportingPanePane({
  children,
  ...rest
}: SupportingPanePaneProps): React.JSX.Element {
  const { paneId, paneLabel } = useSupportingPaneLocalContext('Pane')
  return (
    <aside {...rest} id={paneId} aria-label={paneLabel} data-part="pane">
      {children}
    </aside>
  )
}
