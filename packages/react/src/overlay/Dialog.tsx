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
import { useProteanContext, useReadTraits } from '../provider'

interface DialogLocalContextValue {
  readonly open: boolean
  readonly decision: Decision<OverlayPresentation> | null
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>
  readonly setOpen: (open: boolean) => void
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
  readonly defaultOpen?: boolean
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
  readonly children: React.ReactNode
}

export function DialogRoot({
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
    () => ({ open: isOpen, decision, triggerRef, setOpen }),
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
  readonly children: React.ReactNode
}

export function DialogContent({
  title,
  className,
  alert,
  describedBy,
  initialFocus,
  children
}: DialogContentProps): React.JSX.Element | null {
  const { components } = useProteanContext()
  const { open, decision, triggerRef, setOpen } = useDialogLocalContext('Content')

  // The backend resolves an initialFocus ref asynchronously; apply it
  // synchronously after commit so focus is deterministic for consumers.
  React.useLayoutEffect(() => {
    if (open && initialFocus?.current) initialFocus.current.focus()
  }, [open, initialFocus])

  if (!decision) return null

  const Presentation = components[decision.presentation]
  return (
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
    >
      {children}
    </Presentation>
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
