'use client'

import { Tooltip } from '@protean-ui/react'

export function TooltipDemo({ label, hint, text }: { readonly label: string; readonly hint: string; readonly text: string }) {
  return (
    <p style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
      {text}
      <Tooltip.Root>
        <Tooltip.Trigger aria-label={label}>?</Tooltip.Trigger>
        <Tooltip.Content>{hint}</Tooltip.Content>
      </Tooltip.Root>
    </p>
  )
}
