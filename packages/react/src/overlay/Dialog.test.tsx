import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Dialog from './index.parts'

function renderDialog(props: Partial<React.ComponentProps<typeof Dialog.Root>> = {}) {
  return render(
    <ProteanProvider>
      <Dialog.Root role="form" {...props}>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content title="Shipping">
          <p>content</p>
        </Dialog.Content>
      </Dialog.Root>
    </ProteanProvider>
  )
}

function openedPopup(): HTMLElement {
  const popup = document.querySelector<HTMLElement>('[data-scope="overlay"][data-part="popup"]')
  expect(popup).not.toBeNull()
  return popup as HTMLElement
}

describe('Dialog', () => {
  it('presents a form as a modal for expanded + pointer', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderDialog()
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const popup = openedPopup()
    expect(popup.getAttribute('data-presentation')).toBe('modal')
    expect(popup.getAttribute('role')).toBe('dialog')
  })

  it('presents a form as fullscreen for compact + touch', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderDialog()
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })

  it('keeps a modal even in a compact window when the pointer is fine', () => {
    installEnvironment({ width: 500, coarse: false, hover: true })
    renderDialog()
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(openedPopup().getAttribute('data-presentation')).toBe('modal')
  })

  it('re-decides at the next open after the environment changes', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderDialog()
    const trigger = screen.getByRole('button', { name: 'Open' })

    fireEvent.click(trigger)
    expect(openedPopup().getAttribute('data-presentation')).toBe('modal')

    fireEvent.click(trigger)
    act(() => env.set({ width: 375, coarse: true, hover: false }))

    fireEvent.click(trigger)
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })

  it('decides at mount when defaultOpen is set (no trigger interaction)', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderDialog({ defaultOpen: true })
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })

  it('decides when a controlled open flips to true externally', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const view = renderDialog({ open: false })
    expect(document.querySelector('[data-part="popup"]')).toBeNull()

    view.rerender(
      <ProteanProvider>
        <Dialog.Root role="form" open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content title="Shipping">
            <p>content</p>
          </Dialog.Content>
        </Dialog.Root>
      </ProteanProvider>
    )
    expect(
      (await screen.findByRole('dialog')).getAttribute('data-presentation')
    ).toBe('modal')
  })

  it('supports alertdialog semantics, description wiring, and initial focus', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    function Harness() {
      const cancelRef = React.useRef<HTMLButtonElement | null>(null)
      return (
        <ProteanProvider>
          <Dialog.Root role="confirmation" defaultOpen>
            <Dialog.Content
              title="Reset"
              alert
              describedBy="reset-description"
              initialFocus={cancelRef}
            >
              <p id="reset-description">This cannot be undone.</p>
              <button type="button">Confirm</button>
              <button type="button" ref={cancelRef}>
                Cancel
              </button>
            </Dialog.Content>
          </Dialog.Root>
        </ProteanProvider>
      )
    }
    render(<Harness />)

    const popup = screen.getByRole('alertdialog', { name: 'Reset' })
    expect(popup.getAttribute('aria-describedby')).toBe('reset-description')
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' }))
    )
  })

  it('works without a provider via the app-first defaults', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <Dialog.Root role="form" defaultOpen>
        <Dialog.Content title="Standalone">
          <p>content</p>
        </Dialog.Content>
      </Dialog.Root>
    )
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })

  it('honors an instance override over the policy', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderDialog({ presentation: 'fullscreen' })
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })
})
