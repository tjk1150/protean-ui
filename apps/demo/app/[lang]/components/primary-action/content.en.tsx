import Link from 'next/link'

export default function PrimaryActionDocPage() {
  return (
    <div className="doc">
      <h1>PrimaryAction</h1>
      <p className="lede">
        Use <code>PrimaryAction</code> for the most important action on a
        screen. The same action can appear in an action bar, footer-style
        placement, or inline depending on the environment.
      </p>
      <pre><code>{`import { PrimaryAction } from "@protean-ui/react";

<PrimaryAction.Root onClick={save}>
  Save changes
</PrimaryAction.Root>`}</code></pre>
      <p>
        The button stays the same. Protean changes the selected placement
        pattern. Open the <Link href="/screen-demo">screen demo</Link> on a
        phone-sized window to see it move.
      </p>

      <h2>Default presentation</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Presentation</th></tr>
          </thead>
          <tbody>
            <tr><td>compact + touch</td><td><code>action-bar</code></td></tr>
            <tr><td>compact + pointer / hybrid</td><td><code>sticky-footer</code></td></tr>
            <tr><td>medium</td><td><code>inline</code></td></tr>
            <tr><td>expanded</td><td><code>inline</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The compact result depends on input - a hybrid environment follows the
        pointer path. Do not simplify this to &quot;compact → action-bar.&quot;
      </p>
      <ul>
        <li>
          <strong><code>action-bar</code></strong> - in a compact touch
          environment, the reference styles make the primary action easy to
          reach: a full-width button with a touch-sized minimum height.
        </li>
        <li>
          <strong><code>sticky-footer</code></strong> - in a compact pointer
          environment, the reference layout places the action in a footer-style
          compact position. This is the <strong>name of the presentation</strong>,
          not a promise about a CSS property - the current reference stylesheet
          does not implement it with <code>position: sticky</code>.
        </li>
        <li>
          <strong><code>inline</code></strong> - on medium and expanded
          layouts, the action participates in the normal page layout, staying
          near the surrounding content.
        </li>
      </ul>

      <h2>The action itself stays a button</h2>
      <p>
        <code>PrimaryAction.Root</code> accepts normal button behavior -{' '}
        <code>onClick</code>, <code>disabled</code>, <code>aria-*</code>, and
        the rest. Internally, the structure is a wrapper plus the actual native
        button:
      </p>
      <pre><code>{`<div data-scope="primary-action" data-presentation="inline">
  <button data-part="button">
    Save changes
  </button>
</div>`}</code></pre>
      <p>
        The wrapper carries the adaptive placement structure; the button remains
        the actual action control. The outer Root DOM node is not itself a
        button.
      </p>

      <h2>Use it as a form submit button</h2>
      <pre><code>{`<form onSubmit={handleSubmit}>
  ...
  <PrimaryAction.Root type="submit">
    Continue
  </PrimaryAction.Root>
</form>`}</code></pre>
      <p>
        The default button type is <code>button</code>, so a PrimaryAction
        inside a form does not submit accidentally. The implementation uses the
        equivalent of <code>type ?? &quot;button&quot;</code>, so an explicit{' '}
        <code>type=&quot;submit&quot;</code> (or <code>&quot;reset&quot;</code>)
        is preserved.
      </p>

      <h2>Override the presentation</h2>
      <pre><code>{`<PrimaryAction.Root presentation="inline">
  Save
</PrimaryAction.Root>`}</code></pre>
      <p>
        This changes the selected presentation and the corresponding DOM state.
        The actual placement is still expressed by CSS - the same precision as
        Navigation and ListDetail:
      </p>
      <pre><code>{`PrimaryAction → selected presentation + data-presentation
reference.css → actual placement`}</code></pre>
      <p>
        Under the default configuration these agree; if the project replaces
        the CSS, the final geometry belongs to the project. Project-wide rules
        belong in policy - see{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Reference placement is opt-in</h2>
      <p>
        The page-level PrimaryAction placement rules are scoped under{' '}
        <code>protean-defaults</code> - importing <code>reference.css</code>{' '}
        alone does not impose them on an existing application. This is the same
        opt-in boundary introduced in{' '}
        <Link href="/en/getting-started">Getting started</Link>.{' '}
        <code>PrimaryAction</code> composes naturally with the page structure
        provided by <code>Screen</code>, but it is a composition pattern, not a
        hard parent requirement - see{' '}
        <Link href="/en/guides/composition">Composition</Link>.
      </p>

      <h2>Virtual keyboard adjustment</h2>
      <p>
        The reference compact placement accounts for the browser&apos;s visible
        viewport (<code>visualViewport</code>), so the primary action can stay
        aligned with the usable area when the virtual keyboard changes it. In
        environments without that information, the placement simply works
        without the extra offset. This adjusts placement - it does not change
        the button&apos;s behavior. Try it in the{' '}
        <Link href="/screen-demo">screen demo</Link> by focusing an input on a
        phone.
      </p>

      <h2>PrimaryAction.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>Overrides the selected presentation (<code>action-bar</code> · <code>sticky-footer</code> · <code>inline</code>, per size class if needed).</td></tr>
            <tr><td><code>children</code></td><td>Button content.</td></tr>
            <tr><td><code>type</code></td><td>Standard button type. Defaults to <code>button</code>; explicit <code>submit</code> / <code>reset</code> are preserved.</td></tr>
            <tr><td><code>disabled</code> / <code>onClick</code> / <code>aria-*</code> ...</td><td>All standard button attributes pass through to the inner native button.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        PrimaryAction is not a button design system - there is no{' '}
        <code>variant</code>, <code>size</code>, or <code>loading</code> API.
        Visual styling belongs to your design system, connected through the DOM
        hooks covered in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
        Use PrimaryAction for the one action whose placement should adapt - not
        for every button on the screen.
      </p>
    </div>
  )
}
