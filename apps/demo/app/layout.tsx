import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import './docs.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Protean UI demo',
  description: 'Semantic components, environment-driven presentation.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
