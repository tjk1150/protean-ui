import Link from 'next/link'

export default function AccessibilityPage() {
  return (
    <div className="doc">
      <h1>Accessibility</h1>
      <p className="lede">
        Adaptation must never change what a component is - only how it looks. Protean
        treats that as a contract, not a guideline.
      </p>

      <h2>The isomorphism contract</h2>
      <p>
        Whatever presentation is chosen, the accessible tree keeps the same shape. A
        sheet and a modal are both <code>role=&quot;dialog&quot;</code> with the same
        accessible name; navigation is always <code>nav &gt; ul</code> with{' '}
        <code>aria-current=&quot;page&quot;</code>, whether it looks like a bottom bar or
        a sidebar. A screen-reader user should not be able to tell that adaptation
        happened.
      </p>

      <h2>Delegated behavior</h2>
      <p>
        Focus traps, focus restore, dismissal, listbox semantics, and typeahead come from
        the Base UI backend. Protean deliberately refuses to reimplement them - the rule
        exists because the ecosystem&apos;s graveyard is full of hand-rolled focus traps.
      </p>

      <h2>What Protean adds on top</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Prop</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>alert</td>
              <td>Renders the popup as <code>role=&quot;alertdialog&quot;</code> for destructive confirmations.</td>
            </tr>
            <tr>
              <td>describedBy</td>
              <td>Wires <code>aria-describedby</code> to one or more ids in your content.</td>
            </tr>
            <tr>
              <td>initialFocus</td>
              <td>Focuses a specific element on open - synchronously, so the cancel-first pattern for destructive dialogs is deterministic.</td>
            </tr>
            <tr>
              <td>finalFocus</td>
              <td>Controls focus on close; pass a callback returning false to let the app direct focus after a completed action instead of restoring the trigger.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Measured</h2>
      <ul>
        <li>axe: zero violations across the navigation presentations and the fullscreen dialog state.</li>
        <li>
          On an open modal, one fewer flagged node than the manual recipe built on the
          same primitives - the remaining flags are the invisible helper elements that
          keep focus from escaping, which the scanner marks in both implementations; a
          known screening artifact.
        </li>
        <li>
          In the real-app migration, 699 existing tests - including keyboard-trap and
          focus-restore assertions - stayed green after the swap.
        </li>
      </ul>
      <p>
        Scan figures shift between releases; the current numbers live on{' '}
        <Link href="/en/about/status">Quality and support status</Link>.
      </p>

      <h2>Capability is not modality</h2>
      <p>
        The input method may change the pattern and the density - never what the user
        can do. Keyboard operation works in every presentation, because tablets have
        keyboards and phones have switch access. The reduced-motion preference is
        honored directly by the reference stylesheet&apos;s CSS media queries, so
        presentation motion quiets down all at once.
      </p>
    </div>
  )
}
