'use client'

import { Select } from '@protean-ui/react'
import * as React from 'react'

const countries = [
  { value: 'ar', label: 'Argentina' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'ca', label: 'Canada' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'Korea' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'no', label: 'Norway' },
  { value: 'pt', label: 'Portugal' }
]

export function SearchableSelectDemo({
  label,
  placeholder,
  searchPlaceholder,
  emptyLabel
}: {
  readonly label: string
  readonly placeholder: string
  readonly searchPlaceholder: string
  readonly emptyLabel: string
}) {
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <Select.Root
      aria-label={label}
      searchable
      items={countries}
      value={value}
      onValueChange={setValue}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
    >
      <Select.Trigger placeholder={placeholder} />
      <Select.Content />
    </Select.Root>
  )
}
