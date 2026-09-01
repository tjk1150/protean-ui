import axe from 'axe-core'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import * as Dialog from './overlay/index.parts'
import * as Menu from './menu/index.parts'
import * as Navigation from './navigation/index.parts'
import * as Select from './select/index.parts'
import { ProteanProvider } from './provider'
import { installEnvironment } from './test/environment-mock'

/* Automated slice of the quality gate's axe criterion: no critical or
   serious violations introduced by protean on its key open states. The one
   allowed serious finding is the shared backend's focus-guard sentinel
   (aria-hidden-focus), documented in the launch receipts as equal to the
   manual baseline. Full-page demo audits remain a manual gate item. */

const allowedSerious = new Set(['aria-hidden-focus'])

async function expectClean(label: string): Promise<void> {
  const result = await axe.run(document.body, {
    rules: {
      // jsdom cannot rasterize, so contrast cannot be computed here.
      'color-contrast': { enabled: false },
      // Component tests render fragments, not full pages.
      region: { enabled: false },
      'landmark-one-main': { enabled: false },
      'page-has-heading-one': { enabled: false }
    }
  })
  const critical = result.violations.filter((violation) => violation.impact === 'critical')
  const serious = result.violations.filter(
    (violation) => violation.impact === 'serious' && !allowedSerious.has(violation.id)
  )
  expect(critical.map((v) => `${label}: ${v.id}`)).toEqual([])
  expect(serious.map((v) => `${label}: ${v.id}`)).toEqual([])
}

describe('axe on key open states', () => {
  it('modal form dialog', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Dialog.Root role="form">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Edit address">
            <label>
              Address <input defaultValue="" />
            </label>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    await expectClean('modal')
  })

  it('fullscreen dialog on compact touch', async () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Dialog.Root role="form">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Edit address">
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    await expectClean('fullscreen')
  })

  it('navigation bar with the overflow panel open', async () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Navigation.Root aria-label="Primary">
          {['Home', 'Orders', 'Growth', 'Friends', 'Settings', 'Rewards', 'Help'].map(
            (label) => (
              <Navigation.Item key={label} onClick={() => {}}>
                {label}
              </Navigation.Item>
            )
          )}
        </Navigation.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'More' }))
    await expectClean('bar-overflow')
  })

  it('menu popover open', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Menu.Root>
          <Menu.Trigger>More actions</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Share</Menu.Item>
            <Menu.Separator />
            <Menu.Item destructive>Delete</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    await expectClean('menu-popover')
  })

  it('menu action sheet open', async () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Menu.Root>
          <Menu.Trigger>More actions</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Share</Menu.Item>
            <Menu.Item destructive>Delete</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
    await expectClean('menu-sheet')
  })

  it('searchable select open', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <Select.Root
          aria-label="Country"
          searchable
          searchPlaceholder="Search countries"
          items={[
            { value: 'kr', label: 'Korea' },
            { value: 'no', label: 'Norway' }
          ]}
        >
          <Select.Trigger placeholder="Pick" />
          <Select.Content />
        </Select.Root>
      </ProteanProvider>
    )
    fireEvent.click(screen.getByRole('combobox', { name: 'Country' }))
    await expectClean('searchable-select')
  })
})
