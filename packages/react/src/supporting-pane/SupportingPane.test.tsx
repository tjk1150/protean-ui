import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as SupportingPane from './index.parts'

function renderPane(props: { compact?: 'sheet' | 'stacked' } = {}) {
  return render(
    <ProteanProvider>
      <SupportingPane.Root paneLabel="Metadata" {...props}>
        <SupportingPane.Main>
          <p>The document body.</p>
        </SupportingPane.Main>
        <SupportingPane.Pane>
          <p>Author, dates, size.</p>
        </SupportingPane.Pane>
      </SupportingPane.Root>
    </ProteanProvider>
  )
}

function root(): HTMLElement {
  const element = document.querySelector<HTMLElement>('[data-scope="supporting"]')
  expect(element).not.toBeNull()
  return element as HTMLElement
}

describe('SupportingPane', () => {
  it('marks up main, pane, and toggle identically across environments', () => {
    // useId values differ between separate mounts (never between server and
    // client, which share one render pass) - normalize them before comparing.
    const normalize = (html: string) => html.replace(/_r_\d+_/g, '_id_')

    installEnvironment({ width: 1280, coarse: false, hover: true })
    const wide = renderPane()
    const wideHtml = normalize(wide.container.innerHTML)
    wide.unmount()

    installEnvironment({ width: 375, coarse: true, hover: false })
    const narrow = renderPane()
    expect(normalize(narrow.container.innerHTML)).toBe(wideHtml)
  })

  it('toggles the sheet open state with aria wiring', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderPane()

    const toggle = screen.getByRole('button', { name: 'Metadata' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(root().hasAttribute('data-open')).toBe(false)
    expect(toggle.getAttribute('aria-controls')).toBe(
      document.querySelector('[data-part="pane"]')?.id
    )

    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(root().hasAttribute('data-open')).toBe(true)

    fireEvent.click(toggle)
    expect(root().hasAttribute('data-open')).toBe(false)
  })

  it('closes on Escape from within', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderPane()

    fireEvent.click(screen.getByRole('button', { name: 'Metadata' }))
    expect(root().hasAttribute('data-open')).toBe(true)

    fireEvent.keyDown(screen.getByText('Author, dates, size.'), { key: 'Escape' })
    expect(root().hasAttribute('data-open')).toBe(false)
  })

  it('closes when the backdrop is clicked', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderPane()

    fireEvent.click(screen.getByRole('button', { name: 'Metadata' }))
    const backdrop = document.querySelector<HTMLElement>(
      '[data-scope="supporting"] [data-part="backdrop"]'
    )
    expect(backdrop).not.toBeNull()
    fireEvent.click(backdrop as HTMLElement)
    expect(root().hasAttribute('data-open')).toBe(false)
  })

  it('renders no toggle and stamps the root when compact is stacked', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderPane({ compact: 'stacked' })

    expect(root().getAttribute('data-compact')).toBe('stacked')
    expect(screen.queryByRole('button', { name: 'Metadata' })).toBeNull()
  })

  it('exposes the pane as a labeled complementary region', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderPane()

    const pane = screen.getByRole('complementary', { name: 'Metadata' })
    expect(pane.getAttribute('data-part')).toBe('pane')
  })
})
