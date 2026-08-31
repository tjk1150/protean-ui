import Link from 'next/link'
import { ManualResponsiveDialog } from './manual-dialog'
import { ProteanCheckoutDialog } from './protean-dialog'

export default function DeleteDemoPage() {
  return (
    <main className="page">
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>The deletion demo</h1>
      <p className="lede">
        Both buttons open the same form with the same primitives underneath (Base UI Dialog
        and Drawer). The difference is who owns the decision.
      </p>
      <div className="compare">
        <section className="pane">
          <h2>Manual recipe</h2>
          <p className="loc">55 lines per call site</p>
          <ManualResponsiveDialog />
          <ul className="flaws">
            <li>Duplicated component trees, kept in sync by hand</li>
            <li>Width only: a narrow desktop window gets the touch sheet</li>
            <li>Server guesses desktop=false, then re-renders after hydration</li>
          </ul>
        </section>
        <section className="pane">
          <h2>Protean</h2>
          <p className="loc">15 lines per call site</p>
          <ProteanCheckoutDialog />
          <ul className="flaws">
            <li>One semantic declaration: role=form</li>
            <li>Traits, not breakpoints: size x input decide the pattern</li>
            <li>Decision happens at open time, so SSR never renders it wrong</li>
          </ul>
        </section>
      </div>
      <p className="hint">
        Resize across 600px and reopen the dialogs. On a fine-pointer machine Protean keeps a
        modal even in a narrow window; the manual recipe flips to a bottom sheet because width
        is all it knows. Open the console to see each decision explained.
      </p>
    </main>
  )
}
