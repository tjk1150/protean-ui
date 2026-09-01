'use client'

import {
  decideOverlay,
  explain,
  type Decision,
  type InstanceOverride,
  type OverlayPresentation,
  type OverlayRole
} from '@protean-ui/core'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { BoundaryContext } from '../boundary'
import { focusableSelector, restoreFocus, trackFocus } from './continuity'
import { useProteanContext, useReadTraits, useTraits } from '../provider'

interface DialogLocalContextValue {
  readonly open: boolean
  readonly decision: Decision<OverlayPresentation> | null
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>
  readonly setOpen: (open: boolean) => void
  /* Live-continuity mode only: the persistent element the content lives in,
     so a presentation swap moves the DOM instead of recreating it. */
  readonly contentHost: HTMLElement | null
}

const DialogLocalContext = React.createContext<DialogLocalContextValue | null>(null)

function useDialogLocalContext(part: string): DialogLocalContextValue {
  const context = React.useContext(DialogLocalContext)
  if (!context) {
    throw new Error(`<Dialog.${part}> must be rendered inside <Dialog.Root>.`)
  }
  return context
}

export interface DialogProps {
  readonly role?: OverlayRole
  readonly presentation?: InstanceOverride<OverlayPresentation>
  /* 'pinned' (default) keeps the decision for the whole open lifecycle and
     re-decides at the next open. 'live' re-decides while open and swaps the
     presentation in place, preserving the content DOM, state, and focus. */
  readonly continuity?: 'pinned' | 'live'
  readonly defaultOpen?: boolean
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
  readonly children: React.ReactNode
}

export function DialogRoot(props: DialogProps): React.JSX.Element {
  return props.continuity === 'live' ? <LiveDialogRoot {...props} /> : <PinnedDialogRoot {...props} />
}

function PinnedDialogRoot({
  role = 'confirmation',
  presentation,
  defaultOpen = false,
  open,
  onOpenChange,
  children
}: DialogProps): React.JSX.Element {
  const { policy } = useProteanContext()
  const readTraits = useReadTraits()
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [decision, setDecision] = React.useState<Decision<OverlayPresentation> | null>(() =>
    (open ?? defaultOpen) ? decideOverlay(policy, readTraits(), role, presentation) : null
  )
  const isOpen = open ?? internalOpen

  React.useEffect(() => {
    if (isOpen && !decision) {
      setDecision(decideOverlay(policy, readTraits(), role, presentation))
    }
  }, [isOpen, decision, policy, readTraits, role, presentation])

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        const nextDecision = decideOverlay(policy, readTraits(), role, presentation)
        setDecision(nextDecision)
        if (process.env.NODE_ENV !== 'production') {
          console.debug(`[protean] ${explain(nextDecision)}`)
        }
      }
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [policy, readTraits, role, presentation, onOpenChange]
  )

  const value = React.useMemo<DialogLocalContextValue>(
    () => ({ open: isOpen, decision, triggerRef, setOpen, contentHost: null }),
    [isOpen, decision, setOpen]
  )

  return <DialogLocalContext.Provider value={value}>{children}</DialogLocalContext.Provider>
}

function LiveDialogRoot({
  role = 'confirmation',
  presentation,
  defaultOpen = false,
  open,
  onOpenChange,
  children
}: DialogProps): React.JSX.Element {
  const { policy } = useProteanContext()
  useTraits() // subscribe: re-render (and re-decide below) on environment change
  const readTraits = useReadTraits()
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen

  // Derived, not stored: while open, every environment change re-decides.
  const decision = isOpen ? decideOverlay(policy, readTraits(), role, presentation) : null

  React.useEffect(() => {
    if (decision && process.env.NODE_ENV !== 'production') {
      console.debug(`[protean] ${explain(decision)} (continuity: live)`)
    }
  }, [decision?.presentation])

  // The content's permanent home; presentations adopt this element into
  // their popup, so a swap moves the subtree instead of recreating it.
  const hostRef = React.useRef<HTMLElement | null>(null)
  if (typeof document !== 'undefined' && hostRef.current === null) {
    const host = document.createElement('div')
    host.setAttribute('data-scope', 'overlay')
    host.setAttribute('data-part', 'content-host')
    trackFocus(host)
    hostRef.current = host
  }

  const setOpen = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const value = React.useMemo<DialogLocalContextValue>(
    () => ({ open: isOpen, decision, triggerRef, setOpen, contentHost: hostRef.current }),
    [isOpen, decision, setOpen]
  )

  return <DialogLocalContext.Provider value={value}>{children}</DialogLocalContext.Provider>
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
}

export function DialogTrigger({ children, onClick, ...rest }: DialogTriggerProps): React.JSX.Element {
  const { open, setOpen, triggerRef, decision } = useDialogLocalContext('Trigger')
  return (
    <button
      {...rest}
      type="button"
      ref={triggerRef}
      data-scope="overlay"
      data-part="trigger"
      data-presentation={decision?.presentation}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
      }}
    >
      {children}
    </button>
  )
}

export interface DialogContentProps {
  readonly title?: string
  readonly className?: string
  readonly alert?: boolean
  readonly describedBy?: string
  readonly initialFocus?: React.RefObject<HTMLElement | null>
  readonly finalFocus?:
    | boolean
    | React.RefObject<HTMLElement | null>
    | ((closeType: unknown) => boolean | HTMLElement | null | void)
  readonly children: React.ReactNode
}

export function DialogContent({
  title,
  className,
  alert,
  describedBy,
  initialFocus,
  finalFocus,
  children
}: DialogContentProps): React.JSX.Element | null {
  const { components } = useProteanContext()
  const { open, decision, triggerRef, setOpen, contentHost } = useDialogLocalContext('Content')
  const boundary = React.useContext(BoundaryContext)

  // The backend resolves an initialFocus ref asynchronously; apply it
  // synchronously after commit so focus is deterministic for consumers.
  React.useLayoutEffect(() => {
    if (open && initialFocus?.current) initialFocus.current.focus()
  }, [open, initialFocus])

  // Live swap backstop: if the moved content is attached but lost focus,
  // pull it back in. The primary restore happens in the content slot's ref,
  // inside the incoming backend's own attaching commit (see defaults.tsx).
  React.useEffect(() => {
    if (!contentHost || !open) return
    if (!document.contains(contentHost)) return
    restoreFocus(contentHost)
  })

  if (!decision) return null

  const Presentation = components[decision.presentation]
  return (
    <>
      {contentHost ? createPortal(children, contentHost) : null}
      <Presentation
        open={open}
        onOpenChange={setOpen}
        decision={decision}
        triggerRef={triggerRef}
        title={title}
        className={className}
        alert={alert}
        describedBy={describedBy}
        initialFocus={initialFocus}
        finalFocus={finalFocus}
        {...(boundary ? { portalContainer: boundary } : {})}
        {...(contentHost ? { contentHost } : {})}
      >
        {contentHost ? null : children}
      </Presentation>
    </>
  )
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
}

export function DialogClose({ children, onClick, ...rest }: DialogCloseProps): React.JSX.Element {
  const { setOpen, decision } = useDialogLocalContext('Close')
  return (
    <button
      {...rest}
      type="button"
      data-scope="overlay"
      data-part="close"
      data-presentation={decision?.presentation}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(false)
      }}
    >
      {children}
    </button>
  )
}
