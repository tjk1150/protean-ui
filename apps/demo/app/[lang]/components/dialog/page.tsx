import type { JSX } from 'react'
import En from './content.en'
import Ko from './content.ko'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<JSX.Element> {
  const { lang } = await params
  return lang === 'en' ? <En /> : <Ko />
}
