'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { Popover as BasePopover } from '@base-ui/react/popover'
import type { OverlayPresentation } from '@protean-ui/core'
import type * as React from 'react'
import { restoreFocus } from './continuity'
import type { OverlayPresentationProps } from './types'

/* In live-continuity mode the content lives in a persistent host element;
   the presentation renders a slot and adopts that element, so swapping
   presentations moves the DOM instead of recreating it. */
function ContentSlot({
  host,
  children
}: {
  readonly host?: HTMLElement
  readonly children: React.ReactNode
}): React.JSX.Element {
  if (!host) return <>{children}</>
  return (
    <div
      data-scope="overlay"
      data-part="content-slot"
      ref={(node) => {
        if (!node) return
        if (host.parentElement !== node) node.appendChild(host)
        // This ref fires inside the incoming backend's attaching commit -
        // the one moment the moved content is back in the document.
        if (node.isConnected) restoreFocus(host)
      }}
    />
  )
}

function dataAttributes(presentation: OverlayPresentation, part: string, contained = false) {
  return {
    'data-scope': 'overlay',
    'data-part': part,
    'data-presentation': presentation,
    ...(contained ? { 'data-contained': '' } : {})
  }
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
  portalContainer,
  contentHost,
  children
}: OverlayPresentationProps): React.JSX.Element {
  const contained = portalContainer !== undefined
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal {...(contained ? { container: portalContainer } : {})}>
        <BaseDialog.Backdrop {...dataAttributes(decision.presentation, 'backdrop', contained)} />
        <BaseDialog.Popup
          {...dataAttributes(decision.presentation, 'popup', contained)}
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
          <ContentSlot host={contentHost}>{children}</ContentSlot>
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
  portalContainer,
  contentHost,
  children
}: OverlayPresentationProps): React.JSX.Element {
  const contained = portalContainer !== undefined
  return (
    <BaseDrawer.Root open={open} onOpenChange={(next) => onOpenChange(next)} swipeDirection="down">
      <BaseDrawer.Portal {...(contained ? { container: portalContainer } : {})}>
        <BaseDrawer.Backdrop {...dataAttributes(decision.presentation, 'backdrop', contained)} />
        <BaseDrawer.Viewport {...dataAttributes(decision.presentation, 'viewport', contained)}>
          <BaseDrawer.Popup
            {...dataAttributes(decision.presentation, 'popup', contained)}
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
            <ContentSlot host={contentHost}>{children}</ContentSlot>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  )
}

/* Anchored popovers deliberately ignore portalContainer: they position
   against the trigger, and portaling into a panel risks clipping. */
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
  contentHost,
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
            <ContentSlot host={contentHost}>{children}</ContentSlot>
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
