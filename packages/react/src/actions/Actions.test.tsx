import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import * as Actions from './index.parts'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'

function renderActions(handlers: { onSave?: () => void; onDelete?: () => void } = {}) {
  return render(
    <ProteanProvider>
      <Actions.Root aria-label="Document tools" moreLabel="More">
        <Actions.Item onClick={handlers.onSave}>Save</Actions.Item>
        <Actions.Item>Share</Actions.Item>
        <Actions.Item secondary>Rename</Actions.Item>
        <Actions.Item secondary destructive onClick={handlers.onDelete}>
          Delete
        </Actions.Item>
      </Actions.Root>
    </ProteanProvider>
  )
}

function root(): HTMLElement {
  return document.querySelector('[data-scope="actions"]') as HTMLElement
}

describe('Actions', () => {
  it('marks secondary items independent of the environment', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderActions()

    const secondary = root().querySelectorAll('[data-part="item"][data-secondary]')
    expect(secondary).toHaveLength(2)
    expect(
      screen.getByRole('button', { name: 'Save' }).hasAttribute('data-secondary')
    ).toBe(false)
  })

  it('renders the overflow toggle only when secondary items exist', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    render(
      <ProteanProvider>
        <Actions.Root aria-label="Tools" moreLabel="More">
          <Actions.Item>Save</Actions.Item>
        </Actions.Root>
      </ProteanProvider>
    )
    expect(document.querySelector('[data-part="overflow-toggle"]')).toBeNull()
  })

  it('toggles the overflow panel state with correct wiring', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderActions()

    const toggle = screen.getByRole('button', { name: 'More' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(toggle)
    expect(root().hasAttribute('data-overflow-open')).toBe(true)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(toggle)
    expect(root().hasAttribute('data-overflow-open')).toBe(false)
  })

  it('runs the action and closes the panel when a secondary item is chosen', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    const onDelete = vi.fn()
    renderActions({ onDelete })

    fireEvent.click(screen.getByRole('button', { name: 'More' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(root().hasAttribute('data-overflow-open')).toBe(false)
  })

  it('stamps destructive items for styling', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderActions()
    expect(
      screen.getByRole('button', { name: 'Delete' }).getAttribute('data-variant')
    ).toBe('danger')
  })

  it('keeps identical markup across environments (SSR-safe)', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderActions()
    const before = root().outerHTML
    act(() => env.set({ width: 375, coarse: true, hover: false }))
    expect(root().outerHTML).toBe(before)
  })
})
