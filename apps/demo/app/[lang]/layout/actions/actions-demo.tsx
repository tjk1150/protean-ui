'use client'

import { Actions } from '@protean-ui/react'
import * as React from 'react'

export function ActionsDemo({
  labels,
  moreLabel,
  onPick
}: {
  readonly labels: { save: string; share: string; rename: string; remove: string }
  readonly moreLabel: string
  readonly onPick: string
}) {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="protean-defaults" style={{ display: 'grid', gap: 8 }}>
      <Actions.Root aria-label="Document tools" moreLabel={moreLabel}>
        <Actions.Item onClick={() => setPicked(labels.save)}>{labels.save}</Actions.Item>
        <Actions.Item onClick={() => setPicked(labels.share)}>{labels.share}</Actions.Item>
        <Actions.Item secondary onClick={() => setPicked(labels.rename)}>
          {labels.rename}
        </Actions.Item>
        <Actions.Item secondary destructive onClick={() => setPicked(labels.remove)}>
          {labels.remove}
        </Actions.Item>
      </Actions.Root>
      {picked ? (
        <span className="hint">
          {onPick}: {picked}
        </span>
      ) : null}
    </div>
  )
}
