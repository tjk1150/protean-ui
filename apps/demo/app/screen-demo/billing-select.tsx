'use client'

import { Select } from '@protean-ui/react'
import * as React from 'react'

const cycles = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly - 2 months free' },
  { value: 'team', label: 'Team - per seat' },
  { value: 'sponsor', label: 'Sponsorware' }
]

export function BillingSelect() {
  const [value, setValue] = React.useState<string | null>('monthly')
  return (
    <Select.Root aria-label="Billing cycle" value={value} onValueChange={setValue} items={cycles}>
      <Select.Trigger placeholder="Billing cycle" />
      <Select.Content>
        <Select.Item value="monthly">Monthly</Select.Item>
        <Select.Item value="yearly">Yearly - 2 months free</Select.Item>
        <Select.Item value="team">Team - per seat</Select.Item>
        <Select.Item value="sponsor">Sponsorware</Select.Item>
      </Select.Content>
    </Select.Root>
  )
}
