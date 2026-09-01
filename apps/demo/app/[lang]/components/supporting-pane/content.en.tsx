import { SupportingPaneDemo } from './supporting-pane-demo'

export default function SupportingPanePage() {
  return (
    <div className="doc">
      <h1>SupportingPane</h1>
      <p className="lede">
        Secondary content beside the main content - a document&apos;s metadata, a
        product&apos;s summary card, an article&apos;s outline. Where there is room it
        sits alongside; on compact it collapses behind a button and rises as a bottom
        sheet. The third of Material&apos;s canonical layouts (with list-detail; feed
        is a CSS grid concern, so it is not a component).
      </p>

      <div className="example">
        <span className="exampleLabel">Try it - narrow the window below 600px</span>
        <SupportingPaneDemo
          paneLabel="Document info"
          body="Imagine the contract body flowing here. On a wide screen the document info stays visible on the right; on a phone it rises on demand."
          rows={[
            ['Author', 'Jintae Jang'],
            ['Modified', 'Sep 2, 2026'],
            ['Size', '18KB'],
          ]}
        />
      </div>

      <pre><code>{`<SupportingPane.Root paneLabel="Document info">
  <SupportingPane.Main>
    <ContractBody />
  </SupportingPane.Main>
  <SupportingPane.Pane>
    <MetadataList />
  </SupportingPane.Pane>
</SupportingPane.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>medium and expanded</td><td>a fixed panel beside the content; the toggle stays hidden</td></tr>
            <tr><td>compact</td><td>collapsed behind a button; opens as a bottom sheet, closed by Escape or a backdrop tap. Non-modal - focus is not trapped.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>You decide how it collapses</h2>
      <p>
        If the supporting content is &quot;look when you need it&quot;, keep the default
        (sheet). If it must be read in flow after the main content, say{' '}
        <code>compact=&quot;stacked&quot;</code> and it simply stacks below. That is a
        question of <strong>meaning</strong>, not environment, so the runtime never
        guesses. Either way the markup is identical on server and client, and the
        presentation is entirely the reference stylesheet&apos;s CSS - the same
        principle as the navigation bar&apos;s More.
      </p>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Root: paneLabel</td><td>string (required)</td><td>the pane&apos;s accessible name and the compact toggle&apos;s label</td></tr>
            <tr><td>Root: compact</td><td>&quot;sheet&quot; (default) | &quot;stacked&quot;</td><td>collapse into a sheet, or stack below the content; stacked renders no toggle at all</td></tr>
            <tr><td>Main · Pane</td><td></td><td>the content and the supporting region; Pane renders an <code>aside</code> (complementary)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
