import type { Decision, OverlayPresentation } from '@protean-ui/core'
import type * as React from 'react'

export interface OverlayPresentationProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly decision: Decision<OverlayPresentation>
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>
  readonly title?: string
  readonly className?: string
  readonly alert?: boolean
  readonly describedBy?: string
  readonly initialFocus?: React.RefObject<HTMLElement | null>
  readonly finalFocus?:
    | boolean
    | React.RefObject<HTMLElement | null>
    | ((closeType: unknown) => boolean | HTMLElement | null | void)
  /* The nearest ProteanBoundary, when there is one. Modal, fullscreen, and
     sheet presentations portal into it so the panel acts as the viewport;
     anchored popovers stay at the document level to avoid clipping. */
  readonly portalContainer?: React.RefObject<HTMLElement | null>
  readonly children: React.ReactNode
}
