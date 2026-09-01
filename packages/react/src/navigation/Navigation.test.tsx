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

interface OverflowRenderOptions {
  readonly count: number
  readonly maxBarItems?: number
  readonly overflowLabel?: string
}

function renderOverflowNavigation({ count, maxBarItems, overflowLabel }: OverflowRenderOptions) {
  const labels = Array.from({ length: count }, (_, index) => `Item ${index + 1}`)
  return render(
    <ProteanProvider>
      <Navigation.Root
        aria-label="Primary"
        {...(maxBarItems !== undefined ? { maxBarItems } : {})}
        {...(overflowLabel !== undefined ? { overflowLabel } : {})}
      >
        {labels.map((label) => (
          <Navigation.Item key={label} onClick={() => {}}>
            {label}
          </Navigation.Item>
        ))}
      </Navigation.Root>
    </ProteanProvider>
  )
}

function overflowToggle(): HTMLButtonElement | null {
  return nav().querySelector('[data-part="overflow-toggle"]')
}

function overflowItems(): HTMLElement[] {
  return Array.from(nav().querySelectorAll('li[data-overflow]'))
}

describe('Navigation overflow', () => {
  it('renders no overflow affordance at or under the bar capacity', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 5 })

    expect(overflowToggle()).toBeNull()
    expect(overflowItems()).toHaveLength(0)
  })

  it('marks items beyond capacity and exposes an accessible toggle', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 7 })

    const toggle = overflowToggle() as HTMLButtonElement
    const list = nav().querySelector('[data-part="list"]') as HTMLElement
    expect(toggle.textContent).toBe('More')
    expect(toggle.getAttribute('aria-controls')).toBe(list.id)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    // Capacity 5 keeps four primary slots; the fifth slot is the toggle.
    expect(overflowItems()).toHaveLength(3)
    const items = Array.from(nav().querySelectorAll('li[data-part="item"]'))
    expect(items.slice(0, 4).every((item) => !item.hasAttribute('data-overflow'))).toBe(true)
  })

  it('opens and closes the overflow panel state on the root', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 7 })

    const toggle = overflowToggle() as HTMLButtonElement
    act(() => toggle.click())
    expect(nav().hasAttribute('data-overflow-open')).toBe(true)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')

    act(() => toggle.click())
    expect(nav().hasAttribute('data-overflow-open')).toBe(false)
  })

  it('closes the overflow panel when a destination is chosen', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 7 })

    act(() => (overflowToggle() as HTMLButtonElement).click())
    expect(nav().hasAttribute('data-overflow-open')).toBe(true)

    const lastLink = Array.from(nav().querySelectorAll('[data-part="link"]')).at(-1) as HTMLElement
    act(() => lastLink.click())
    expect(nav().hasAttribute('data-overflow-open')).toBe(false)
  })

  it('respects maxBarItems and a custom overflow label', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 4, maxBarItems: 3, overflowLabel: '더보기' })

    expect((overflowToggle() as HTMLButtonElement).textContent).toBe('더보기')
    expect(overflowItems()).toHaveLength(2)
  })

  it('stamps the overflow structure independent of the presentation', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderOverflowNavigation({ count: 7 })

    expect(nav().getAttribute('data-presentation')).toBe('sidebar')
    expect(overflowToggle()).not.toBeNull()
    expect(overflowItems()).toHaveLength(3)
  })

  it('resets the overflow state when leaving the bar presentation', () => {
    const env = installEnvironment({ width: 375, coarse: true, hover: false })
    renderOverflowNavigation({ count: 7 })

    act(() => (overflowToggle() as HTMLButtonElement).click())
    expect(nav().hasAttribute('data-overflow-open')).toBe(true)

    act(() => env.set({ width: 1280, coarse: false, hover: true }))
    expect(nav().getAttribute('data-presentation')).toBe('sidebar')
    expect(nav().hasAttribute('data-overflow-open')).toBe(false)
  })
})
