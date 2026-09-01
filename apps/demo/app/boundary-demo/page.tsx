import Link from 'next/link'
import { BoundaryDemo } from './boundary-demo'
import './boundary.css'

export default function BoundaryDemoPage() {
  return (
    <div className="page boundaryDemoPage">
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>Container boundary</h1>
      <p className="lede">
        Every adaptive system on the web decides from the viewport. A Protean overlay
        declared inside a <code>ProteanBoundary</code> decides from its container: a
        dialog living in a 420px side panel presents the compact way even on a
        1440px monitor.
      </p>
      <BoundaryDemo />
      <p className="hint">
        How it stays SSR-safe: overlays decide at the moment they open, so the boundary
        is measured synchronously at interaction time - the server never needs to know
        the container&apos;s size, and there is nothing to hydrate wrong. Geometry
        follows too: the sheet portals into the boundary and rises from the
        panel&apos;s own bottom edge, with the scrim covering the panel only. Anchored
        popovers stay at the document level, and chrome components stay
        viewport-driven - style container-scoped chrome with CSS container queries.
      </p>
    </div>
  )
}
