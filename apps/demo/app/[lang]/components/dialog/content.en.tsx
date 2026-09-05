import Link from 'next/link'
import { ProteanCheckoutDialog } from '../../../delete-demo/protean-dialog'

export default function DialogDocPage() {
  return (
    <div className="doc">
      <h1>Dialog</h1>
      <p className="lede">
        Use <code>Dialog</code> for interactions that temporarily move the user
        into a focused task. The same Dialog can use a modal, sheet, fullscreen
        surface, or popover depending on its role and the current environment.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Change the window size and input environment, then open it again</span>
        <ProteanCheckoutDialog />
      </div>
      <p>The same code opens differently depending on the environment and <code>role</code>.</p>

      <h2>Basic usage</h2>
      <p>Tell Protean what the Dialog is for with <code>role</code>.</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>Edit profile</Dialog.Trigger>
  <Dialog.Content title="Edit profile">
    <ProfileForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        The application describes the task. Protean chooses how that task should
        be presented.
      </p>

      <h2>Default presentations</h2>
      <p>The default policy uses the Dialog role together with the current environment.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Role</th><th>compact + touch</th><th>otherwise</th></tr>
          </thead>
          <tbody>
            <tr><td><code>confirmation</code></td><td>Sheet</td><td>Modal</td></tr>
            <tr><td><code>form</code></td><td>Fullscreen</td><td>Modal</td></tr>
            <tr><td><code>contextual</code></td><td>Sheet</td><td>Popover</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The role describes the interaction, not the visual shape. A{' '}
        <code>confirmation</code> uses a sheet in a small touch environment and
        a modal otherwise; a <code>form</code> uses fullscreen instead.
      </p>

      <h2>The presentation stays stable while the Dialog is open</h2>
      <p>
        Dialog uses <code>continuity=&quot;pinned&quot;</code> by default.
        Protean chooses the presentation when the Dialog opens and keeps that
        result for the rest of that open session.
      </p>
      <pre><code>{`open as modal
→ environment changes
→ stay modal

close, environment changes, open again
→ decide again`}</code></pre>
      <p>
        This avoids changing the interaction model underneath the user halfway
        through a task. For most Dialogs, this is the behavior you want.
      </p>

      <h3>Use live only when the Dialog should adapt while open</h3>
      <pre><code>{`<Dialog.Root role="form" continuity="live">
  ...
</Dialog.Root>`}</code></pre>
      <p>
        With <code>live</code>, Protean can switch the presentation without
        replacing the Dialog content tree. The current continuity contract
        preserves the content DOM, React state, form input, and focus inside
        the overlay during the transition - this is different from
        conditionally rendering two separate Dialog implementations. Use{' '}
        <code>live</code> deliberately; if a mid-task presentation change is
        unnecessary, keep the default. See the{' '}
        <a href="/continuity-demo">transition continuity demo</a>.
      </p>

      <h2>Override the presentation for one Dialog</h2>
      <pre><code>{`<Dialog.Root role="form" presentation="sheet">
  ...
</Dialog.Root>`}</code></pre>
      <p>
        An instance override takes precedence over the default policy for that
        Dialog. Use it when the exception belongs to one interaction. If the
        same rule should apply across the application, change the project
        policy instead - see{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>
      <p>
        <code>role</code> and <code>presentation</code> answer different
        questions: <strong><code>role</code> describes the task,{' '}
        <code>presentation</code> controls how it is shown.</strong>{' '}
        <code>role=&quot;confirmation&quot; presentation=&quot;sheet&quot;</code>{' '}
        still describes a confirmation interaction. Do not use presentation
        names as a substitute for the semantic role.
      </p>

      <h2>Alert dialogs</h2>
      <pre><code>{`<Dialog.Root role="confirmation">
  <Dialog.Trigger>Delete project</Dialog.Trigger>
  <Dialog.Content title="Delete project?" alert>
    This action cannot be undone.
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        <code>alert</code> uses <code>alertdialog</code> semantics. This is a
        separate contract from the adaptive <code>role</code> -{' '}
        <code>role=&quot;confirmation&quot;</code> does not imply{' '}
        <code>alertdialog</code> by itself. Use <code>alert</code> for
        interactions that genuinely require the stronger semantics, not because
        the content looks visually important.
      </p>

      <h2>Control the open state when the application owns it</h2>
      <pre><code>{`<Dialog.Root role="form" open={open} onOpenChange={setOpen}>
  ...
</Dialog.Root>`}</code></pre>
      <p>
        Dialog supports both uncontrolled (<code>defaultOpen</code>) and
        controlled (<code>open</code> + <code>onOpenChange</code>) state. Use
        the controlled form when application state needs to own whether the
        Dialog is open; for normal trigger-driven Dialogs, uncontrolled state is
        usually simpler. Initial-open server-rendering details are covered in{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link>.
      </p>

      <h2>Control focus when needed</h2>
      <pre><code>{`<Dialog.Content
  title="Edit profile"
  initialFocus={firstFieldRef}
  finalFocus={triggerRef}
>
  ...
</Dialog.Content>`}</code></pre>
      <p>
        The underlying Dialog interaction manages the normal focus lifecycle.
        Use <code>initialFocus</code> to choose the initial focus target and{' '}
        <code>finalFocus</code> to choose where focus returns after the Dialog
        closes. Most Dialogs should not need to override these. For an
        accessible description, connect it with <code>describedBy</code>.
      </p>

      <h2>Dialog.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>role</code></td><td>&quot;confirmation&quot; | &quot;form&quot; | &quot;contextual&quot;</td><td>&quot;confirmation&quot;</td><td>Describes the task so the default policy can choose a presentation.</td></tr>
            <tr><td><code>presentation</code></td><td>presentation | &#123; sizeClass: presentation &#125;</td><td>-</td><td>Overrides the presentation for this instance (modal · sheet · fullscreen · popover), per size class if needed.</td></tr>
            <tr><td><code>continuity</code></td><td>&quot;pinned&quot; | &quot;live&quot;</td><td>&quot;pinned&quot;</td><td>Whether the presentation stays fixed while open or can adapt live.</td></tr>
            <tr><td><code>open</code> / <code>defaultOpen</code> / <code>onOpenChange</code></td><td></td><td></td><td>Controlled or uncontrolled open state.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Dialog.Content</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>title</code></td><td>Accessible Dialog title, rendered and wired as its accessible name.</td></tr>
            <tr><td><code>className</code></td><td>Adds a class to the actual popup element.</td></tr>
            <tr><td><code>alert</code></td><td>Uses alert-dialog semantics.</td></tr>
            <tr><td><code>describedBy</code></td><td>Connects the Dialog to an accessible description (space-separated ids).</td></tr>
            <tr><td><code>initialFocus</code></td><td>Controls the initial focus target.</td></tr>
            <tr><td><code>finalFocus</code></td><td>Controls the focus return target; a function returning false lets the app direct focus itself.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Dialog.Trigger and Dialog.Close</h2>
      <pre><code>{`<Dialog.Trigger>Edit profile</Dialog.Trigger>
<Dialog.Close>Cancel</Dialog.Close>`}</code></pre>
      <p>
        Both are real buttons and accept the usual button props. The trigger
        composes onto another element via <code>render</code> - trigger
        composition recipes live in{' '}
        <Link href="/en/guides/composition">Composition</Link>.
      </p>
    </div>
  )
}
