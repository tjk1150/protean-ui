import { ActionsDemo } from './actions-demo'

export default function ActionsPage() {
  return (
    <div className="doc">
      <h1>Actions</h1>
      <p className="lede">
        A row of action buttons. Everything sits inline where there is room; on compact
        screens the items you mark <code>secondary</code> collapse behind a More toggle
        and expand in place when opened. Document toolbars, card tool rows.
      </p>

      <div className="callout">
        This is a <strong>CSS-driven layout helper</strong>: it provides structure and
        markup without judging the situation, and the responsiveness belongs to the
        reference stylesheet (or your own CSS). Its default look applies inside an
        element carrying the <code>protean-defaults</code> class.
      </div>

      <div className="example">
        <span className="exampleLabel">Try it - narrow the window below 600px</span>
        <ActionsDemo
          labels={{ save: 'Save', share: 'Share', rename: 'Rename', remove: 'Delete' }}
          moreLabel="More"
          onPick="Picked"
        />
      </div>

      <pre><code>{`<Actions.Root aria-label="Document tools" moreLabel="More">
  <Actions.Item onClick={save}>Save</Actions.Item>
  <Actions.Item onClick={share}>Share</Actions.Item>
  <Actions.Item secondary onClick={rename}>Rename</Actions.Item>
  <Actions.Item secondary destructive onClick={remove}>Delete</Actions.Item>
</Actions.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>medium and expanded</td><td>one inline row; the More toggle stays hidden</td></tr>
            <tr><td>compact</td><td>secondary items collapse behind More, expand in place as full-width rows, and re-collapse after one runs</td></tr>
          </tbody>
        </table>
      </div>

      <h2>You decide what steps aside</h2>
      <p>
        Which actions are secondary is a question of <strong>meaning</strong>, not
        environment - so the runtime never guesses; you mark them. The marking is
        environment-independent, so server and client markup are always identical, and
        collapsing is entirely the reference stylesheet&apos;s CSS - the same principle
        as the navigation bar&apos;s More. To collapse by container width inside a
        panel, write CSS container queries against the same data attributes.
      </p>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Root: moreLabel</td><td>string, default &quot;More&quot;</td><td>label for the More toggle</td></tr>
            <tr><td>Item: secondary</td><td>boolean</td><td>may step aside when space is tight</td></tr>
            <tr><td>Item: destructive</td><td>boolean</td><td>stamped <code>data-variant=&quot;danger&quot;</code></td></tr>
            <tr><td>Item: icon, onClick, disabled ...</td><td></td><td>button props pass through</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
