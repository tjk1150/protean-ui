'use client'

import { ListDetail } from '@protean-ui/react'
import * as React from 'react'

const messages = [
  { id: 'm1', from: 'Vercel', subject: 'Deployment ready', body: 'protean-ui was deployed to production. Every route returned 200.' },
  { id: 'm2', from: 'npm', subject: 'Package published', body: 'protean-ui@0.1.0-alpha.2 is now live on the registry.' },
  { id: 'm3', from: 'GitHub', subject: 'CI passed', body: 'The quality gate ran on your push and every criterion passed.' },
  { id: 'm4', from: 'axe', subject: 'No violations', body: 'The accessibility suite found no critical or serious issues.' }
]

export function InboxDemo() {
  const [selected, setSelected] = React.useState<string | null>(null)
  const current = messages.find((m) => m.id === selected)

  return (
    <div className="protean-defaults inboxDemo">
      <ListDetail.Root
        aria-label="Inbox"
        detailActive={selected !== null}
        onBack={() => setSelected(null)}
      >
        <ListDetail.List aria-label="Messages">
          {messages.map((message) => (
            <button
              key={message.id}
              className="inboxItem"
              aria-current={selected === message.id || undefined}
              onClick={() => setSelected(message.id)}
            >
              <strong>{message.from}</strong>
              <span>{message.subject}</span>
            </button>
          ))}
        </ListDetail.List>
        <ListDetail.Detail aria-label="Message">
          <ListDetail.Back>Back</ListDetail.Back>
          {current ? (
            <article>
              <h2>{current.subject}</h2>
              <p className="loc">from {current.from}</p>
              <p>{current.body}</p>
            </article>
          ) : (
            <p className="hint">Pick a message on the left.</p>
          )}
        </ListDetail.Detail>
      </ListDetail.Root>
    </div>
  )
}
