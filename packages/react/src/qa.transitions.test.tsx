import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import * as Dialog from './overlay/index.parts'
import * as Navigation from './navigation/index.parts'
import * as Select from './select/index.parts'
import { ProteanProvider } from './provider'
import { installEnvironment } from './test/environment-mock'

/* ISO/IEC/IEEE 29119-4 state-transition and negative tests: what happens when
   the environment moves mid-lifecycle, and when the user behaves oddly. */

function popup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="overlay"][data-part="popup"]')
}

describe('overlay decision lifecycle', () => {
  it('pins the decision while open; the environment applies at the next open', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Dialog.Root role="form">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Form">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    const trigger = screen.getByRole('button', { name: 'Open' })

    fireEvent.click(trigger)
    expect(popup()?.getAttribute('data-presentation')).toBe('modal')

    act(() => env.set({ width: 375, coarse: true, hover: false }))
    expect(popup()?.getAttribute('data-presentation')).toBe('modal')

    // The open modal makes the background inert, so reuse the captured trigger.
    fireEvent.click(trigger)
    expect(popup()).toBeNull()

    fireEvent.click(trigger)
    expect(popup()?.getAttribute('data-presentation')).toBe('fullscreen')
  })

  it('a double click on the trigger toggles cleanly closed', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Dialog.Root role="confirmation">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Confirm">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    const trigger = screen.getByRole('button', { name: 'Open' })
    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(popup()).toBeNull()
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})

describe('navigation state transitions', () => {
  it('closes the drawer when the presentation leaves drawer', () => {
    const env = installEnvironment({ width: 500, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Navigation.Root aria-label="Primary">
          <Navigation.Item onClick={() => {}}>Home</Navigation.Item>
          <Navigation.Item onClick={() => {}}>Orders</Navigation.Item>
        </Navigation.Root>
      </ProteanProvider>
    )
    const nav = document.querySelector('nav[data-scope="navigation"]') as HTMLElement
    const toggle = nav.querySelector('[data-part="drawer-toggle"]') as HTMLButtonElement

    act(() => toggle.click())
    expect(nav.hasAttribute('data-drawer-open')).toBe(true)

    act(() => env.set({ width: 1280 }))
    expect(nav.getAttribute('data-presentation')).toBe('sidebar')
    expect(nav.hasAttribute('data-drawer-open')).toBe(false)
  })

  it('survives a degenerate bar capacity of one', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Navigation.Root aria-label="Primary" maxBarItems={1}>
          <Navigation.Item onClick={() => {}}>A</Navigation.Item>
          <Navigation.Item onClick={() => {}}>B</Navigation.Item>
          <Navigation.Item onClick={() => {}}>C</Navigation.Item>
        </Navigation.Root>
      </ProteanProvider>
    )
    const nav = document.querySelector('nav[data-scope="navigation"]') as HTMLElement
    expect(nav.querySelectorAll('li[data-overflow]')).toHaveLength(3)
    expect(nav.querySelector('[data-part="overflow-toggle"]')).not.toBeNull()
  })
})

describe('select negative paths', () => {
  it('tolerates a controlled value that is not in items', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Select.Root
          aria-label="Fruit"
          searchable
          items={[{ value: 'apple', label: 'Apple' }]}
          value="missing"
        >
          <Select.Trigger placeholder="Pick" />
          <Select.Content />
        </Select.Root>
      </ProteanProvider>
    )
    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger.textContent).toContain('Pick')
    fireEvent.click(trigger)
    expect(
      document.querySelectorAll('[data-scope="select"][data-part="item"]')
    ).toHaveLength(1)
  })
})
