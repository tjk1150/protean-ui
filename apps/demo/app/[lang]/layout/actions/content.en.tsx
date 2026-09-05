import Link from 'next/link'
import { ActionsDemo } from './actions-demo'

export default function ActionsPage() {
  return (
    <div className="doc">
      <h1>Actions</h1>
      <p className="lede">
        Use <code>Actions</code> for a group of related actions when some of
        them can step aside on compact layouts. The action markup stays the
        same; CSS decides whether secondary actions remain inline or collapse
        behind <code>More</code>.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Narrow the window below 600px</span>
        <ActionsDemo
          labels={{ save: 'Save', share: 'Share', rename: 'Rename', remove: 'Delete' }}
          moreLabel="More"
          onPick="Picked"
        />
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { Actions } from "@protean-ui/react";

<Actions.Root aria-label="Document actions">
  <Actions.Item onClick={save}>Save</Actions.Item>
  <Actions.Item secondary onClick={duplicate}>Duplicate</Actions.Item>
  <Actions.Item secondary destructive onClick={remove}>Delete</Actions.Item>
</Actions.Root>`}</code></pre>

      <h2>Actions does not choose a presentation</h2>
      <p>
        Actions is not an adaptive policy component - it has no{' '}
        <code>presentation</code> prop and no policy resolver.
      </p>
      <pre><code>{`author → marks an action as secondary
React  → renders the same toolbar structure
CSS    → decides how that structure is displayed`}</code></pre>
      <p>
        This keeps the responsive behavior in CSS, where it is a layout
        concern.
      </p>

      <h2>Mark actions that may step aside</h2>
      <p>
        <code>secondary</code> means &quot;safe to collapse when space is
        tight,&quot; not &quot;always hidden.&quot; On wider layouts, primary
        and secondary actions remain inline together. Actions does not inspect
        the environment to decide which items are secondary - it is authored
        application intent, which is why the server and client always render
        the same markup.
      </p>

      <h2>Compact layouts collapse secondary actions</h2>
      <p>
        With the current reference styles, layouts below the compact width hide
        secondary actions and show the More toggle:
      </p>
      <pre><code>{`wide     → [ Save ] [ Duplicate ] [ Delete ]
compact  → [ Save ] [ More ]

More opened:
[ Save ] [ More ]
[ Duplicate ]
[ Delete ]`}</code></pre>
      <p>
        The expanded secondary actions appear{' '}
        <strong>in the same toolbar area</strong> - not in a bottom sheet, a
        panel, or a separate popover. And the compact behavior does not branch
        on pointer type: the current rule is simply{' '}
        <em>compact width → secondary actions collapse behind More</em>.
      </p>

      <h2>The More toggle only exists when needed</h2>
      <p>
        <code>Actions.Root</code> checks whether any child is marked{' '}
        <code>secondary</code>. With no secondary actions, there is no overflow
        toggle at all. This comes from the authored children, not from layout
        measurement. The default label is <code>More</code> - change it with{' '}
        <code>moreLabel=&quot;More actions&quot;</code>. The toggle reports its
        state with <code>aria-expanded</code>.
      </p>

      <h2>Selecting a secondary action closes the expanded set</h2>
      <pre><code>{`item onClick
→ if !event.defaultPrevented and the item is secondary
→ close the More expansion`}</code></pre>
      <p>
        The item&apos;s own <code>onClick</code> runs first; an authored handler
        can prevent the automatic close by calling{' '}
        <code>event.preventDefault()</code>. In normal use you do not need to
        think about this.
      </p>

      <h2>Destructive actions and icons</h2>
      <pre><code>{`<Actions.Item secondary destructive onClick={removeProject}>
  Delete project
</Actions.Item>

<Actions.Item icon={<ArchiveIcon />} onClick={archive}>
  Archive
</Actions.Item>`}</code></pre>
      <p>
        <code>destructive</code> stamps{' '}
        <code>data-variant=&quot;danger&quot;</code> for styling - it does not
        add a confirmation Dialog; the application owns the destructive
        workflow. The icon wrapper is <code>aria-hidden</code>, so the text
        label remains the action&apos;s accessible meaning.
      </p>

      <h2>Actions is a toolbar - with normal buttons</h2>
      <p>
        <code>Actions.Root</code> renders{' '}
        <code>role=&quot;toolbar&quot;</code> to identify the actions as a
        related group. It does <strong>not</strong> implement a full
        roving-focus toolbar keyboard model - native buttons keep their normal
        keyboard behavior. The broader responsibility boundary is covered in{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>
      <p>
        <code>Actions.Item</code> renders a native button whose type is{' '}
        <strong>fixed to <code>type=&quot;button&quot;</code></strong> - an
        authored <code>type=&quot;submit&quot;</code> is overwritten. Actions
        is not a form-submit primitive; use{' '}
        <Link href="/en/components/primary-action">PrimaryAction</Link> for a
        primary form action, where the submit contract is verified.
      </p>

      <h2>Reference styles are opt-in</h2>
      <p>
        The reference Actions layout is scoped under{' '}
        <code>protean-defaults</code>, like the other layout helpers. And
        because the reference stylesheet uses viewport-width media queries, an
        Actions toolbar inside a resizable card or panel may care more about
        its container&apos;s width - keep the markup and use your own container
        queries:
      </p>
      <pre><code>{`@container (width < 420px) {
  /* collapse or rearrange actions for this container */
}`}</code></pre>
      <p>
        Do not add a presentation decision just to solve a container-layout
        problem.
      </p>

      <h2>Actions.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>moreLabel</code></td><td>Label for the overflow toggle. Defaults to <code>More</code>.</td></tr>
            <tr><td><code>children</code></td><td>Action items.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Standard <code>div</code> attributes pass through - add{' '}
        <code>aria-label</code> when a screen has more than one toolbar.
      </p>

      <h2>Actions.Item</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>secondary</code></td><td>Marks an action as safe to collapse on compact layouts.</td></tr>
            <tr><td><code>destructive</code></td><td>Marks a destructive action; stamped as <code>data-variant=&quot;danger&quot;</code>.</td></tr>
            <tr><td><code>icon</code></td><td>Optional visual icon, hidden from assistive technology.</td></tr>
            <tr><td><code>children</code></td><td>Action label.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Standard button props pass through, except <code>type</code>, which the
        component fixes to <code>button</code>. The full DOM hook contract
        (including <code>data-secondary</code> and{' '}
        <code>data-overflow-open</code>) lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>
    </div>
  )
}
