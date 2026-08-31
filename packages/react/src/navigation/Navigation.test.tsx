import { act, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Navigation from './index.parts'

function renderNavigation() {
  return render(
    <ProteanProvider>
      <Navigation.Root aria-label="Primary">
        <Navigation.Item href="/" current>
          Home
        </Navigation.Item>
        <Navigation.Item href="/orders">Orders</Navigation.Item>
      </Navigation.Root>
    </ProteanProvider>
  )
}

function nav(): HTMLElement {
  return document.querySelector('nav[data-scope="navigation"]') as HTMLElement
}

describe('Navigation', () => {
  it('stamps the decided presentation for expanded + pointer', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderNavigation()
    expect(nav().getAttribute('data-presentation')).toBe('sidebar')
  })

  it('keeps the same DOM while the presentation changes (same-DOM contract)', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderNavigation()

    const before = nav().querySelector('[data-part="list"]')?.innerHTML

    act(() => env.set({ width: 375, coarse: true, hover: false }))

    expect(nav().getAttribute('data-presentation')).toBe('bar')
    expect(nav().querySelector('[data-part="list"]')?.innerHTML).toBe(before)
    expect(nav().querySelector('[aria-current="page"]')?.textContent).toContain('Home')
  })

  it('exposes an accessible drawer toggle wired to the list', () => {
    installEnvironment({ width: 500, coarse: false, hover: true })
    renderNavigation()

    expect(nav().getAttribute('data-presentation')).toBe('drawer')
    const toggle = nav().querySelector('[data-part="drawer-toggle"]') as HTMLButtonElement
    const list = nav().querySelector('[data-part="list"]') as HTMLElement
    expect(toggle.getAttribute('aria-controls')).toBe(list.id)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    act(() => toggle.click())
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(nav().hasAttribute('data-drawer-open')).toBe(true)
  })
})
