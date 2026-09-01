import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Dialog from './index.parts'

function popup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="overlay"][data-part="popup"]')
}

function renderContinuity(continuity?: 'pinned' | 'live') {
  return render(
    <ProteanProvider>
      <Dialog.Root role="confirmation" {...(continuity ? { continuity } : {})}>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Content title="Shipping">
          <input aria-label="Address" defaultValue="" />
        </Dialog.Content>
      </Dialog.Root>
    </ProteanProvider>
  )
}

describe('Dialog continuity', () => {
  it('live: swaps the presentation mid-open and preserves the exact content DOM', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderContinuity('live')

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup()?.getAttribute('data-presentation')).toBe('modal')

    const input = screen.getByLabelText('Address') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Seoul, Mapo-gu' } })

    act(() => env.set({ width: 375, coarse: true, hover: false }))

    const swapped = popup()
    expect(swapped?.getAttribute('data-presentation')).toBe('sheet')
    // The money assertion: modal (Dialog backend) swapped to sheet (Drawer
    // backend) and the same element survived, value intact.
    expect(document.contains(input)).toBe(true)
    expect(input.value).toBe('Seoul, Mapo-gu')
    expect(swapped?.contains(input)).toBe(true)
  })

  it('live: keeps focus inside the overlay across the swap', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderContinuity('live')

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const input = screen.getByLabelText('Address') as HTMLInputElement
    act(() => input.focus())

    act(() => env.set({ width: 375, coarse: true, hover: false }))
    expect(popup()?.contains(document.activeElement)).toBe(true)
  })

  it('live: still renders zero overlay markup while closed', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderContinuity('live')
    expect(popup()).toBeNull()
  })

  it('pinned stays the default: no swap while open', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderContinuity()

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(popup()?.getAttribute('data-presentation')).toBe('modal')

    act(() => env.set({ width: 375, coarse: true, hover: false }))
    expect(popup()?.getAttribute('data-presentation')).toBe('modal')
  })
})
