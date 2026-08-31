'use client'

import { ProteanProvider } from '@protean-ui/react'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <ProteanProvider>{children}</ProteanProvider>
}
