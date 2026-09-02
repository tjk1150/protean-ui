import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import * as Menu from './menu/index.parts'
import * as Dialog from './overlay/index.parts'
import { ProteanProvider } from './provider'
import * as Select from './select/index.parts'
import { installEnvironment } from './test/environment-mock'
import * as Tooltip from './tooltip/index.parts'

/* Popups are portaled, so ancestor-based density selectors can never reach
   them - every portaled surface stamps its own data-density, exactly like
   data-presentation. The provider-level density (a user setting) must land
   on the popup as an instance decision. */

function popup(scope: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-scope="${scope}"][data-part="popup"]`)
}

describe('density stamps on portaled surfaces', () => {
  it('dialog popups carry the density profile', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider density="compact">
        <Dialog.Root role="form">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Form">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup('overlay')?.getAttribute('data-density')).toBe('compact')
  })

  it('menu popups carry the density profile', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Menu.Root>
          <Menu.Trigger>More</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={() => {}}>Share</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'More' }))
    expect(popup('menu')?.getAttribute('data-density')).toBe('comfortable')
  })

  it('select popups carry the density profile', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Select.Root aria-label="Billing cycle" defaultValue="monthly" defaultOpen>
          <Select.Trigger placeholder="Billing cycle" />
          <Select.Content>
            <Select.Item value="monthly">Monthly</Select.Item>
          </Select.Content>
        </Select.Root>
      </ProteanProvider>
    )
    expect(popup('select')?.getAttribute('data-density')).toBe('touch')
  })

  it('tooltip popups carry the density profile', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider density="comfortable">
        <Tooltip.Root>
          <Tooltip.Trigger aria-label="Info">?</Tooltip.Trigger>
          <Tooltip.Content>hint</Tooltip.Content>
        </Tooltip.Root>
      </ProteanProvider>
    )
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Info' }))
    })
    expect(popup('tooltip')?.getAttribute('data-density')).toBe('comfortable')
  })
})
