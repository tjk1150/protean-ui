import Link from 'next/link'
import { ProteanCheckoutDialog } from '../../../delete-demo/protean-dialog'

export default function DialogDocPage() {
  return (
    <div className="doc">
      <h1>Dialog</h1>
      <p className="lede">
        One semantic declaration; the runtime chooses popover, sheet, modal, or
        fullscreen from the current traits, the moment it opens.
      </p>

      <div className="example">
        <span className="exampleLabel">Live - resize the window, reopen</span>
        <ProteanCheckoutDialog />
      </div>

      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>

      <h2>Roles and their presentations</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>role</th><th>compact + touch</th><th>otherwise</th></tr>
          </thead>
          <tbody>
            <tr><td>confirmation</td><td>sheet</td><td>modal</td></tr>
            <tr><td>form</td><td>fullscreen</td><td>modal</td></tr>
            <tr><td>contextual</td><td>sheet</td><td>popover (anchored to the trigger)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The decision is frozen while open - resizing mid-interaction never swaps the
        presentation under the user; the next open re-decides. When you want the
        opposite trade, opt in with <code>continuity=&quot;live&quot;</code>: the
        overlay re-decides while open and swaps in place, preserving the content DOM,
        typed state, and focus - see the{' '}
        <a href="/continuity-demo">transition continuity demo</a>.
      </p>

      <h2>Dialog.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>role</td><td>&quot;confirmation&quot; | &quot;form&quot; | &quot;contextual&quot;</td><td>default &quot;confirmation&quot;</td></tr>
            <tr><td>presentation</td><td>presentation | &#123; sizeClass: presentation &#125;</td><td>instance override, trait language only</td></tr>
            <tr><td>continuity</td><td>&quot;pinned&quot; | &quot;live&quot;</td><td>pinned (default) freezes the decision while open; live re-decides mid-open and swaps in place, preserving state</td></tr>
            <tr><td>open / defaultOpen / onOpenChange</td><td>controlled or uncontrolled</td><td>parent-mounted dialogs use defaultOpen + onOpenChange; a controlled parent can veto a close by ignoring it</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Dialog.Content</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>title</td><td>string</td><td>rendered as the dialog title and wired as its accessible name</td></tr>
            <tr><td>className</td><td>string</td><td>lands on the popup, so class-based stylesheets keep working</td></tr>
            <tr><td>alert</td><td>boolean</td><td>role=&quot;alertdialog&quot; for destructive confirmations</td></tr>
            <tr><td>describedBy</td><td>string</td><td>space-separated ids for aria-describedby</td></tr>
            <tr><td>initialFocus</td><td>RefObject</td><td>synchronous focus target on open (cancel-first patterns)</td></tr>
            <tr><td>finalFocus</td><td>false | RefObject | (closeType) =&gt; ...</td><td>close-focus control; return false when the app directs focus after completion</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>Dialog.Trigger</code> and <code>Dialog.Close</code> are plain buttons with
        the wiring done; both accept every button prop, and the trigger composes onto
        another element (a styled button, a <code>Tooltip.Trigger</code>) via{' '}
        <code>render</code> - see{' '}
        <Link href="/en/concepts/composition">Using them together</Link>. All parts stamp{' '}
        <code>data-scope</code>, <code>data-part</code>, and{' '}
        <code>data-presentation</code> for styling.
      </p>

      <p>
        See the manual recipe comparison in{' '}
        <Link href="/delete-demo">the deletion demo</Link>, and the server-rendering
        proof in <Link href="/ssr-proof">SSR proof</Link>.
      </p>
    </div>
  )
}
