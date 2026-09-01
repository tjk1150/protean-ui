import { appFirst, definePolicy } from '@protean-ui/core'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { ProteanBoundary } from './boundary'
import * as Dialog from './overlay/index.parts'
import { ProteanProvider } from './provider'
import { installEnvironment } from './test/environment-mock'

// Size-sensitive at every size class, so the container's class is observable.
const containerAware = definePolicy({
  extends: appFirst,
  overlay: ({ traits, defaults }) => (traits.size === 'compact' ? 'sheet' : defaults())
})

function mockWidth(element: HTMLElement, width: number): void {
  element.getBoundingClientRect = () =>
    ({
      width,
      height: 600,
      top: 0,
      left: 0,
      right: width,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => ({})
    }) as DOMRect
}

function renderInBoundary() {
  return render(
    <ProteanProvider policy={containerAware}>
      <ProteanBoundary data-testid="panel">
        <Dialog.Root role="form">
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Inside">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanBoundary>
    </ProteanProvider>
  )
}

function popup(): HTMLElement {
  const element = document.querySelector<HTMLElement>('[data-scope="overlay"][data-part="popup"]')
  expect(element).not.toBeNull()
  return element as HTMLElement
}

describe('ProteanBoundary', () => {
  it('stamps the boundary scope on the wrapper', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()
    expect(screen.getByTestId('panel').getAttribute('data-scope')).toBe('boundary')
  })

  it('scopes overlay size decisions to the boundary width', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()
    mockWidth(screen.getByTestId('panel'), 480)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup().getAttribute('data-presentation')).toBe('sheet')
  })

  it('keeps the viewport decision when the boundary is as wide as its class', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()
    mockWidth(screen.getByTestId('panel'), 1000)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup().getAttribute('data-presentation')).toBe('modal')
  })

  it('falls back to viewport traits when the boundary is unmeasurable', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup().getAttribute('data-presentation')).toBe('modal')
  })
})

describe('portal to boundary', () => {
  it('renders a contained sheet inside the boundary element', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()
    mockWidth(screen.getByTestId('panel'), 480)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const sheet = popup()
    expect(sheet.getAttribute('data-presentation')).toBe('sheet')
    expect(sheet.closest('[data-scope="boundary"]')).not.toBeNull()
    expect(sheet.hasAttribute('data-contained')).toBe(true)
    expect(
      document
        .querySelector('[data-scope="overlay"][data-part="backdrop"]')
        ?.hasAttribute('data-contained')
    ).toBe(true)
  })

  it('renders a contained modal inside the boundary element', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderInBoundary()
    mockWidth(screen.getByTestId('panel'), 1000)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const modal = popup()
    expect(modal.getAttribute('data-presentation')).toBe('modal')
    expect(modal.closest('[data-scope="boundary"]')).not.toBeNull()
    expect(modal.hasAttribute('data-contained')).toBe(true)
  })

  it('leaves anchored popovers at the document level', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    render(
      <ProteanProvider>
        <ProteanBoundary data-testid="panel">
          <Dialog.Root role="contextual">
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content title="Menu">
              <p>content</p>
            </Dialog.Content>
          </Dialog.Root>
        </ProteanBoundary>
      </ProteanProvider>
    )
    mockWidth(screen.getByTestId('panel'), 480)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const popover = popup()
    expect(popover.getAttribute('data-presentation')).toBe('popover')
    expect(popover.closest('[data-scope="boundary"]')).toBeNull()
    expect(popover.hasAttribute('data-contained')).toBe(false)
  })

  it('stamps nothing outside a boundary', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
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
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup().getAttribute('data-presentation')).toBe('sheet')
    expect(popup().hasAttribute('data-contained')).toBe(false)
    expect(popup().closest('[data-scope="boundary"]')).toBeNull()
  })
})
