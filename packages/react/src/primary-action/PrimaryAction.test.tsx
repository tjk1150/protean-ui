import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as PrimaryAction from './index.parts'

function renderAction(props: Partial<React.ComponentProps<typeof PrimaryAction.Root>> = {}) {
  return render(
    <ProteanProvider>
      <PrimaryAction.Root {...props}>Buy now</PrimaryAction.Root>
    </ProteanProvider>
  )
}

function container(): HTMLElement {
  return document.querySelector('[data-scope="primary-action"]') as HTMLElement
}

describe('PrimaryAction', () => {
  it('stamps action-bar for compact + touch', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderAction()
    expect(container().getAttribute('data-presentation')).toBe('action-bar')
  })

  it('stamps sticky-footer for compact + pointer', () => {
    installEnvironment({ width: 500, coarse: false, hover: true })
    renderAction()
    expect(container().getAttribute('data-presentation')).toBe('sticky-footer')
  })

  it('stamps inline for expanded environments', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderAction()
    expect(container().getAttribute('data-presentation')).toBe('inline')
  })

  it('honors an instance override and keeps button semantics', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const onClick = vi.fn()
    renderAction({ presentation: 'action-bar', onClick, disabled: false })
    expect(container().getAttribute('data-presentation')).toBe('action-bar')

    const button = screen.getByRole('button', { name: 'Buy now' })
    expect(button.getAttribute('type')).toBe('button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('tracks the virtual keyboard through visualViewport', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    const listeners = new Set<() => void>()
    const viewport = {
      height: 800,
      offsetTop: 0,
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb)
    }
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport })

    renderAction()
    expect(container().style.getPropertyValue('--protean-vk-offset')).toBe('0px')

    viewport.height = 500
    for (const cb of listeners) cb()
    expect(container().style.getPropertyValue('--protean-vk-offset')).toBe('300px')

    Object.defineProperty(window, 'visualViewport', { configurable: true, value: undefined })
  })
})
