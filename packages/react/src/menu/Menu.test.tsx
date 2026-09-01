import { appFirst, definePolicy } from '@protean-ui/core'
import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ProteanBoundary } from '../boundary'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Menu from './index.parts'

function renderMenu(handlers: { onShare?: () => void; onRemove?: () => void } = {}) {
  return render(
    <ProteanProvider>
      <Menu.Root>
        <Menu.Trigger>More actions</Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={handlers.onShare}>Share</Menu.Item>
          <Menu.Item disabled>Rename</Menu.Item>
          <Menu.Separator />
          <Menu.Item destructive onSelect={handlers.onRemove}>
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </ProteanProvider>
  )
}

function popup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="menu"][data-part="popup"]')
}

describe('Menu', () => {
  it('presents as an anchored popover for expanded + pointer', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderMenu()

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
    expect(popup()?.getAttribute('role')).toBe('menu')
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThanOrEqual(3)
  })

  it('presents as an action sheet for compact + touch, with a scrim', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderMenu()

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    expect(popup()?.getAttribute('data-presentation')).toBe('sheet')
    expect(
      document.querySelector('[data-scope="menu"][data-part="backdrop"]')
    ).not.toBeNull()
  })

  it('fires onSelect and closes on item click', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const onShare = vi.fn()
    renderMenu({ onShare })

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Share' }))
    expect(onShare).toHaveBeenCalledTimes(1)
    expect(popup()).toBeNull()
  })

  it('does not fire a disabled item', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderMenu()

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    const item = screen.getByRole('menuitem', { name: 'Rename' })
    expect(item.getAttribute('aria-disabled')).toBe('true')
  })

  it('stamps destructive items for styling', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderMenu()

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }).getAttribute('data-variant')
    ).toBe('danger')
  })

  it('re-decides at the next open after the environment changes', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderMenu()
    const trigger = screen.getByRole('button', { name: 'More actions' })

    fireEvent.click(trigger)
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
    fireEvent.click(trigger)

    act(() => env.set({ width: 375, coarse: true, hover: false }))
    fireEvent.click(trigger)
    expect(popup()?.getAttribute('data-presentation')).toBe('sheet')
  })

  it('contains the sheet inside a boundary', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const containerAware = definePolicy({
      extends: appFirst,
      overlay: ({ traits, defaults }) => (traits.size === 'compact' ? 'sheet' : defaults())
    })
    render(
      <ProteanProvider policy={containerAware}>
        <ProteanBoundary data-testid="panel">
          <Menu.Root>
            <Menu.Trigger>More actions</Menu.Trigger>
            <Menu.Content>
              <Menu.Item>Share</Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </ProteanBoundary>
      </ProteanProvider>
    )
    const panel = screen.getByTestId('panel')
    panel.getBoundingClientRect = () =>
      ({ width: 480, height: 600, top: 0, left: 0, right: 480, bottom: 600, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    const sheet = popup()
    expect(sheet?.getAttribute('data-presentation')).toBe('sheet')
    expect(sheet?.closest('[data-scope="boundary"]')).not.toBeNull()
    expect(sheet?.hasAttribute('data-contained')).toBe(true)
  })
})
