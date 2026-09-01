'use client'

import { appFirst, definePolicy, Dialog, ProteanBoundary, ProteanProvider } from '@protean-ui/react'

/* One policy for the whole page: compact opens as a sheet, everything else
   delegates to the app-first defaults. The two dialogs below differ only in
   where they are declared. */
const policy = definePolicy({
  name: 'boundary-demo',
  extends: appFirst,
  overlay: ({ traits, defaults }) => (traits.size === 'compact' ? 'sheet' : defaults())
})

function DemoDialog({ label }: { readonly label: string }) {
  return (
    <Dialog.Root role="form">
      <Dialog.Trigger>{label}</Dialog.Trigger>
      <Dialog.Content title="Edit shipping address">
        <p className="hint">
          The decision was made the moment this opened, measured against the nearest
          boundary - or the viewport when there is none.
        </p>
        <Dialog.Close className="button">Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export function BoundaryDemo() {
  return (
    <ProteanProvider policy={policy}>
      <div className="boundaryCompare">
        <section className="boundaryCell">
          <h2>Declared at the page level</h2>
          <p className="loc">Decides against the viewport: on this desktop window, a modal.</p>
          <DemoDialog label="Open (viewport-scoped)" />
        </section>

        <ProteanBoundary className="boundaryCell boundaryPanel">
          <h2>Declared inside a 420px panel</h2>
          <p className="loc">
            Same component, same policy - but this panel is a ProteanBoundary, so the
            size class is measured from the panel. 420px is compact, so it opens as a
            sheet even on a wide desktop.
          </p>
          <DemoDialog label="Open (container-scoped)" />
        </ProteanBoundary>
      </div>
    </ProteanProvider>
  )
}
