import Link from 'next/link'

export default function BoundaryPage() {
  return (
    <div className="doc">
      <h1>Boundary</h1>
      <p className="lede">
        A container boundary. Overlays declared inside decide from{' '}
        <strong>the panel&apos;s width</strong> instead of the viewport, and the sheet
        rises from the panel&apos;s own bottom edge - a narrow side panel on a wide
        monitor behaves like a small screen.
      </p>

      <pre><code>{`import { ProteanBoundary } from "@protean-ui/react";

<ProteanBoundary className="sidePanel">
  {/* Dialogs and Selects in here decide from sidePanel's width */}
  <Dialog.Root role="form">...</Dialog.Root>
</ProteanBoundary>`}</code></pre>

      <div className="callout">
        See it live in the <Link href="/boundary-demo">container boundary demo</Link>:
        the same dialog opens as a modal at the page level and as a sheet inside a
        420px panel - same window, same policy, different declaration site.
      </div>

      <h2>What changes</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Concern</th><th>Inside a boundary</th></tr></thead>
          <tbody>
            <tr><td>Size decision</td><td>measured from the panel at the moment of opening; same thresholds as the viewport (600 / 840)</td></tr>
            <tr><td>Modal, fullscreen, sheet</td><td>portal into the panel: the sheet rises from the panel&apos;s bottom edge, the scrim covers the panel only, fullscreen fills the panel</td></tr>
            <tr><td>Popover</td><td>deliberately stays at the document level - it positions against its trigger and would risk clipping</td></tr>
            <tr><td>Navigation and Screen</td><td>unaffected; container-scoped chrome belongs to CSS container queries</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why SSR stays safe</h2>
      <p>
        Overlays decide at open time, so the container is measured synchronously at that
        moment - the server never needs to know the panel&apos;s size and there is
        nothing to hydrate wrong. An unmeasurable boundary (zero width, not yet painted)
        falls back to viewport traits quietly.
      </p>

      <h2>Props and contract</h2>
      <p>
        Accepts every div prop (className, style, ...). The root is stamped{' '}
        <code>data-scope=&quot;boundary&quot;</code> and the reference stylesheet makes it{' '}
        <code>position: relative</code> so contained overlays anchor to it. Overlay
        parts that portal into a boundary carry <code>data-contained</code>, so your CSS
        can target the contained variants.
      </p>

      <h2>Where it earns its keep</h2>
      <ul>
        <li>The detail pane of a master-detail screen - its edit dialogs open at pane scale.</li>
        <li>Dashboard widgets and side inspectors - a select inside behaves relative to the widget, not the monitor.</li>
        <li>Embedded surfaces - your UI adapts to wherever the host page puts it.</li>
      </ul>
    </div>
  )
}
