'use client'

import { Dialog, ProteanProvider } from '@protean-ui/react'

export function ContinuityDemo() {
  return (
    <ProteanProvider>
      <div className="compare">
        <section className="pane">
          <h2>continuity=&quot;live&quot;</h2>
          <p className="loc">
            Re-decides while open. Resize across 600px and the modal becomes a sheet in
            place - same DOM, text preserved, focus kept.
          </p>
          <Dialog.Root role="confirmation" continuity="live">
            <Dialog.Trigger>Open live dialog</Dialog.Trigger>
            <Dialog.Content title="Leave a note">
              <p className="hint">Type something, then resize the window across 600px.</p>
              <textarea
                aria-label="Note"
                rows={3}
                placeholder="This text survives the swap"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
              <Dialog.Close className="button">Close</Dialog.Close>
            </Dialog.Content>
          </Dialog.Root>
        </section>

        <section className="pane">
          <h2>default (pinned)</h2>
          <p className="loc">
            Keeps its presentation for the whole open lifecycle; the environment applies
            at the next open. Nothing changes out from under the user.
          </p>
          <Dialog.Root role="confirmation">
            <Dialog.Trigger>Open pinned dialog</Dialog.Trigger>
            <Dialog.Content title="Leave a note">
              <p className="hint">Resize while open: this one deliberately stays put.</p>
              <textarea
                aria-label="Note"
                rows={3}
                placeholder="Pinned until reopened"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
              <Dialog.Close className="button">Close</Dialog.Close>
            </Dialog.Content>
          </Dialog.Root>
        </section>
      </div>
    </ProteanProvider>
  )
}
