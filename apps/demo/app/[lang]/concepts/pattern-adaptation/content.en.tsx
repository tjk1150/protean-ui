import Link from 'next/link'

export default function PatternAdaptationPage() {
  return (
    <div className="doc">
      <h1>Pattern adaptation</h1>
      <p className="lede">
        The same &quot;confirmation&quot; wants a small modal on desktop and a bottom
        sheet on a phone. Making that choice Protean&apos;s job instead of a branch in
        your code - that is pattern adaptation. This page explains exactly how, and
        when, the choice happens.
      </p>

      <h2>Same meaning, different pattern</h2>
      <p>
        UI has meaning: &quot;a dialog confirming something irreversible&quot;, &quot;a
        form collecting an address&quot;, &quot;a menu attached to an item&quot;. The
        meaning survives every environment - <strong>which UX pattern shows it</strong>{' '}
        does not.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Declared meaning</th><th>Desktop + mouse</th><th>Phone + touch</th></tr></thead>
          <tbody>
            <tr><td><code>role=&quot;confirmation&quot;</code></td><td>centered modal</td><td>bottom sheet</td></tr>
            <tr><td><code>role=&quot;form&quot;</code></td><td>centered modal</td><td>fullscreen</td></tr>
            <tr><td><code>role=&quot;contextual&quot;</code></td><td>anchored popover</td><td>bottom sheet</td></tr>
            <tr><td>navigation</td><td>sidebar</td><td>bottom tab bar</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Why CSS cannot do this swap is the crux: a popover and a fullscreen dialog do
        not differ in font size - they are <strong>different objects, with different
        DOM structure, focus rules, dismissal, and accessibility wiring</strong>. That
        is why every app has hand-written <code>isMobile ? &lt;A/&gt; : &lt;B/&gt;</code>,
        and it is exactly the branch Protean replaces.
      </p>

      <h2>What one button press sets off</h2>
      <pre><code>{`<Dialog.Root role="confirmation">   // all the app knows: "this is a confirmation"

the user presses the trigger
  → read the environment    size class + input method
  → apply the rules         per-instance override? none → project rules? defer
                            → default: "small screen + touch means sheet, else modal"
  → a presentation is set   modal
  → open as a modal         focus, ESC, accessibility wired along
  → data-presentation="modal"   CSS paints the look`}</code></pre>
      <p>
        Run the same code on a phone: the environment reads differently, the rules
        pick a sheet, and a bottom sheet opens. The app code still contains zero
        branches.
      </p>

      <h2>Decisions have a moment</h2>
      <p>The server does not know the user&apos;s screen. Hence one rule:</p>
      <div className="callout">
        A decision the server could get wrong must be expressible in CSS, or deferred
        to interaction time.
      </div>
      <ul>
        <li>
          <strong>Dialogs, selects, and menus decide when they open.</strong> While
          closed there is no decision at all - the served HTML carries zero overlay
          markup, so the server has no chance to be wrong. While open, the decision is
          pinned so the UI is not swapped out from under the user mid-use; it decides
          again next time.
        </li>
        <li>
          <strong>Navigation and the screen skeleton cannot defer</strong> - they are
          always visible. So all four presentations are one identical HTML tree, and
          CSS draws the first picture. Whatever the server sends, the markup is the
          same: the first layout cannot be wrong and nothing shifts.
        </li>
      </ul>
      <p>
        The consequences live in{' '}
        <Link href="/en/advanced/server-rendering">Server rendering</Link>.
      </p>

      <h2>How is this different from breakpoints?</h2>
      <ol>
        <li>
          <strong>A different unit changes.</strong> A media query changes CSS
          properties of the same pattern. Protean changes the pattern itself.
        </li>
        <li>
          <strong>Decisions have a moment.</strong> A media query is an always-on
          declaration with no concept of &quot;when&quot; - which is why the{' '}
          <code>isMobile ? &lt;Sheet/&gt; : &lt;Dialog/&gt;</code> recipe flashes
          under server rendering.
        </li>
        <li>
          <strong>Decisions are values.</strong> The inputs (size class and input
          method - together called <strong>traits</strong>) and the result exist as a
          value: traced to whoever decided, explained in one console line in dev,
          testable without rendering, stamped on the DOM as{' '}
          <code>data-presentation</code>. You cannot ask a media query why the UI
          looks the way it does.
        </li>
        <li>
          <strong>Call sites speak meaning only.</strong>{' '}
          <code>role=&quot;confirmation&quot;</code> lives at the call site; what it
          becomes lives in one place. When a new input joins the judgment later, call
          sites do not change. With breakpoints, every new axis multiplies conditions
          across every call site.
        </li>
      </ol>

      <h2>Values follow the presentation</h2>
      <p>
        A narrower screen never &quot;corrects&quot; a radius from 24 to 16. Instead,
        when the UI&apos;s role changes, the value policy changes with it: a fullscreen
        dialog is no longer a floating card, so it loses its corners; a bottom sheet
        touches the bottom, so only its top corners round. The reference stylesheet
        contains not a single media query on radius - every such value hangs off the
        chosen presentation, so shape needs no separate decision. Values that differ{' '}
        <strong>within the same presentation</strong> - row heights, tap targets - do
        deserve one, and that is <Link href="/en/concepts/density">density</Link>.
      </p>

      <h2>What the default rules see - and do not</h2>
      <p>Stated honestly, the inputs currently used or collected:</p>
      <ul>
        <li>size class: compact (below 600px) · medium · expanded (840px and up)</li>
        <li>input method: touch · pointer · hybrid</li>
        <li>hover capability - consulted by hints (tooltips)</li>
        <li>reduced-motion preference - collected; the reference stylesheet handles motion via CSS media queries directly</li>
        <li>virtual keyboard - collected, not yet consulted by the defaults</li>
      </ul>
      <p>
        The default <strong>pattern</strong> rules branch on input only at compact -
        a touch tablet and a mouse desktop get the same patterns at medium and up. We
        refuse to ship speculative rules unvalidated on real devices; tablet
        differentiation is on the roadmap. <strong>Density</strong> and{' '}
        <strong>hints</strong>, by contrast, read the input method at every size.
        Container-scoped judgment ships for overlays - see{' '}
        <Link href="/en/advanced/container-boundary">container-scoped adaptation</Link>.
        Because the rules are a first-class API, adding such an axis never touches
        your call sites.
      </p>

      <p>
        Next: <Link href="/en/concepts/density">Density</Link> for the second
        decision, and{' '}
        <Link href="/en/guides/customize-decisions">Customize the decisions</Link> to
        make the rules your own.
      </p>
    </div>
  )
}
