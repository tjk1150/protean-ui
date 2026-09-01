'use client'

import * as React from 'react'

/* Carries the nearest boundary element so open-time decisions can measure
   against the container instead of the viewport. */
export const BoundaryContext = /*#__PURE__*/ React.createContext<React.RefObject<HTMLDivElement | null> | null>(
  null
)

export interface ProteanBoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode
}

/* Declares a container boundary: overlays declared inside decide their size
   class from this element's measured width at the moment they open, not from
   the viewport. A dialog inside a 480px panel on a wide desktop presents the
   compact way. The measurement happens at interaction time, so the server
   never has to know the container - the SSR invariant is untouched. Chrome
   components (Navigation, Screen, PrimaryAction) are viewport-driven and
   ignore boundaries; style container-scoped chrome with CSS container
   queries instead. */
export function ProteanBoundary({ children, ...rest }: ProteanBoundaryProps): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement | null>(null)
  return (
    <BoundaryContext.Provider value={ref}>
      <div {...rest} ref={ref} data-scope="boundary">
        {children}
      </div>
    </BoundaryContext.Provider>
  )
}
