import Link from 'next/link'
import { ContinuityDemo } from './continuity-demo'

export default function ContinuityDemoPage() {
  return (
    <div className="page">
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>Transition continuity</h1>
      <p className="lede">
        By default a Protean overlay pins its decision while open - resizing never rips
        the UI out from under the user, and the environment applies at the next open.
        <code> continuity=&quot;live&quot;</code> opts into the other trade: re-decide
        while open and swap the presentation in place, preserving the content DOM,
        state, and focus across backends.
      </p>
      <ContinuityDemo />
      <p className="hint">
        How it works: in live mode the content mounts once into a persistent host
        element; each presentation renders a slot that adopts that element, so a swap
        moves the subtree instead of recreating it. Typed text, scroll positions, and
        React state survive - and focus is restored to the exact element that held it.
        The SSR story is untouched: closed overlays still render zero markup.
      </p>
    </div>
  )
}
