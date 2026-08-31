import type { Decision, OverlayPresentation } from '@protean-ui/core'
import type * as React from 'react'

export interface OverlayPresentationProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly decision: Decision<OverlayPresentation>
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>
  readonly title?: string
  readonly className?: string
  readonly children: React.ReactNode
}
