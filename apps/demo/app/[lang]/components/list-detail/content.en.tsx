import Link from 'next/link'

export default function ListDetailPage() {
  return (
    <div className="doc">
      <h1>ListDetail</h1>
      <p className="lede">
        Use <code>ListDetail</code> for interfaces where the user chooses an
        item from a list and then works with its detail view. On wider layouts,
        the list and detail appear side by side. On compact layouts, the same
        content behaves like a stacked flow - List → Detail - without
        maintaining separate mobile and desktop component trees.
      </p>

      <div className="callout">
        In the <Link href="/list-detail-demo">list-detail demo</Link>, select an
        item and resize the window: the same selection appears as a pane on one
        side and as a full view on the other.
      </div>

      <h2>Basic usage</h2>
      <pre><code>{`import { ListDetail } from "@protean-ui/react";

<ListDetail.Root
  detailActive={selectedProject !== null}
  onBack={() => setSelectedProject(null)}
>
  <ListDetail.List>
    <ProjectList selected={selectedProject} onSelect={setSelectedProject} />
  </ListDetail.List>
  <ListDetail.Detail>
    <ListDetail.Back>Back to list</ListDetail.Back>
    {selectedProject && <ProjectDetails project={selectedProject} />}
  </ListDetail.Detail>
</ListDetail.Root>`}</code></pre>
      <p>
        The application owns which item is selected. Protean owns how the
        list/detail structure should be presented.
      </p>

      <h2>Default presentation</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Presentation</th></tr>
          </thead>
          <tbody>
            <tr><td>compact</td><td><code>stack</code></td></tr>
            <tr><td>medium</td><td><code>panes</code></td></tr>
            <tr><td>expanded</td><td><code>panes</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Input type does not change the default ListDetail result - compact with
        a pointer is still a stack, medium with touch is still panes. Not every
        Protean component reads the same signals; ListDetail&apos;s default
        decision cares about available space.
      </p>

      <h2>detailActive belongs to the application</h2>
      <p>
        Protean does not choose which list item is active - the application
        already knows that. Pass the state through <code>detailActive</code>:
      </p>
      <pre><code>{`<ListDetail.Root detailActive={selectedId !== null}>`}</code></pre>
      <pre><code>{`application → which item is selected?
ListDetail  → how should list + detail be presented?`}</code></pre>
      <p>
        Wire it to local state or to the router (
        <code>detailActive=&#123;Boolean(orderId)&#125;</code>) - either way it
        is authored state, not internal selection state.
      </p>

      <h2>Stack mode behaves like navigation</h2>
      <p>
        In <code>stack</code>, the list and detail are part of the same
        structure, but the reference layout shows one at a time:
      </p>
      <pre><code>{`detailActive=false → show List
detailActive=true  → show Detail`}</code></pre>
      <p>
        When the Detail becomes active in stack mode, ListDetail{' '}
        <strong>moves focus to the Detail region</strong> - the visible context
        changed, and the user should not remain focused on a list control that
        is no longer the active view. In <code>panes</code>, both regions are
        visible, so activating a detail does{' '}
        <strong>not</strong> move focus automatically. This difference is
        intentional.
      </p>

      <h2>One DOM structure</h2>
      <p>
        ListDetail does not render one mobile tree and another desktop tree. The
        same core structure stays mounted:
      </p>
      <pre><code>{`<div
  data-scope="list-detail"
  data-presentation="panes"
  data-detail-active
>
  <div data-part="list">...</div>
  <div data-part="detail">...</div>
</div>`}</code></pre>
      <p>
        Protean exposes <code>data-presentation</code> and{' '}
        <code>data-detail-active</code>, and CSS determines how those regions
        are arranged or displayed. The full DOM-hook reference lives in{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>.
      </p>

      <h2>Back navigation in stack mode</h2>
      <pre><code>{`<ListDetail.Back>Back to list</ListDetail.Back>`}</code></pre>
      <p>
        When the Back button is pressed, its own <code>onClick</code> runs
        first; if the event is not prevented, ListDetail then calls the Root{' '}
        <code>onBack</code> - usually clearing the selection. The Back control
        stays in the shared DOM: in panes mode the reference stylesheet hides it
        (the list is already visible), and in stack mode it becomes part of the
        active detail flow. There is no conditional mounting - stable structure
        plus CSS presentation, not separate responsive trees.
      </p>

      <h2>Override the presentation</h2>
      <pre><code>{`<ListDetail.Root
  presentation="panes"
  detailActive={Boolean(selectedId)}
>
  ...
</ListDetail.Root>`}</code></pre>
      <p>
        This changes the selected presentation and{' '}
        <code>data-presentation</code>. The reference stylesheet still owns the
        actual physical layout - the same precision as on the Navigation page:
      </p>
      <pre><code>{`presentation → decision + data-presentation
CSS          → stack / panes layout, visibility`}</code></pre>
      <p>
        Under the default reference configuration these agree, but{' '}
        <code>presentation=&quot;panes&quot;</code> is not a JavaScript geometry
        engine. If project CSS overrides the reference layout, the application
        owns the final visual result.
      </p>

      <div className="callout">
        <strong>Careful with display overrides.</strong> The reference
        stylesheet uses the presentation and <code>data-detail-active</code> to
        decide which region is visible in stack mode. Forcing{' '}
        <code>display</code> on <code>[data-part=&quot;list&quot;]</code> or{' '}
        <code>[data-part=&quot;detail&quot;]</code> from unlayered CSS can make
        both regions visible at once and break the stacked flow. Scope layout
        styles to a visible state, or style an inner wrapper instead.
      </div>

      <h2>ListDetail.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>Overrides the selected presentation (<code>stack</code> · <code>panes</code>, per size class if needed).</td></tr>
            <tr><td><code>detailActive</code></td><td>Whether the detail view is active. Default: <code>false</code> (list state).</td></tr>
            <tr><td><code>onBack</code></td><td>Called by the default Back flow.</td></tr>
            <tr><td><code>children</code></td><td>The list and detail regions.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Native <code>&lt;div&gt;</code> attributes pass through.</p>

      <h2>ListDetail.List / ListDetail.Detail / ListDetail.Back</h2>
      <p>
        <code>List</code> and <code>Detail</code> contain the two regions and
        accept normal <code>&lt;div&gt;</code> attributes. Data fetching and
        selection state stay in the application - ListDetail does not manage
        list data. The Detail region uses <code>tabIndex=&#123;-1&#125;</code>{' '}
        so stack mode can move focus there programmatically without adding it
        to the normal Tab order. <code>Back</code> is a real button that
        accepts the usual button props. Deeper focus guidance lives in{' '}
        <Link href="/en/guides/accessibility">Accessibility</Link>.
      </p>
    </div>
  )
}
