'use client'

import { Popover as BasePopover } from '@base-ui/react/popover'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import {
  decideHint,
  explain,
  type Decision,
  type HintPresentation,
  type InstanceOverride
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useTraits } from '../provider'

/* A hint on a trigger. Where hover exists it is a classic tooltip; where it
   does not (touch), the tooltip pattern itself cannot fire, so it becomes a
   tap-opened popover. The backend choice decides the listeners, so the
   decision happens at render - gated behind mount so the server and the
   first client paint agree on a plain button (a hint is progressive
   enhancement by nature; never make it the only carrier of critical
   information). */

interface TooltipLocalContextValue {
  readonly decision: Decision<HintPresentation> | null
}

const TooltipLocalContext = React.createContext<TooltipLocalContextValue | null>(null)

function useTooltipLocalContext(part: string): TooltipLocalContextValue {
  const context = React.useContext(TooltipLocalContext)
  if (!context) {
    throw new Error(`<Tooltip.${part}> must be rendered inside <Tooltip.Root>.`)
  }
  return context
}

export interface TooltipRootProps {
  readonly presentation?: InstanceOverride<HintPresentation>
  readonly children: React.ReactNode
}

export function TooltipRoot({ presentation, children }: TooltipRootProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const traits = useTraits()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const decision = mounted ? decideHint(policy, traits, presentation) : null

  React.useEffect(() => {
    if (decision && process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)}`)
    }
  }, [decision?.presentation])

  const value = React.useMemo<TooltipLocalContextValue>(() => ({ decision }), [decision])

  if (!decision) {
    return <TooltipLocalContext.Provider value={value}>{children}</TooltipLocalContext.Provider>
  }

  if (decision.presentation === 'tooltip') {
    return (
      <TooltipLocalContext.Provider value={value}>
        <BaseTooltip.Root>{children}</BaseTooltip.Root>
      </TooltipLocalContext.Provider>
    )
  }

  return (
    <TooltipLocalContext.Provider value={value}>
      <BasePopover.Root>{children}</BasePopover.Root>
    </TooltipLocalContext.Provider>
  )
}

export interface TooltipTriggerProps {
  readonly className?: string
  readonly 'aria-label'?: string
  readonly children: React.ReactNode
}

export function TooltipTrigger({
  className,
  'aria-label': ariaLabel,
  children
}: TooltipTriggerProps): React.JSX.Element {
  const { decision } = useTooltipLocalContext('Trigger')
  const shared = {
    className,
    'aria-label': ariaLabel,
    'data-scope': 'tooltip',
    'data-part': 'trigger',
    'data-presentation': decision?.presentation
  } as const

  if (!decision) {
    return (
      <button type="button" {...shared}>
        {children}
      </button>
    )
  }
  if (decision.presentation === 'tooltip') {
    return <BaseTooltip.Trigger {...shared}>{children}</BaseTooltip.Trigger>
  }
  return <BasePopover.Trigger {...shared}>{children}</BasePopover.Trigger>
}

export interface TooltipContentProps {
  readonly className?: string
  readonly children: React.ReactNode
}

export function TooltipContent({ className, children }: TooltipContentProps): React.JSX.Element | null {
  const { decision } = useTooltipLocalContext('Content')

  if (!decision) return null

  const presentation = decision.presentation
  const shared = {
    className,
    'data-scope': 'tooltip',
    'data-part': 'popup',
    'data-presentation': presentation
  } as const

  if (presentation === 'tooltip') {
    return (
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          data-scope="tooltip"
          data-part="positioner"
          data-presentation={presentation}
          side="top"
          sideOffset={6}
        >
          <BaseTooltip.Popup {...shared} role="tooltip">{children}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    )
  }

  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        data-scope="tooltip"
        data-part="positioner"
        data-presentation={presentation}
        side="top"
        sideOffset={6}
      >
        {/* Same hint semantics, differently triggered: a toggletip, not a dialog. */}
        <BasePopover.Popup {...shared} role="tooltip" initialFocus={false} finalFocus={false}>
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}
