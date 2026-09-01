import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import * as ListDetail from './index.parts'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'

function renderListDetail(props: Partial<React.ComponentProps<typeof ListDetail.Root>> = {}) {
  return render(
    <ProteanProvider>
      <ListDetail.Root aria-label="Inbox" {...props}>
        <ListDetail.List>
          <button>Message one</button>
        </ListDetail.List>
        <ListDetail.Detail>
          <ListDetail.Back>Back</ListDetail.Back>
          <p>Detail body</p>
        </ListDetail.Detail>
      </ListDetail.Root>
    </ProteanProvider>
  )
}

function root(): HTMLElement {
  return document.querySelector('[data-scope="list-detail"]') as HTMLElement
}

describe('ListDetail', () => {
  it('presents as panes on expanded and stamps both panes in one DOM', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderListDetail()

    expect(root().getAttribute('data-presentation')).toBe('panes')
    expect(root().querySelector('[data-part="list"]')).not.toBeNull()
    expect(root().querySelector('[data-part="detail"]')).not.toBeNull()
    expect(root().hasAttribute('data-detail-active')).toBe(false)
  })

  it('presents as a stack on compact with the same DOM', () => {
    const env = installEnvironment({ width: 1280, coarse: false, hover: true })
    renderListDetail()
    const before = root().innerHTML

    act(() => env.set({ width: 375, coarse: true, hover: false }))
    expect(root().getAttribute('data-presentation')).toBe('stack')
    expect(root().innerHTML).toBe(before.replace('data-presentation="panes"', 'data-presentation="stack"'))
  })

  it('stamps detail activation from the prop', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderListDetail({ detailActive: true })
    expect(root().hasAttribute('data-detail-active')).toBe(true)
  })

  it('wires the back part to onBack', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    const onBack = vi.fn()
    renderListDetail({ detailActive: true, onBack })

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('moves focus to the detail pane when it activates in the stack', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    const { rerender } = render(
      <ProteanProvider>
        <ListDetail.Root aria-label="Inbox" detailActive={false}>
          <ListDetail.List>
            <button>Message one</button>
          </ListDetail.List>
          <ListDetail.Detail>
            <p>Detail body</p>
          </ListDetail.Detail>
        </ListDetail.Root>
      </ProteanProvider>
    )
    rerender(
      <ProteanProvider>
        <ListDetail.Root aria-label="Inbox" detailActive>
          <ListDetail.List>
            <button>Message one</button>
          </ListDetail.List>
          <ListDetail.Detail>
            <p>Detail body</p>
          </ListDetail.Detail>
        </ListDetail.Root>
      </ProteanProvider>
    )
    const detail = document.querySelector('[data-part="detail"]') as HTMLElement
    expect(detail.contains(document.activeElement)).toBe(true)
  })

  it('does not steal focus when panes show both sides anyway', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const { rerender } = render(
      <ProteanProvider>
        <ListDetail.Root aria-label="Inbox" detailActive={false}>
          <ListDetail.List>
            <button>Message one</button>
          </ListDetail.List>
          <ListDetail.Detail>
            <p>Detail body</p>
          </ListDetail.Detail>
        </ListDetail.Root>
      </ProteanProvider>
    )
    const item = screen.getByRole('button', { name: 'Message one' })
    act(() => item.focus())
    rerender(
      <ProteanProvider>
        <ListDetail.Root aria-label="Inbox" detailActive>
          <ListDetail.List>
            <button>Message one</button>
          </ListDetail.List>
          <ListDetail.Detail>
            <p>Detail body</p>
          </ListDetail.Detail>
        </ListDetail.Root>
      </ProteanProvider>
    )
    expect(document.activeElement).toBe(item)
  })

  it('honors an instance override', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderListDetail({ presentation: 'stack' })
    expect(root().getAttribute('data-presentation')).toBe('stack')
  })
})
