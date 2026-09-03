'use client'

import { Navigation, Screen } from '@protean-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export type DocsLang = 'ko' | 'en'

type NavEntry =
  | { readonly group: { ko: string; en: string }; readonly sub?: boolean }
  | {
      readonly path: string
      readonly label: { ko: string; en: string }
    }

/* Sidebar = the reading order. The pager below the content follows it. */
const entries: readonly NavEntry[] = [
  { group: { ko: '시작하기', en: 'Getting started' } },
  { path: '', label: { ko: 'Protean UI란?', en: 'What is Protean UI?' } },
  { path: '/getting-started', label: { ko: '10분 시작하기', en: 'Start in 10 minutes' } },
  { group: { ko: '핵심 개념', en: 'Core concepts' } },
  { path: '/concepts/pattern-adaptation', label: { ko: '패턴 적응', en: 'Pattern adaptation' } },
  { path: '/concepts/density', label: { ko: '밀도', en: 'Density' } },
  { group: { ko: '컴포넌트', en: 'Components' } },
  { group: { ko: '패턴', en: 'Patterns' }, sub: true },
  { path: '/components/dialog', label: { ko: 'Dialog', en: 'Dialog' } },
  { path: '/components/select', label: { ko: 'Select', en: 'Select' } },
  { path: '/components/menu', label: { ko: 'Menu', en: 'Menu' } },
  { path: '/components/navigation', label: { ko: 'Navigation', en: 'Navigation' } },
  { path: '/components/list-detail', label: { ko: 'ListDetail', en: 'ListDetail' } },
  { path: '/components/primary-action', label: { ko: 'PrimaryAction', en: 'PrimaryAction' } },
  { path: '/components/tooltip', label: { ko: 'Tooltip', en: 'Tooltip' } },
  { group: { ko: '레이아웃', en: 'Layout' }, sub: true },
  { path: '/layout/screen', label: { ko: 'Screen', en: 'Screen' } },
  { path: '/layout/actions', label: { ko: 'Actions', en: 'Actions' } },
  { path: '/layout/supporting-pane', label: { ko: 'SupportingPane', en: 'SupportingPane' } },
  { group: { ko: '가이드', en: 'Guides' } },
  { path: '/guides/customize-decisions', label: { ko: '결과 맞춤 설정', en: 'Customize the decisions' } },
  { path: '/guides/composition', label: { ko: '함께 쓰기', en: 'Using together' } },
  { path: '/advanced/container-boundary', label: { ko: '컨테이너 안에서 사용하기', en: 'Inside a container' } },
  { path: '/advanced/server-rendering', label: { ko: '서버 렌더링', en: 'Server rendering' } },
  { path: '/guides/accessibility', label: { ko: '접근성', en: 'Accessibility' } },
  { group: { ko: '참고', en: 'Reference' } },
  { path: '/about/scope', label: { ko: '제공 범위', en: 'Scope and non-goals' } },
  { path: '/about/status', label: { ko: '품질과 지원', en: 'Quality and support' } },
  { path: '/about/why', label: { ko: '왜 만들었나요', en: 'Why this exists' } },
]

const pages = entries.filter((entry): entry is Exclude<NavEntry, { group: object }> => 'path' in entry)

function Pager({ lang, pathname }: { lang: DocsLang; pathname: string }) {
  const index = pages.findIndex((page) => pathname === `/${lang}${page.path}`)
  if (index === -1) return null
  const prev = index > 0 ? pages[index - 1] : null
  const next = index < pages.length - 1 ? pages[index + 1] : null
  if (!prev && !next) return null
  return (
    <nav className="docsPager" aria-label={lang === 'ko' ? '문서 순서' : 'Document order'}>
      {prev ? (
        <Link href={`/${lang}${prev.path}`} rel="prev">
          <span>{lang === 'ko' ? '이전' : 'Previous'}</span>
          {prev.label[lang]}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/${lang}${next.path}`} rel="next" data-next>
          <span>{lang === 'ko' ? '다음' : 'Next'}</span>
          {next.label[lang]}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

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
              <li key={entry.group.en} data-part={entry.sub ? 'group-sublabel' : 'group-label'}>
                {entry.group[lang]}
              </li>
            ) : (
              <Navigation.Item
                key={entry.path}
                href={`/${lang}${entry.path}`}
                current={pathname === `/${lang}${entry.path}`}
              >
                {entry.label[lang]}
              </Navigation.Item>
            )
          )}
        </Navigation.Root>
      </Screen.Navigation>
      <Screen.Content className="docsContent">
        {children}
        <Pager lang={lang} pathname={pathname} />
      </Screen.Content>
    </Screen.Root>
  )
}
