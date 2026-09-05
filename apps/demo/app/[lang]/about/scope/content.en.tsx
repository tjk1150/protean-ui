import Link from 'next/link'

export default function ScopePage() {
  return (
    <div className="doc">
      <h1>What Protean does and does not do</h1>
      <p className="lede">
        Protean UI is a headless adaptive UI runtime for React. It focuses on
        one specific problem:{' '}
        <strong>choosing semantic UI patterns when several environment
        signals need to be considered together</strong> - the problem that
        otherwise scatters{' '}
        <code>isMobile ? &lt;MobileSheet /&gt; : &lt;DesktopPopover /&gt;</code>{' '}
        branches through an app. It does not try to own every responsive or
        design-system concern.
      </p>

      <h2>Current decision domains</h2>
      <p>
        The current policy system has exactly six decision domains. From the
        user&apos;s perspective they are two kinds of decision:
      </p>
      <pre><code>{`pattern adaptation
overlay        modal · sheet · fullscreen · popover
navigation     bar · drawer · rail · sidebar
primaryAction  action-bar · sticky-footer · inline
hint           tooltip · popover
listDetail     stack · panes

density
density        compact · comfortable · touch`}</code></pre>
      <p>
        Compressed to one line, the automatic judgment is{' '}
        <strong>&quot;which pattern? + how dense?&quot;</strong> Density is a
        real decision domain, not just a CSS token name - the policy resolves
        a profile, and CSS still expresses the actual dimensions through row
        and target variables.
      </p>

      <h2>Two kinds of building blocks, ten namespaces</h2>
      <p>The current React package exposes ten UI namespaces:</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Component</th><th>Owns</th></tr></thead>
          <tbody>
            <tr><td><code>Dialog</code></td><td>confirmation · form · contextual overlays</td></tr>
            <tr><td><code>Select</code></td><td>choosing one value</td></tr>
            <tr><td><code>Menu</code></td><td>a list of actions</td></tr>
            <tr><td><code>Navigation</code></td><td>app navigation</td></tr>
            <tr><td><code>ListDetail</code></td><td>list + detail</td></tr>
            <tr><td><code>PrimaryAction</code></td><td>the screen&apos;s most important action</td></tr>
            <tr><td><code>Tooltip</code></td><td>short supplemental help</td></tr>
            <tr><td><code>Screen</code></td><td>base page structure</td></tr>
            <tr><td><code>Actions</code></td><td>a group of related actions</td></tr>
            <tr><td><code>SupportingPane</code></td><td>main content + supporting region</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The first seven are <strong>adaptive components</strong> - they
        participate in a Protean decision. The last three - Screen, Actions,
        SupportingPane - are <strong>CSS-centered layout helpers</strong>:
        stable structure and state, with CSS handling the responsive layout.
        They have no adaptive presentation decision of their own
        (SupportingPane&apos;s <code>compact=&quot;sheet | stacked&quot;</code>{' '}
        is an author choice, not a decision result). Do not read every Protean
        namespace as a policy-driven component.
      </p>
      <p>
        Alongside these sit <code>ProteanProvider</code>,{' '}
        <code>ProteanBoundary</code>, the policy API, environment traits,
        density, the CSS tokens, and reference.css. The shipped public adapter
        is <code>@protean-ui/react</code> (React 18+). The decision model is
        conceptually DOM-independent, but no Vue, Svelte, Solid, or Angular
        first-party adapters exist today.
      </p>

      <h2>Ten namespaces, six domains - on purpose</h2>
      <p>
        There are more adaptive components than decision domains, and that is
        intentional. Dialog, Select, and Menu all ride the shared{' '}
        <strong>overlay</strong> decision machinery - Select and Menu use the
        same contextual overlay contract as Dialog - instead of each component
        name getting its own top-level policy domain. There is no separate{' '}
        <code>select</code> or <code>menu</code> policy callback; the policy
        API exposes <code>overlay</code>. Tooltip&apos;s adaptive choice
        belongs to <strong>hint</strong>, choosing between tooltip and popover
        from hover capability under the default policy. And each component
        reads only the environment signals that matter to it - Tooltip cares
        about hover more than width, ListDetail looks at space only.{' '}
        <code>component ≠ one unique decision domain</code>.
      </p>

      <h2>Shape is not a decision domain</h2>
      <p>
        The token contract includes <code>--protean-shape</code>, and the
        reference tokens vary it by presentation - card corners for a modal,
        top corners only for a sheet, no radius for fullscreen. But the
        current structure is:{' '}
        <strong>presentation is decided first, and CSS expresses the shape of
        that result.</strong> There is no public <code>ShapeDecision</code>,{' '}
        <code>decideShape()</code>, or <code>definePolicy(&#123; shape:
        ... &#125;)</code> - shape was explored as a possible adaptive domain
        and deliberately did not become one. A CSS token existing does not
        mean a runtime decision domain exists.
      </p>

      <h2>Spacing is not a decision domain either</h2>
      <p>
        The same boundary applies to <code>--protean-pad</code>: it is an
        expression token, not proof of a spacing resolver. There is no{' '}
        <code>policy.spacing</code> or <code>decideSpacing()</code>. Ordinary
        gap, margin, and grid spacing belong to project CSS and the design
        system. The selected presentation can still influence shape and
        padding <em>through CSS</em>:
      </p>
      <pre><code>{`data-presentation="sheet" → CSS chooses sheet radius / padding
data-presentation="modal" → CSS chooses modal radius / padding`}</code></pre>
      <pre><code>{`Protean → chooses the semantic presentation
CSS     → derives shape, padding, geometry from that result`}</code></pre>

      <h2>Not a responsive CSS replacement</h2>
      <p>
        Media queries and container queries stay in use - Protean&apos;s own
        reference styles use CSS heavily. CSS keeps owning grid and flex
        layout, continuous interpolation, spacing, radius, typography, color,
        shadows, animation expression, and geometry. Do not route those
        through JavaScript just because Protean exists.
      </p>
      <pre><code>{`Popover or sheet?                    → Protean
Sidebar or bottom navigation?        → Protean
Comfortable or touch density?        → Protean

Two columns or one?                  → CSS
16px gap or 24px?                    → CSS
Card stacks vertically when narrow?  → CSS`}</code></pre>
      <p>
        A useful boundary:{' '}
        <strong>semantic endpoints belong to Protean; the journey and
        expression between endpoints belong to CSS.</strong>
      </p>

      <h2>Not a design system</h2>
      <p>
        Protean does not define your typography, brand colors, spacing scale,
        icon library, button variants, or product visual language.{' '}
        <code>reference.css</code> is a runnable{' '}
        <strong>reference implementation plus token contract</strong>, not a
        required design - combine Protean&apos;s DOM and decision contracts
        with your own design-system CSS, and wire the tokens to your project
        tokens:
      </p>
      <pre><code>{`:root {
  --protean-accent: var(--color-brand);
  --protean-surface: var(--color-surface);
}

/* your components share the same vocabulary */
.my-checkbox {
  min-height: var(--protean-target);
}`}</code></pre>
      <p>
        The layout reference styles sit behind the{' '}
        <code>protean-defaults</code> opt-in for the same reason.
      </p>

      <h2>Not every UI component</h2>
      <p>
        Protean does not rebuild Button, Checkbox, Tabs, Accordion, Toast, or
        TextField - those components mostly have no{' '}
        <strong>pattern-swap problem</strong>. The React package uses Base UI
        as a dependency for underlying interaction and accessibility
        primitives, but{' '}
        <strong>Base UI is an implementation dependency, not the Protean
        public API surface</strong> - Protean does not re-export the Base UI
        package wholesale, and Base UI&apos;s extra groups, positioning props,
        or variant options are not automatically part of a Protean
        wrapper&apos;s contract. Use Base UI or your existing component
        library alongside:
      </p>
      <pre><code>{`import { Dialog } from '@protean-ui/react'      // judged: the environment picks the form
import { Field } from '@base-ui/react/field'     // used as-is
import { Input } from '@base-ui/react/input'

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <Field.Root>
      <Field.Label>Address</Field.Label>
      <Input />
    </Field.Root>
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        If the project already has Button, Input, and a theme, keep them.
        Protean takes only the parts that need &quot;which pattern should
        this be right now?&quot; - and leaving means returning Protean
        components to the same underlying parts.
      </p>

      <h2>Also not</h2>
      <ul>
        <li>
          <strong>A universal breakpoint engine</strong> - compact / medium /
          expanded classify the environment for decisions. Project CSS does
          not need to consolidate every breakpoint into them; if you need{' '}
          <code>@media (width &gt;= 720px)</code>, just use it.
        </li>
        <li>
          <strong>Another name for isMobile</strong> - <code>useTraits()</code>{' '}
          is a public escape hatch for diagnostics and custom policies that
          genuinely need the environment. Rebuilding{' '}
          <code>size === &quot;compact&quot; ? &lt;MobileVersion /&gt; :
          &lt;DesktopVersion /&gt;</code> as normal architecture is exactly
          what the component contracts, policy system, and CSS exist to avoid.
        </li>
        <li>
          <strong>A device-detection library</strong> - the current traits are{' '}
          <code>size</code>, <code>input</code>, <code>hover</code>,{' '}
          <code>reducedMotion</code>, and <code>virtualKeyboard</code>. There
          is no device model or OS name, and no isMobile / isTablet /
          isDesktop label - a narrow pointer window and a narrow touch device
          can produce different decisions.
        </li>
        <li>
          <strong>A new viewport for every container</strong> -{' '}
          <code>ProteanBoundary</code> swaps only the size input for supported
          overlay decisions. Container adaptation of page chrome belongs to
          CSS container queries.
        </li>
        <li>
          <strong>A geometry engine</strong> - Boundary measures container
          width only as far as the size decision needs. Anchor positioning
          belongs to the underlying primitives; general layout, exact widths,
          and continuous interpolation stay CSS/browser layout.
        </li>
        <li>
          <strong>Router, forms, or business logic</strong> - the app supplies
          the current page (<code>current</code>), the selected item
          (<code>detailActive</code>), and form validity. Protean expresses
          that meaning for the environment.
        </li>
        <li>
          <strong>Automatic accessibility certification</strong> -
          accessibility-oriented interaction contracts, not a compliance
          guarantee for the whole app. See{' '}
          <Link href="/en/guides/accessibility">Accessibility</Link>.
        </li>
      </ul>

      <h2>Reference CSS is optional</h2>
      <p>
        Use <code>import &quot;@protean-ui/css/reference.css&quot;</code> for
        the supplied reference expression, or only the token contract via{' '}
        <code>import &quot;@protean-ui/css/tokens.css&quot;</code> with your
        own structural CSS - or own the complete styling contract while
        consuming Protean&apos;s DOM hooks. reference.css is not required for
        component semantics, though the layout helpers need reference or
        equivalent project CSS to produce useful layout.
      </p>

      <h2>Ownership at a glance</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Concern</th><th>Owner</th></tr></thead>
          <tbody>
            <tr><td>Overlay / navigation / hint / list-detail / primary-action semantic choice</td><td>Protean</td></tr>
            <tr><td>Density profile decision</td><td>Protean</td></tr>
            <tr><td>Shape / radius</td><td>CSS</td></tr>
            <tr><td>Spacing / padding</td><td>CSS</td></tr>
            <tr><td>Grid / flex / geometry</td><td>CSS</td></tr>
            <tr><td>Container layout</td><td>CSS container queries</td></tr>
            <tr><td>Current route</td><td>Application</td></tr>
            <tr><td>Selected ListDetail item</td><td>Application</td></tr>
            <tr><td>SupportingPane compact mode</td><td>Application prop</td></tr>
            <tr><td>Actions secondary priority</td><td>Application prop</td></tr>
            <tr><td>Accessibility meaning / labels</td><td>Protean + application</td></tr>
            <tr><td>Product visual language</td><td>Application / design system</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        And what Protean does not currently provide, as facts rather than
        roadmap: no Shape decision domain, no Spacing decision domain, no
        universal responsive solver, no device classification API, no complete
        design system, no geometry engine, no non-React first-party adapter.
      </p>

      <h2>When Protean fits</h2>
      <p>
        Protean fits when{' '}
        <strong>the same feature is being split into two implementations
        because of the environment</strong> - especially when state, focus,
        ARIA, density, and styles must be kept in sync between them. If the
        problem is &quot;change flex-direction when narrow&quot; or &quot;a
        slightly different radius per screen&quot;, CSS is simpler. The same
        criterion governs any future scope growth: does the pattern itself
        change per environment, does the same branch repeat across apps, and
        does it need state, focus, and semantics wired together? Purely visual
        changes stay in CSS.
      </p>
      <pre><code>{`a pattern must be chosen   → Protean
a density must be chosen   → Protean
layout and design expression → CSS / design system
the app's meaning and state  → application`}</code></pre>
      <p>
        Keeping this boundary is also how Protean stays small. The current
        verification level and known limitations are on{' '}
        <Link href="/en/about/status">Quality and support</Link>.
      </p>
    </div>
  )
}
