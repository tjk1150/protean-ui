import Link from 'next/link'

export default function CustomizeDecisionsPage() {
  return (
    <div className="doc">
      <h1>Customize the smallest layer that solves the problem</h1>
      <p className="lede">
        When a Protean result does not match your product, start with the
        smallest override that expresses the exception. Do not start by
        rewriting the entire policy.
      </p>
      <pre><code>{`one component is different        → instance override
many components need a new rule  → project policy
the user chooses density         → Provider density
result is right, visuals wrong   → CSS
unsure why a result was chosen   → inspect the decision`}</code></pre>

      <h2>1. Change one component</h2>
      <pre><code>{`<Dialog.Root role="form" presentation="sheet">
  ...
</Dialog.Root>`}</code></pre>
      <p>
        That instance wins over the project policy and the built-in pack. Use
        it for real exceptions - this Dialog should always be a sheet, this
        Navigation should stay a sidebar. Do not create a project-wide policy
        for a one-off exception.
      </p>
      <h3>Override only one size class</h3>
      <pre><code>{`<Dialog.Root
  role="form"
  presentation={{ compact: "sheet", expanded: "modal" }}
>
  ...
</Dialog.Root>`}</code></pre>
      <p>
        The override type is conceptually{' '}
        <code>P | Partial&lt;Record&lt;SizeClass, P&gt;&gt;</code>. A missing
        size does not mean &quot;use undefined&quot; - it{' '}
        <strong>falls through to the normal policy resolution</strong>. Here,{' '}
        <code>medium</code> still follows the project policy or pack.
      </p>
      <h3>How precedence works</h3>
      <pre><code>{`instance override → project policy → base pack`}</code></pre>
      <p>
        The resulting decision records its source as <code>instance</code>,{' '}
        <code>policy</code>, or <code>pack</code> - useful when debugging.{' '}
        <strong>The closest explicit override wins.</strong>
      </p>

      <h2>2. Change the project default</h2>
      <p>
        If the same exception appears across the application, define a project
        policy. Start from the built-in pack and override only the decisions
        your product needs to change:
      </p>
      <pre><code>{`import { appFirst, definePolicy } from "@protean-ui/react";

export const productPolicy = definePolicy({
  extends: appFirst,
  name: "product",
  overlay({ traits, role, defaults }) {
    if (role === "contextual" && traits.input === "touch") {
      return "sheet";
    }
    return defaults();
  },
});`}</code></pre>
      <p>
        <code>extends</code> is required, <code>name</code> is optional, and
        the current definition supports overrides for six decision areas:{' '}
        <code>overlay</code> · <code>navigation</code> ·{' '}
        <code>primaryAction</code> · <code>hint</code> · <code>density</code> ·{' '}
        <code>listDetail</code>. There are no Shape, Spacing, Screen, Actions,
        or SupportingPane resolvers - those are not decision domains.
      </p>
      <p>
        Each override receives <code>defaults()</code>. Return it for every
        case you do not care about instead of reproducing the built-in
        branches - if the base pack improves later, delegated branches follow
        it. Keep the policy file a record of{' '}
        <strong>what your product does differently</strong>, not a copy of the
        defaults.
      </p>
      <h3>Install it with ProteanProvider</h3>
      <pre><code>{`<ProteanProvider policy={productPolicy}>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        A Provider is <strong>not required</strong> for normal usage - without
        one, Protean uses its default context and built-in policy. Add it when
        the application actually needs shared configuration:
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Purpose</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td><code>policy</code></td><td>Project-wide adaptive policy.</td><td>This page</td></tr>
            <tr><td><code>density</code></td><td>Explicit user/application density choice.</td><td>This page</td></tr>
            <tr><td><code>thresholds</code></td><td>Runtime size-class thresholds.</td><td>This page</td></tr>
            <tr><td><code>components</code></td><td>Custom Dialog presentation implementations.</td><td><Link href="/en/guides/composition">Composition</Link></td></tr>
            <tr><td><code>ssrTraits</code></td><td>Server-side environment fallback.</td><td><Link href="/en/advanced/server-rendering">Server rendering</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Connect a user density setting</h2>
      <pre><code>{`<ProteanProvider density={density}>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        Density values are <code>compact</code> · <code>comfortable</code> ·{' '}
        <code>touch</code>, and an explicit Provider value overrides the
        automatic decision.
      </p>
      <p>
        <strong>The Provider does not render a wrapper.</strong> It returns a
        React context provider around its children - it does not add{' '}
        <code>&lt;div data-density=&quot;comfortable&quot;&gt;</code> around
        the application. Popup surfaces that need their density (Dialog,
        Select, Menu, Tooltip) stamp it directly on their rendered popup -
        which matters because those surfaces render through portals, where an
        application ancestor would not be their CSS ancestor.
      </p>
      <p>
        If your own static content should follow the same preference, connect
        it in your own DOM:
      </p>
      <pre><code>{`<ProteanProvider density={density}>
  <div data-density={density}>
    <App />
  </div>
</ProteanProvider>`}</code></pre>
      <p>
        The token stylesheet also has a CSS-native automatic path - a coarse
        pointer gets touch-sized defaults through media queries. Use runtime
        density when you need a shared explicit decision; use CSS when CSS can
        directly observe the environment.
      </p>
      <div className="callout">
        <strong>Sheet sizing is a presentation expression.</strong> With a
        user density of <code>comfortable</code> and a selected presentation of{' '}
        <code>sheet</code>, the density decision stays{' '}
        <code>comfortable</code> - the reference CSS still gives sheet surfaces
        touch-oriented dimensions. The current coupling applies to sheet
        presentations for the overlay, Menu, and Select. It does not mean the
        density resolver silently returned <code>touch</code>. Keep decision
        and expression separate.
      </div>

      <h2>4. Change the actual CSS</h2>
      <p>
        If Protean chose the correct pattern but it does not look like your
        product, do not change the policy. Change CSS:
      </p>
      <pre><code>{`:root {
  --protean-accent: var(--color-brand);
  --protean-surface: var(--color-surface);
}

[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>The current public token vocabulary (13 variables):</p>
      <pre><code>{`color    --protean-surface --protean-ink --protean-muted
         --protean-hairline --protean-accent --protean-scrim
         --protean-danger
motion   --protean-motion-pop --protean-motion-sheet
density  --protean-target --protean-row
shape    --protean-shape --protean-pad`}</code></pre>
      <p>
        Want only the vocabulary?{' '}
        <code>import &quot;@protean-ui/css/tokens.css&quot;</code> brings the
        token contract alone, and you write the structural CSS yourself.
      </p>
      <h3>Reference CSS lives in a cascade layer</h3>
      <p>
        The token and reference styles use <code>@layer protean</code>, so a
        normal unlayered application rule overrides them without a specificity
        contest - no <code>!important</code> needed. One narrow exception
        exists: the Select and Menu sheet positioners use{' '}
        <code>!important</code> to override inline positioning from the
        floating primitive. That is an implementation exception, not the
        general strategy - if you override those exact positioner properties,
        account for it.
      </p>
      <h3>Style the selected result through DOM hooks</h3>
      <pre><code>{`data-scope         which component
data-part          which piece inside it
data-presentation  which result was selected
data-density       which density profile applies`}</code></pre>
      <pre><code>{`[data-scope="overlay"][data-part="popup"][data-presentation="sheet"] { ... }
[data-scope="menu"] [data-part="item"][data-variant="danger"] { ... }
[data-scope="list-detail"][data-detail-active] { ... }`}</code></pre>
      <p>
        Components without a presentation expose their own state hooks the same
        way - ListDetail&apos;s <code>data-detail-active</code>, Actions&apos;{' '}
        <code>data-secondary</code> and <code>data-overflow-open</code>,
        SupportingPane&apos;s <code>data-compact</code> and{' '}
        <code>data-open</code>. If the DOM already says{' '}
        <code>data-presentation=&quot;sheet&quot;</code>,{' '}
        <strong>style that result</strong> - do not write a second rule that
        guesses &quot;is this probably mobile?&quot; The decision has already
        been made.
      </p>
      <div className="callout">
        <strong>Be careful with structural display rules.</strong> Navigation,
        ListDetail, Screen, Actions, and SupportingPane rely on CSS to hide or
        rearrange parts of one stable DOM. Forcing{' '}
        <code>display: block !important</code> on every part can break the
        interaction model. Customize intentionally rather than flattening the
        structural rules.
      </div>

      <h2>Thresholds change runtime classification</h2>
      <pre><code>{`<ProteanProvider thresholds={{ medium: 640, expanded: 960 }}>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        The defaults are <code>medium: 600</code> and{' '}
        <code>expanded: 840</code>.
      </p>
      <div className="callout">
        <strong>Reference CSS thresholds do not update automatically.</strong>{' '}
        Changing the runtime thresholds does not rewrite the media queries
        compiled into <code>reference.css</code> - the reference chrome styles
        assume the defaults. A project that changes runtime thresholds and
        keeps the reference layouts should update the corresponding CSS too.
        They are separate configuration surfaces.
      </div>
      <p>
        Near a boundary, the environment store uses hysteresis (currently a
        16px deadband) so a hovering viewport does not flip between classes.
        This is store behavior - there is no <code>deadband</code> prop on the
        Provider. Reduced motion works the same way: Protean collects the
        preference as a trait, but the reference animations are guarded by{' '}
        <code>@media (prefers-reduced-motion: no-preference)</code> in CSS. If
        you replace those animations, you own respecting the preference.
      </p>

      <h2>5. Inspect why Protean chose a result</h2>
      <p>
        When a decision is not what you expected, inspect it before changing
        the policy. In development, the decision components (Dialog, Select,
        Menu, Navigation, ListDetail, PrimaryAction, Tooltip) write each
        decision to <code>console.debug</code> - these logs do not appear in
        production builds.
      </p>
      <pre><code>{`[protean] overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`}</code></pre>
      <p>
        A decision carries the domain, the result, its <code>source</code>{' '}
        (<code>instance</code> / <code>policy</code> / <code>pack</code>), the
        policy name, and the traits at the time. The source is often the
        fastest way to discover that an instance override is winning over your
        project policy. The publicly exported <code>explain()</code> formats a
        decision into the same readable string - a debugging tool, not a
        rendering primitive.
      </p>
      <h3>useTraits() when you really need the environment</h3>
      <pre><code>{`import { useTraits } from "@protean-ui/react";

const traits = useTraits();
// { size, input, hover, reducedMotion, virtualKeyboard }`}</code></pre>
      <div className="callout">
        Use <code>useTraits()</code> for diagnostics, custom policy logic, or
        exceptional integrations - not as the default responsive-rendering
        API.{' '}
        <code>traits.size === &quot;compact&quot; ? &lt;MobileThing /&gt; :
        ...</code> recreates exactly the branching Protean is meant to
        centralize.
      </div>

      <h2>Which layer do I change?</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Need</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>One component should differ</td><td><code>presentation</code> instance override</td></tr>
            <tr><td>One size should differ</td><td>per-size <code>presentation</code> override</td></tr>
            <tr><td>Product-wide adaptive rule</td><td><code>definePolicy()</code></td></tr>
            <tr><td>User chooses density</td><td><code>ProteanProvider density</code></td></tr>
            <tr><td>Runtime size thresholds differ</td><td><code>thresholds</code> + matching project CSS</td></tr>
            <tr><td>Colors / shape / padding differ</td><td>CSS tokens</td></tr>
            <tr><td>Structure / layout differs</td><td>project CSS</td></tr>
            <tr><td>Inspect a decision</td><td>development logs / <code>explain()</code></td></tr>
            <tr><td>Raw environment state</td><td><code>useTraits()</code></td></tr>
            <tr><td>Replace Dialog presentation implementations</td><td><Link href="/en/guides/composition">Composition</Link></td></tr>
            <tr><td>Customize server fallback traits</td><td><Link href="/en/advanced/server-rendering">Server rendering</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2>Advanced: authoring a full PolicyPack</h2>
      <p>
        Building a <code>PolicyPack</code> from scratch is an escape hatch for
        organizations that share a completely different convention across many
        applications. Most projects should use{' '}
        <code>definePolicy(&#123; extends: appFirst, ... &#125;)</code> because
        it makes delegation explicit. Do not copy the entire pack just to
        change one branch.
      </p>

      <h2>What not to customize in JavaScript</h2>
      <p>
        Do not create policy rules for radius, padding, gap, grid columns,
        color, shadow, or animation duration when the semantic presentation is
        already correct. Those belong in CSS.
      </p>
      <pre><code>{`the selected interaction pattern should change → policy
the expression of that result should change    → CSS`}</code></pre>
      <p>
        Next: <Link href="/en/guides/composition">Composition</Link>.
      </p>
    </div>
  )
}
