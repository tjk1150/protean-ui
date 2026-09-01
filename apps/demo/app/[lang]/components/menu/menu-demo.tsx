'use client'

import { Menu } from '@protean-ui/react'
import * as React from 'react'

export function MenuDemo({
  trigger,
  share,
  duplicate,
  remove,
  onPick
}: {
  readonly trigger: string
  readonly share: string
  readonly duplicate: string
  readonly remove: string
  readonly onPick: string
}) {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Menu.Root>
        <Menu.Trigger>{trigger}</Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={() => setPicked(share)}>{share}</Menu.Item>
          <Menu.Item onSelect={() => setPicked(duplicate)}>{duplicate}</Menu.Item>
          <Menu.Separator />
          <Menu.Item destructive onSelect={() => setPicked(remove)}>
            {remove}
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
      {picked ? (
        <span className="hint">
          {onPick}: {picked}
        </span>
      ) : null}
    </div>
  )
}
