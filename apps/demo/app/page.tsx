import Link from 'next/link'
import { TraitsChip } from './traits-chip'

export default function HomePage() {
  return (
    <main className="page">
      <h1>Protean UI</h1>
      <p className="lede">
        Declare what your UI means. The runtime picks the UX pattern for the current
        environment - viewport size class and input modality, not just width.
      </p>
      <p>
        Your environment right now: <TraitsChip />
      </p>
      <p className="hint">
        Resize this window across 600px / 840px, or open it on a touch device, and the chip
        updates. Every demo on this site reads the same traits.
      </p>
      <nav className="cards" aria-label="Demos">
        <Link className="card" href="/delete-demo">
          <h2>The deletion demo</h2>
          <p>
            The manual responsive-dialog recipe vs one semantic declaration. Same primitives,
            same behavior - a fraction of the code.
          </p>
        </Link>
        <Link className="card" href="/ssr-proof">
          <h2>SSR proof</h2>
          <p>
            Why overlay decisions made at interaction time cannot flash, mismatch, or shift
            layout during hydration.
          </p>
        </Link>
      </nav>
    </main>
  )
}
