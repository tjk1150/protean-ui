import Link from 'next/link'

export default function DesignPrinciplesPage() {
  return (
    <div className="doc">
      <h1>Design principles</h1>
      <p className="lede">
        This page answers the fair question: &quot;isn&apos;t this just media queries
        wrapped in components?&quot; It maps Protean&apos;s layers and names what is
        structurally different from breakpoint-driven code.
      </p>

      <h2>Four layers</h2>
      <p>Protean is a one-directional pipeline.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Layer</th><th>Job</th><th>Lives in</th></tr></thead>
          <tbody>
            <tr><td>Perception</td><td>turns raw signals (viewport width, pointer kind, hover capability) into a vocabulary: traits like &#123;size, input&#125;</td><td>@protean-ui/core</td></tr>
            <tr><td>Decision</td><td>maps (role, traits) through a policy to a Decision value - a pure function, no React, no DOM</td><td>@protean-ui/core</td></tr>
            <tr><td>Execution</td><td>renders the decided presentation; focus, dismissal, and ARIA are delegated to Base UI</td><td>@protean-ui/react</td></tr>
            <tr><td>Expression</td><td>stamps data attributes only; color and shape belong to your CSS (or the reference stylesheet)</td><td>your CSS</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        <strong>The decision layer is the heart.</strong> The entire default rule set is a
        25-line pure-function object you can swap wholesale. In breakpoint-driven code
        that opinion is smeared across every call site&apos;s CSS and conditionals -
        impossible to inspect, impossible to replace.
      </div>

      <h2>One click, end to end</h2>
      <pre><code>{`<Dialog.Root role="confirmation">   // all the app knows: "this is a confirmation"

the user clicks the trigger
  → read the environment    { size: "expanded", input: "pointer" }    [perception]
  → consult the policy      instance override? no → project rules? delegate
                            → pack: "compact+touch means sheet, else modal"
  → a Decision comes back   { presentation: "modal", source: "pack" } [decision]
  → open as a modal         focus, ESC, ARIA handled by Base UI       [execution]
  → data-presentation="modal"   your CSS paints it                    [expression]`}</code></pre>
      <p>
        Run the same code on a phone: perception yields{' '}
        <code>&#123; size: &quot;compact&quot;, input: &quot;touch&quot; &#125;</code>,
        the decision is a sheet, execution mounts a bottom sheet. The app code still
        contains zero breakpoints.
      </p>

      <h2>Decisions have a moment</h2>
      <p>The server cannot know the viewport. So Protean holds one invariant:</p>
      <div className="callout">
        A decision the server could get wrong must be expressible in CSS, or deferred to
        interaction time.
      </div>
      <ul>
        <li>
          <strong>Dialogs and selects decide at open time.</strong> While closed there is
          no decision at all - zero overlay bytes in server HTML, so the server has no
          opportunity to be wrong. While open, the decision is pinned: resizing never
          rips the UI out from under the user.
        </li>
        <li>
          <strong>Navigation and the screen skeleton cannot defer</strong> - they are
          always visible. So all four presentations are one HTML tree and CSS decides
          first paint. Identical markup regardless of what the server guessed: no
          mismatch, no layout shift, works without JavaScript.
        </li>
      </ul>
      <p>
        This discipline turns hydration mismatch and first-paint flash from bugs you fix
        into <strong>bugs that cannot exist</strong>. Details in{' '}
        <Link href="/en/concepts/ssr">server rendering</Link>.
      </p>

      <h2>What makes this not-a-breakpoint</h2>
      <ol>
        <li>
          <strong>The unit of change is the interaction contract.</strong> A media query
          restyles one pattern; Protean exchanges the pattern. A popover and a fullscreen
          dialog differ in DOM, focus rules, dismissal, and ARIA - no stylesheet can turn
          one into the other.
        </li>
        <li>
          <strong>Timing is first-class.</strong> Media queries are always-on
          declarations with no concept of &quot;when&quot; - which is exactly why{' '}
          <code>isMobile ? &lt;Sheet/&gt; : &lt;Dialog/&gt;</code> recipes flash on SSR.
        </li>
        <li>
          <strong>Decisions are values.</strong> Traced (<code>source</code>), explained
          (<code>explain</code>), unit-tested without rendering, stamped on the DOM. You
          cannot ask a media query why.
        </li>
        <li>
          <strong>Call sites speak meaning only.</strong>{' '}
          <code>role=&quot;confirmation&quot;</code> lives at the call site; what it
          becomes lives in one policy file. New decision axes (container size, virtual
          keyboard, foldables) change the perception and decision layers - never the call
          sites. With breakpoints, every new axis multiplies conditions at every call
          site.
        </li>
      </ol>

      <h2>Values follow the presentation</h2>
      <p>
        Protean never &quot;corrects&quot; a radius because the window narrowed. Values
        change when the role changes: a dialog that goes fullscreen is no longer a
        floating card, so its corners disappear; a sheet touches the bottom edge, so only
        its top corners are shaped. The reference stylesheet contains not a single media
        query that changes a radius - every value hangs off a presentation. See{' '}
        <Link href="/en/getting-started">&quot;Style it&quot; in getting started</Link>.
      </p>

      <h2>What the default policy sees - and what it does not</h2>
      <p>In the interest of honesty: here is what perception currently collects.</p>
      <ul>
        <li>size class: compact (below 600px), medium, expanded (840px and up)</li>
        <li>input profile: touch, pointer, hybrid</li>
        <li>virtualKeyboard: whether the on-screen keyboard is up - available to your policies</li>
      </ul>
      <p>
        And the app-first pack branches on input <strong>only at compact size</strong>,
        and does not consult the keyboard yet. On medium and expanded viewports a touch
        tablet receives the same patterns as a mouse desktop (parametric differences
        like touch-target size belong to CSS). That is a decision, not an oversight: we
        do not ship speculative rules we have not validated on real devices.
        Tablet-touch differentiation is on the roadmap; container-scoped decisions
        shipped for overlays (declare inside a ProteanBoundary and the size class is
        measured from that panel, not the viewport) -
        and because the policy is a first-class API, adding those axes will not change
        a single call site of yours.
      </p>

      <p>
        Next: <Link href="/en/why">why this exists</Link> - the larger picture this
        structure is aimed at.
      </p>
    </div>
  )
}
