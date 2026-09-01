import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Tooltip from './index.parts'

function renderHint(presentation?: 'tooltip' | 'popover') {
  return render(
    <ProteanProvider>
      <Tooltip.Root {...(presentation ? { presentation } : {})}>
        <Tooltip.Trigger aria-label="Shipping fee info">?</Tooltip.Trigger>
        <Tooltip.Content>Free over 30,000 won.</Tooltip.Content>
      </Tooltip.Root>
    </ProteanProvider>
  )
}

function popup(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-scope="tooltip"][data-part="popup"]')
}

describe('Tooltip', () => {
  it('presents as a hover tooltip when hover exists', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderHint()

    const trigger = screen.getByRole('button', { name: 'Shipping fee info' })
    // Base UI opens tooltips on focus-visible: precede focus with a key event.
    act(() => {
      fireEvent.keyDown(document.body, { key: 'Tab' })
      trigger.focus()
      fireEvent.focus(trigger)
    })
    expect(popup()?.getAttribute('data-presentation')).toBe('tooltip')
    expect(popup()?.getAttribute('role')).toBe('tooltip')
    expect(popup()?.textContent).toContain('Free over 30,000 won.')
  })

  it('presents as a tap-opened popover when hover does not exist', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderHint()

    const trigger = screen.getByRole('button', { name: 'Shipping fee info' })
    fireEvent.click(trigger)
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
    expect(popup()?.textContent).toContain('Free over 30,000 won.')

    fireEvent.click(trigger)
    expect(popup()).toBeNull()
  })

  it('honors an instance override', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderHint('popover')

    fireEvent.click(screen.getByRole('button', { name: 'Shipping fee info' }))
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
  })

  it('renders a plain trigger and no overlay markup while closed', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderHint()
    expect(screen.getByRole('button', { name: 'Shipping fee info' })).toBeTruthy()
    expect(popup()).toBeNull()
  })
})
