import Link from 'next/link'
import { ProteanCheckoutDialog } from '../delete-demo/protean-dialog'

export default function SsrProofPage() {
  return (
    <main className="page">
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>SSR proof</h1>
      <p className="lede">
        The Protean invariant: a decision the server could get wrong must either be
        expressible in CSS or be deferred to interaction time. Overlays are deferred.
      </p>
      <ol>
        <li>
          This page is server-rendered by Next.js App Router. The dialog below is closed, so
          the served HTML contains no overlay markup at all - nothing to flash, nothing to
          mismatch, nothing to shift.
        </li>
        <li>
          The presentation (modal vs sheet vs fullscreen) is decided the moment you press the
          trigger, from live traits - never from a server guess.
        </li>
        <li>
          Verify it yourself: <code>curl -s localhost:3000/ssr-proof | grep -c data-part=&quot;popup&quot;</code>{' '}
          returns 0.
        </li>
      </ol>
      <ProteanCheckoutDialog />
    </main>
  )
}
