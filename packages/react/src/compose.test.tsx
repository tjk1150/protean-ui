import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import * as Menu from './menu/index.parts'
import * as Dialog from './overlay/index.parts'
import { ProteanProvider } from './provider'
import { installEnvironment } from './test/environment-mock'
import * as Tooltip from './tooltip/index.parts'

/* One element, several roles: the Base UI render convention. The action owner
   (Dialog, Menu) stays outermost and composes its behavior onto the element
   you hand it - a styled host button, or a Tooltip.Trigger. */

function overlayPopup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="overlay"][data-part="popup"]')
}

function tooltipPopup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="tooltip"][data-part="popup"]')
}

describe('trigger render composition', () => {
  it('Dialog.Trigger renders onto a host element instead of its own button', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Dialog.Root role="form">
          <Dialog.Trigger render={<button className="fancy" />}>Open</Dialog.Trigger>
          <Dialog.Content title="Form">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )

    expect(screen.getAllByRole('button')).toHaveLength(1)
    const trigger = screen.getByRole('button', { name: 'Open' })
    expect(trigger.className).toContain('fancy')
    expect(trigger.getAttribute('data-part')).toBe('trigger')
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')

    fireEvent.click(trigger)
    expect(overlayPopup()).not.toBeNull()
  })

  it('Menu.Trigger renders onto a host element and still opens the menu', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Menu.Root>
          <Menu.Trigger render={<button className="fancy" />}>More</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={() => {}}>Share</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </ProteanProvider>
    )

    expect(screen.getAllByRole('button')).toHaveLength(1)
    const trigger = screen.getByRole('button', { name: 'More' })
    expect(trigger.className).toContain('fancy')

    fireEvent.click(trigger)
    expect(screen.getByRole('menuitem', { name: 'Share' })).toBeTruthy()
  })

  it('passes button props through Menu.Trigger', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    let clicks = 0
    render(
      <ProteanProvider>
        <Menu.Root>
          <Menu.Trigger aria-label="More actions" onClick={() => (clicks += 1)}>
            ⋯
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={() => {}}>Share</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </ProteanProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    expect(clicks).toBe(1)
    expect(screen.getByRole('menuitem', { name: 'Share' })).toBeTruthy()
  })

  it('composes a hint and an action on one element', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Tooltip.Root>
          <Dialog.Root role="form">
            <Dialog.Trigger render={<Tooltip.Trigger aria-label="Share" />}>
              share
            </Dialog.Trigger>
            <Dialog.Content title="Share this">
              <p>content</p>
            </Dialog.Content>
          </Dialog.Root>
          <Tooltip.Content>Opens sharing options.</Tooltip.Content>
        </Tooltip.Root>
      </ProteanProvider>
    )

    expect(screen.getAllByRole('button')).toHaveLength(1)
    const trigger = screen.getByRole('button', { name: 'Share' })
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')

    // The hint still works: focus-visible opens the tooltip.
    act(() => {
      fireEvent.keyDown(document.body, { key: 'Tab' })
      trigger.focus()
      fireEvent.focus(trigger)
    })
    expect(tooltipPopup()?.getAttribute('role')).toBe('tooltip')

    // The action still works: click opens the dialog.
    fireEvent.click(trigger)
    expect(overlayPopup()).not.toBeNull()
  })

  it('delivers the composed element to a consumer ref', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const consumerRef = React.createRef<HTMLButtonElement>()
    render(
      <ProteanProvider>
        <Tooltip.Root>
          <Dialog.Root role="form">
            <Dialog.Trigger render={<Tooltip.Trigger ref={consumerRef} aria-label="Share" />}>
              share
            </Dialog.Trigger>
            <Dialog.Content title="Share this">
              <p>content</p>
            </Dialog.Content>
          </Dialog.Root>
          <Tooltip.Content>Opens sharing options.</Tooltip.Content>
        </Tooltip.Root>
      </ProteanProvider>
    )

    expect(consumerRef.current).toBe(screen.getByRole('button', { name: 'Share' }))
  })
})
