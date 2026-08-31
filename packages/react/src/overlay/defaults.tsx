'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { Popover as BasePopover } from '@base-ui/react/popover'
import type { OverlayPresentation } from '@protean-ui/core'
import type * as React from 'react'
import type { OverlayPresentationProps } from './types'

function dataAttributes(presentation: OverlayPresentation, part: string) {
  return {
    'data-scope': 'overlay',
    'data-part': part,
    'data-presentation': presentation
  } as const
}

function ModalPresentation({
  open,
  onOpenChange,
  decision,
  triggerRef,
  title,
  className,
  alert,
  describedBy,
  initialFocus,
  finalFocus,
  children
}: OverlayPresentationProps): React.JSX.Element {
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop {...dataAttributes(decision.presentation, 'backdrop')} />
        <BaseDialog.Popup
          {...dataAttributes(decision.presentation, 'popup')}
          className={className}
          {...(alert ? { role: 'alertdialog' as const } : {})}
          {...(describedBy ? { 'aria-describedby': describedBy } : {})}
          {...(initialFocus ? { initialFocus } : {})}
          {...(finalFocus === undefined ? {} : { finalFocus })}
        >
          {title ? (
            <BaseDialog.Title {...dataAttributes(decision.presentation, 'title')}>
              {title}
            </BaseDialog.Title>
          ) : null}
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

function SheetPresentation({
  open,
  onOpenChange,
  decision,
  triggerRef,
  title,
  className,
  alert,
  describedBy,
  initialFocus,
  finalFocus,
  children
}: OverlayPresentationProps): React.JSX.Element {
  return (
    <BaseDrawer.Root open={open} onOpenChange={(next) => onOpenChange(next)} swipeDirection="down">
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop {...dataAttributes(decision.presentation, 'backdrop')} />
        <BaseDrawer.Viewport {...dataAttributes(decision.presentation, 'viewport')}>
          <BaseDrawer.Popup
            {...dataAttributes(decision.presentation, 'popup')}
            className={className}
            {...(alert ? { role: 'alertdialog' as const } : {})}
            {...(describedBy ? { 'aria-describedby': describedBy } : {})}
            {...(initialFocus ? { initialFocus } : {})}
            {...(finalFocus === undefined ? {} : { finalFocus })}
          >
            {title ? (
              <BaseDrawer.Title {...dataAttributes(decision.presentation, 'title')}>
                {title}
              </BaseDrawer.Title>
            ) : null}
            {children}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  )
}

function PopoverPresentation({
  open,
  onOpenChange,
  decision,
  triggerRef,
  title,
  className,
  alert,
  describedBy,
  initialFocus,
  finalFocus,
  children
}: OverlayPresentationProps): React.JSX.Element {
  return (
    <BasePopover.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BasePopover.Portal>
        <BasePopover.Positioner anchor={triggerRef} side="bottom" align="start" sideOffset={8}>
          <BasePopover.Popup
            {...dataAttributes(decision.presentation, 'popup')}
            className={className}
            {...(alert ? { role: 'alertdialog' as const } : {})}
            {...(describedBy ? { 'aria-describedby': describedBy } : {})}
            {...(initialFocus ? { initialFocus } : {})}
            {...(finalFocus === undefined ? {} : { finalFocus })}
          >
            {title ? (
              <BasePopover.Title {...dataAttributes(decision.presentation, 'title')}>
                {title}
              </BasePopover.Title>
            ) : null}
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}

export type OverlayComponents = Readonly<
  Record<OverlayPresentation, React.ComponentType<OverlayPresentationProps>>
>

export const defaultOverlayComponents: OverlayComponents = {
  modal: ModalPresentation,
  fullscreen: ModalPresentation,
  sheet: SheetPresentation,
  popover: PopoverPresentation
}
