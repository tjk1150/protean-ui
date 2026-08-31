import { act, fireEvent, render, screen } from '@testing-library/react'
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

  it('honors an instance override over the policy', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderDialog({ presentation: 'fullscreen' })
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(openedPopup().getAttribute('data-presentation')).toBe('fullscreen')
  })
})
