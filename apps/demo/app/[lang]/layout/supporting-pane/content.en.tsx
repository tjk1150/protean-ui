import Link from 'next/link'
import { SupportingPaneDemo } from './supporting-pane-demo'

export default function SupportingPanePage() {
  return (
    <div className="doc">
      <h1>SupportingPane</h1>
      <p className="lede">
        Use <code>SupportingPane</code> when a screen has primary content plus
        related supporting content such as filters, details, or tools. On wider
        layouts, the reference styles place them side by side. On compact
        layouts, <strong>you</strong> choose whether the supporting pane behaves
        as a sheet or as stacked content.
      </p>

      <h2>Try it</h2>
      <div className="example">
        <span className="exampleLabel">Narrow the window below 600px</span>
        <SupportingPaneDemo
          paneLabel="Document info"
          body="Imagine contract text flowing here. On a wide screen the document info stays on the right; on a phone it opens from a button below."
          rows={[
            ['Author', 'J. Jang'],
            ['Modified', 'Sep 2, 2026'],
            ['Size', '18KB'],
          ]}
        />
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { SupportingPane } from "@protean-ui/react";

<SupportingPane.Root paneLabel="Filters">
  <SupportingPane.Main>
    <ProductList />
  </SupportingPane.Main>
  <SupportingPane.Pane>
    <Filters />
  </SupportingPane.Pane>
</SupportingPane.Root>`}</code></pre>

      <h2>Choose the compact behavior</h2>
      <p>
        SupportingPane does not have a policy resolver that decides between
        sheet and stacked mode. The application chooses, with{' '}
        <code>compact=&quot;sheet&quot;</code> (the default) or{' '}
        <code>compact=&quot;stacked&quot;</code>. This is authored
        configuration, not an automatic device decision.
      </p>
      <ul>
        <li>
          <strong><code>sheet</code></strong> - on compact layouts the pane
          stays collapsed behind a toggle and opens over the content. Good for
          supporting content the user consults on demand.
        </li>
        <li>
          <strong><code>stacked</code></strong> - the pane becomes part of the
          normal compact document flow, below the main content. Good for
          supporting content that should always be visible.
        </li>
      </ul>
      <p>
        In sheet mode, control the open state with <code>open</code> /{' '}
        <code>onOpenChange</code> or leave it uncontrolled with{' '}
        <code>defaultOpen</code>.
      </p>

      <h2>Sheet does not mean Dialog</h2>
      <p>
        This is the most important distinction on this page. The compact sheet
        is still a <strong>supporting pane</strong>. It renders as{' '}
        <code>&lt;aside aria-label=&quot;Filters&quot;&gt;</code> - it does not
        become <code>role=&quot;dialog&quot;</code> just because it moves over
        the content visually. The sheet behavior does <strong>not</strong> add
        a Dialog role, focus trapping, automatic focus movement, or focus
        restoration. It is a non-modal supporting region.{' '}
        <strong>It can look like a sheet without becoming a Dialog.</strong>
      </p>

      <h2>Toggle, backdrop, and Escape</h2>
      <p>
        In sheet mode, the component renders a toggle and a backdrop as part of
        the shared structure. The toggle reports its state with{' '}
        <code>aria-expanded</code> and points at the pane with{' '}
        <code>aria-controls</code>; the backdrop is <code>aria-hidden</code> and
        closes the sheet directly when activated. Escape also closes the open
        sheet - your own <code>onKeyDown</code> on the Root runs first, and
        calling <code>event.preventDefault()</code> stops the automatic close.
        None of this is focus-trap behavior; there is no focus trap.
      </p>

      <h2>Sheet and stacked differ in the DOM</h2>
      <pre><code>{`compact="sheet"   → toggle and backdrop are rendered
                    (wide reference CSS hides them)
compact="stacked" → toggle and backdrop are not rendered at all`}</code></pre>
      <p>
        For <code>sheet</code>, the controls stay in the DOM on wider layouts
        and the reference stylesheet hides them - they are not mounted only on
        small screens. For <code>stacked</code>, they are genuinely absent.
        This is a real DOM difference driven by the authored{' '}
        <code>compact</code> prop, not by the viewport.
      </p>

      <h2>Wider layouts</h2>
      <p>
        At the reference wide breakpoint, the stylesheet arranges the main
        content and the supporting pane side by side, with the pane in a fixed
        supporting column. The reference layout is opt-in under{' '}
        <code>protean-defaults</code>, like the other layout helpers. You can
        also keep the stable markup and own the layout entirely:
      </p>
      <pre><code>{`[data-scope="supporting"] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
}`}</code></pre>
      <p>
        <strong>SupportingPane owns structure and authored compact behavior.
        CSS owns the actual layout.</strong> The reference sheet animation runs
        only under <code>prefers-reduced-motion: no-preference</code> - if you
        replace the animation, respecting that preference becomes your job.
      </p>

      <h2>SupportingPane.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>paneLabel</code></td><td>Required. Accessible label for the pane and text for the compact toggle - name what it opens (&quot;Filters&quot;), not the gesture (&quot;Open&quot;).</td></tr>
            <tr><td><code>compact</code></td><td><code>&quot;sheet&quot; | &quot;stacked&quot;</code>. Defaults to <code>sheet</code>.</td></tr>
            <tr><td><code>open</code> / <code>defaultOpen</code> / <code>onOpenChange</code></td><td>Sheet open state, controlled or uncontrolled. Initial state is closed.</td></tr>
            <tr><td><code>children</code></td><td>The Main and Pane regions.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Standard <code>div</code> attributes pass through. There is no{' '}
        <code>presentation</code>, policy, or density prop.
      </p>

      <h2>SupportingPane.Main / SupportingPane.Pane</h2>
      <p>
        <code>Main</code> contains the primary content;{' '}
        <code>Pane</code> renders the supporting content as an{' '}
        <code>&lt;aside&gt;</code> that receives{' '}
        <code>aria-label=&#123;paneLabel&#125;</code> from the Root. Both accept
        standard HTML attributes. The toggle and backdrop are internal parts of
        the structure, not public namespace components. The full DOM hook
        contract (including <code>data-compact</code> and{' '}
        <code>data-open</code>) lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>
    </div>
  )
}
