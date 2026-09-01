import * as React from 'react'

/* The Base UI render convention, for our own triggers: compose a trigger's
   behavior onto an element the consumer supplies. The action owner stays
   outermost and injects behavior (handlers, aria, stamps); the rendered
   element keeps its own identity - its explicit props win, and a protean
   target (Tooltip.Trigger) re-stamps its own data attributes internally. */

export function mergeRefs<T>(
  ...refs: ReadonlyArray<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

/* React 19 carries an element's ref in props; React 18 on the element. */
export function getElementRef<T>(element: React.ReactElement): React.Ref<T> | undefined {
  if (Number(React.version.split('.')[0]) >= 19) {
    return (element.props as { readonly ref?: React.Ref<T> }).ref
  }
  return (element as unknown as { readonly ref?: React.Ref<T> }).ref
}

export interface TriggerBehavior {
  readonly className?: string
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  readonly [key: string]: unknown
}

export function composeTrigger(
  element: React.ReactElement<Record<string, unknown>>,
  behavior: TriggerBehavior,
  triggerRef: React.Ref<HTMLButtonElement | null>,
  children: React.ReactNode
): React.JSX.Element {
  const own = element.props
  const ownClick = own.onClick as
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined
  const merged: Record<string, unknown> = {
    ...behavior,
    ...own,
    className:
      [behavior.className, own.className].filter(Boolean).join(' ') || undefined,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      ownClick?.(event)
      behavior.onClick?.(event)
    },
    ref: mergeRefs(triggerRef, getElementRef<HTMLButtonElement>(element))
  }
  return children === undefined
    ? React.cloneElement(element, merged)
    : React.cloneElement(element, merged, children)
}
