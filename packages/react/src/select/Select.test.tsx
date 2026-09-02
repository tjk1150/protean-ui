import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ProteanProvider } from '../provider'
import { installEnvironment } from '../test/environment-mock'
import * as Select from './index.parts'

function renderSelect(props: Partial<React.ComponentProps<typeof Select.Root>> = {}) {
  return render(
    <ProteanProvider>
      <Select.Root aria-label="Billing cycle" defaultValue="monthly" {...props}>
        <Select.Trigger placeholder="Billing cycle" />
        <Select.Content>
          <Select.Item value="monthly">Monthly</Select.Item>
          <Select.Item value="yearly">Yearly</Select.Item>
        </Select.Content>
      </Select.Root>
    </ProteanProvider>
  )
}

function popup(): HTMLElement | null {
  return document.querySelector('[data-scope="select"][data-part="popup"]')
}

describe('Select', () => {
  it('presents as an anchored popover for pointer environments', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderSelect({ defaultOpen: true })
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
    expect(document.querySelector('[data-part="backdrop"]')).toBeNull()
    expect(screen.getByRole('combobox', { name: 'Billing cycle' })).toBeTruthy()
  })

  it('presents as a bottom sheet with a backdrop for compact + touch', () => {
    installEnvironment({ width: 375, coarse: true, hover: false })
    renderSelect({ defaultOpen: true })
    expect(popup()?.getAttribute('data-presentation')).toBe('sheet')
    expect(
      document.querySelector('[data-scope="select"][data-part="backdrop"]')
    ).not.toBeNull()
  })

  it('keeps a popover in medium touch environments (tablet convention)', () => {
    installEnvironment({ width: 768, coarse: true, hover: false })
    renderSelect({ defaultOpen: true })
    expect(popup()?.getAttribute('data-presentation')).toBe('popover')
  })

  it('renders listbox semantics through the Base UI backend', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    renderSelect({ defaultOpen: true })
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  it('delegates to a native select when asked', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const onValueChange = vi.fn()
    render(
      <ProteanProvider>
        <Select.Root
          aria-label="Billing cycle"
          presentation="native"
          defaultValue="monthly"
          onValueChange={onValueChange}
          items={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' }
          ]}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="monthly">Monthly</Select.Item>
          </Select.Content>
        </Select.Root>
      </ProteanProvider>
    )
    const native = screen.getByRole('combobox', { name: 'Billing cycle' })
    expect(native.tagName).toBe('SELECT')
    expect(native.querySelectorAll('option')).toHaveLength(2)
  })
  it('opens from a controlled prop and reports transitions', () => {
    installEnvironment({ width: 1280, coarse: false, hover: true })
    const seen: boolean[] = []
    function Harness() {
      const [open, setOpen] = React.useState(false)
      return (
        <ProteanProvider>
          <button onClick={() => setOpen(true)}>external open</button>
          <Select.Root
            aria-label="Billing cycle"
            defaultValue="monthly"
            open={open}
            onOpenChange={(next) => {
              seen.push(next)
              setOpen(next)
            }}
          >
            <Select.Trigger placeholder="Billing cycle" />
            <Select.Content>
              <Select.Item value="monthly">Monthly</Select.Item>
              <Select.Item value="yearly">Yearly</Select.Item>
            </Select.Content>
          </Select.Root>
        </ProteanProvider>
      )
    }
    render(<Harness />)

    expect(popup()).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'external open' }))
    expect(popup()).not.toBeNull()
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

})
