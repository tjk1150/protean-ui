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

export interface ScreenContentProps extends ScreenSlotProps {
  readonly as?: 'main' | 'div'
}

export function ScreenContent({ as = 'main', children, ...rest }: ScreenContentProps): React.JSX.Element {
  const Element = as
  return (
    <Element {...rest} data-part="content">
      {children}
    </Element>
  )
}

export function ScreenActions({ children, ...rest }: ScreenSlotProps): React.JSX.Element {
  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} data-part="actions">
      {children}
    </div>
  )
}
