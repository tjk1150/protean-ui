'use client'

import { Navigation, Screen } from '@protean-ui/react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type NavEntry =
  | { readonly group: string }
  | { readonly href: string; readonly label: string }

const entries: readonly NavEntry[] = [
  { href: '/', label: 'Overview' },
  { href: '/getting-started', label: 'Getting started' },
  { group: 'Concepts' },
  { href: '/concepts/traits-and-policy', label: 'Traits and policy' },
  { href: '/concepts/ssr', label: 'Server rendering' },
  { href: '/concepts/accessibility', label: 'Accessibility' },
  { group: 'Components' },
  { href: '/components/dialog', label: 'Dialog' },
  { href: '/components/select', label: 'Select' },
  { href: '/components/navigation', label: 'Navigation' },
  { href: '/components/screen', label: 'Screen' },
  { href: '/components/primary-action', label: 'PrimaryAction' },
  { group: 'Live demos' },
  { href: '/delete-demo', label: 'The deletion demo' },
  { href: '/navigation-spike', label: 'Navigation spike' },
  { href: '/screen-demo', label: 'Screen demo' },
  { href: '/ssr-proof', label: 'SSR proof' },
]

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <Screen.Root className="docsShell">
      <Screen.Navigation>
        <div data-part="brand">
          <span data-part="brand-name">Protean UI</span>
          <span data-part="brand-status">pre-alpha</span>
        </div>
        <Navigation.Root
          aria-label="Documentation"
          presentation={{ compact: 'drawer', medium: 'sidebar' }}
          toggleLabel="Menu"
        >
          {entries.map((entry) =>
            'group' in entry ? (
              <li key={entry.group} data-part="group-label" aria-hidden="true">
                {entry.group}
              </li>
            ) : (
              <Navigation.Item
                key={entry.href}
                href={entry.href}
                current={pathname === entry.href}
              >
                {entry.label}
              </Navigation.Item>
            )
          )}
        </Navigation.Root>
      </Screen.Navigation>
      <Screen.Content className="docsContent">{children}</Screen.Content>
    </Screen.Root>
  )
}
