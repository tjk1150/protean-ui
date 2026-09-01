import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Select from './index.parts'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' }
] as const

function renderSearchable(props: Partial<React.ComponentProps<typeof Select.Root>> = {}) {
  return render(
    <ProteanProvider>
      <Select.Root aria-label="Fruit" searchable items={fruits} {...props}>
        <Select.Trigger placeholder="Pick a fruit" />
        <Select.Content />
      </Select.Root>
    </ProteanProvider>
  )
}

function searchInput(): HTMLInputElement {
  const input = document.querySelector<HTMLInputElement>('[data-scope="select"][data-part="search"]')
  expect(input).not.toBeNull()
  return input as HTMLInputElement
}

function visibleItems(): string[] {
  return Array.from(document.querySelectorAll('[data-scope="select"][data-part="item"]')).map(
    (item) => item.textContent ?? ''
  )
}

describe('Select searchable', () => {
  it('requires items', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    expect(() =>
      render(
        <ProteanProvider>
          <Select.Root aria-label="Fruit" searchable>
            <Select.Trigger />
            <Select.Content />
          </Select.Root>
        </ProteanProvider>
      )
    ).toThrow(/items/)
  })

  it('opens a popover with a search input on desktop', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderSearchable()

    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => {
      expect(
        document.querySelector('[data-part="popup"]')?.getAttribute('data-presentation')
      ).toBe('popover')
    })
    expect(searchInput()).toBeTruthy()
    expect(visibleItems()).toHaveLength(4)
  })

  it('filters items by label as the user types', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderSearchable()

    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => expect(searchInput()).toBeTruthy())

    fireEvent.change(searchInput(), { target: { value: 'bl' } })
    await waitFor(() => expect(visibleItems()).toEqual(['Blueberry']))
  })

  it('shows the empty state when nothing matches', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderSearchable()

    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => expect(searchInput()).toBeTruthy())

    fireEvent.change(searchInput(), { target: { value: 'zzz' } })
    await waitFor(() => {
      expect(document.querySelector('[data-scope="select"][data-part="empty"]')).not.toBeNull()
    })
    expect(visibleItems()).toHaveLength(0)
  })

  it('reports the chosen string value and closes on selection', async () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const onValueChange = vi.fn()
    renderSearchable({ onValueChange })

    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => expect(visibleItems()).toHaveLength(4))

    fireEvent.click(screen.getByText('Banana'))
    expect(onValueChange).toHaveBeenCalledWith('banana')
    await waitFor(() => {
      expect(document.querySelector('[data-part="popup"]')).toBeNull()
    })
  })

  it('presents as a sheet with the search input for compact + touch', async () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderSearchable()

    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => {
      expect(
        document.querySelector('[data-part="popup"]')?.getAttribute('data-presentation')
      ).toBe('sheet')
    })
    expect(searchInput()).toBeTruthy()
    expect(
      document.querySelector('[data-scope="select"][data-part="backdrop"]')
    ).not.toBeNull()
  })
})
