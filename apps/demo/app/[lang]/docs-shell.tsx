'use client'

import { Navigation, Screen } from '@protean-ui/react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export type DocsLang = 'ko' | 'en'

type NavEntry =
  | { readonly group: { ko: string; en: string } }
  | {
      readonly path: string
      readonly label: { ko: string; en: string }
      readonly external?: boolean
    }

const entries: readonly NavEntry[] = [
  { path: '', label: { ko: '개요', en: 'Overview' } },
  { path: '/getting-started', label: { ko: '시작하기', en: 'Getting started' } },
  { path: '/why', label: { ko: '왜 만들었나요', en: 'Why this exists' } },
  { group: { ko: '개념', en: 'Concepts' } },
  { path: '/concepts/design-principles', label: { ko: '설계 원리', en: 'Design principles' } },
  { path: '/concepts/traits-and-policy', label: { ko: '판단 기준과 규칙', en: 'Traits and policy' } },
  { path: '/concepts/ssr', label: { ko: '서버 렌더링', en: 'Server rendering' } },
  { path: '/concepts/accessibility', label: { ko: '접근성', en: 'Accessibility' } },
  { path: '/concepts/quality', label: { ko: '품질과 테스트', en: 'Quality and testing' } },
  { group: { ko: '컴포넌트', en: 'Components' } },
  { path: '/components/dialog', label: { ko: 'Dialog', en: 'Dialog' } },
  { path: '/components/select', label: { ko: 'Select', en: 'Select' } },
  { path: '/components/menu', label: { ko: 'Menu', en: 'Menu' } },
  { path: '/components/navigation', label: { ko: 'Navigation', en: 'Navigation' } },
  { path: '/components/screen', label: { ko: 'Screen', en: 'Screen' } },
  { path: '/components/primary-action', label: { ko: 'PrimaryAction', en: 'PrimaryAction' } },
  { path: '/components/tooltip', label: { ko: 'Tooltip', en: 'Tooltip' } },
  { path: '/components/boundary', label: { ko: 'Boundary', en: 'Boundary' } },
  { group: { ko: '라이브 데모', en: 'Live demos' } },
  { path: '/delete-demo', label: { ko: '삭제 데모', en: 'The deletion demo' }, external: true },
  { path: '/navigation-spike', label: { ko: '내비게이션 데모', en: 'Navigation spike' }, external: true },
  { path: '/boundary-demo', label: { ko: '컨테이너 경계 데모', en: 'Container boundary' }, external: true },
  { path: '/continuity-demo', label: { ko: '전환 연속성 데모', en: 'Transition continuity' }, external: true },
  { path: '/screen-demo', label: { ko: '화면 데모', en: 'Screen demo' }, external: true },
  { path: '/ssr-proof', label: { ko: 'SSR 증명', en: 'SSR proof' }, external: true },
]

export function DocsShell({ lang, children }: { lang: DocsLang; children: ReactNode }) {
  const pathname = usePathname()
  const otherLang: DocsLang = lang === 'ko' ? 'en' : 'ko'
  const rest = pathname.replace(/^\/(ko|en)/, '')
  const togglePath = `/${otherLang}${rest}`

  return (
    <Screen.Root className="docsShell" lang={lang}>
      <Screen.Navigation>
        <div data-part="brand">
          <span data-part="brand-name">Protean UI</span>
          <span data-part="brand-status">pre-alpha</span>
          <a data-part="lang-toggle" href={togglePath}>
            {otherLang === 'ko' ? '한국어' : 'English'}
          </a>
        </div>
        <Navigation.Root
          aria-label={lang === 'ko' ? '문서 메뉴' : 'Documentation'}
          presentation={{ compact: 'drawer', medium: 'sidebar' }}
          toggleLabel={lang === 'ko' ? '메뉴' : 'Menu'}
        >
          {entries.map((entry) =>
            'group' in entry ? (
              <li key={entry.group.en} data-part="group-label" aria-hidden="true">
                {entry.group[lang]}
              </li>
            ) : (
              <Navigation.Item
                key={entry.path}
                href={entry.external ? entry.path : `/${lang}${entry.path}`}
                current={!entry.external && pathname === `/${lang}${entry.path}`}
              >
                {entry.label[lang]}
              </Navigation.Item>
            )
          )}
        </Navigation.Root>
      </Screen.Navigation>
      <Screen.Content className="docsContent">{children}</Screen.Content>
    </Screen.Root>
  )
}
