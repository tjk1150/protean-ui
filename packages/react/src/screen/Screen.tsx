import type * as React from 'react'

export interface ScreenSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: React.ReactNode
}

export function ScreenRoot({ children, ...rest }: ScreenSlotProps): React.JSX.Element {
  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} data-scope="screen">
      {children}
    </div>
  )
}

export function ScreenNavigation({ children, ...rest }: ScreenSlotProps): React.JSX.Element {
  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} data-part="navigation">
      {children}
    </div>
  )
}

export function ScreenContent({ children, ...rest }: ScreenSlotProps): React.JSX.Element {
  return (
    <main {...rest} data-part="content">
      {children}
    </main>
  )
}

export function ScreenActions({ children, ...rest }: ScreenSlotProps): React.JSX.Element {
  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} data-part="actions">
      {children}
    </div>
  )
}
