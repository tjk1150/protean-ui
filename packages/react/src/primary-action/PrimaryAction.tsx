'use client'

import {
  decidePrimaryAction,
  explain,
  type ActionPresentation,
  type InstanceOverride
} from '@protean-ui/core'
import * as React from 'react'
import { useProteanContext, useTraits } from '../provider'

export interface PrimaryActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly presentation?: InstanceOverride<ActionPresentation>
  readonly children: React.ReactNode
}

export function PrimaryActionRoot({
  presentation,
  children,
  type,
  ...rest
}: PrimaryActionProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const traits = useTraits()
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const decision = decidePrimaryAction(policy, traits, presentation)

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)}`)
    }
  }, [decision.presentation])

  React.useEffect(() => {
    const viewport = window.visualViewport
    const element = containerRef.current
    if (!viewport || !element) return

    const update = () => {
      const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      element.style.setProperty('--protean-vk-offset', `${Math.round(offset)}px`)
    }
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-scope="primary-action"
      data-presentation={decision.presentation}
    >
      <button {...rest} type={type ?? 'button'} data-part="button">
        {children}
      </button>
    </div>
  )
}
