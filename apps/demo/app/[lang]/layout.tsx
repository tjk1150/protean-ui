import type { ReactNode } from 'react'
import { DocsShell } from './docs-shell'

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export const dynamicParams = false

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <DocsShell lang={lang === 'en' ? 'en' : 'ko'}>{children}</DocsShell>
}
