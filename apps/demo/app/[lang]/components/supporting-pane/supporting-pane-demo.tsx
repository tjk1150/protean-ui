'use client'

import { SupportingPane } from '@protean-ui/react'

export function SupportingPaneDemo({
  paneLabel,
  body,
  rows,
}: {
  paneLabel: string
  body: string
  rows: ReadonlyArray<readonly [string, string]>
}) {
  return (
    <div className="protean-defaults">
      <SupportingPane.Root paneLabel={paneLabel}>
        <SupportingPane.Main>
          <p style={{ margin: 0 }}>{body}</p>
        </SupportingPane.Main>
        <SupportingPane.Pane>
          <dl style={{ margin: 0, display: 'grid', gap: 8 }}>
            {rows.map(([term, detail]) => (
              <div key={term}>
                <dt style={{ fontSize: '0.78rem', opacity: 0.65 }}>{term}</dt>
                <dd style={{ margin: 0, fontSize: '0.92rem' }}>{detail}</dd>
              </div>
            ))}
          </dl>
        </SupportingPane.Pane>
      </SupportingPane.Root>
    </div>
  )
}
