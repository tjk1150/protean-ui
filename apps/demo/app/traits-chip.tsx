'use client'

import { useTraits } from '@protean-ui/react'

export function TraitsChip() {
  const traits = useTraits()
  return (
    <code className="traits-chip">
      size={traits.size} · input={traits.input} · hover={traits.hover ? 'yes' : 'no'}
    </code>
  )
}
