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

const TooltipLocalContext = /*#__PURE__*/ React.createContext<TooltipLocalContextValue | null>(null)

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

/* A hinted button is still a button: every button prop passes through, so a
   tooltip composes with an action (onClick), a disabled state, or a form. In
   popover mode the consumer onClick runs alongside the toggletip open. */
export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
}

export function TooltipTrigger({ children, disabled, ...rest }: TooltipTriggerProps): React.JSX.Element {
  const { decision } = useTooltipLocalContext('Trigger')
  const shared = {
    ...rest,
    'data-scope': 'tooltip',
    'data-part': 'trigger',
    'data-presentation': decision?.presentation
  } as const

  if (!decision) {
    return (
      <button {...shared} disabled={disabled} type="button">
        {children}
      </button>
    )
  }
  /* Base UI consumes `disabled` as "do not open the hint" and drops the DOM
     attribute; rendering our own element keeps the button natively disabled. */
  const element = <button {...shared} disabled={disabled} type="button" />
  if (decision.presentation === 'tooltip') {
    return (
      <BaseTooltip.Trigger disabled={disabled} render={element}>
        {children}
      </BaseTooltip.Trigger>
    )
  }
  return (
    <BasePopover.Trigger disabled={disabled} render={element}>
      {children}
    </BasePopover.Trigger>
  )
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
