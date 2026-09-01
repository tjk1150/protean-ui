import Link from 'next/link'

export default function ListDetailPage() {
  return (
    <div className="doc">
      <h1>ListDetail</h1>
      <p className="lede">
        The master-detail scaffold: <strong>two panes side by side</strong> on medium
        and expanded screens, <strong>one screen at a time</strong> on compact - the
        skeleton of every inbox, chat, and settings screen.
      </p>

      <div className="callout">
        In the <Link href="/list-detail-demo">list-detail demo</Link>, select a message
        and resize across 600px: the same selection is a pane on one side of the line
        and a screen on the other.
      </div>

      <pre><code>{`const [selected, setSelected] = useState<string | null>(null)

<ListDetail.Root
  aria-label="Inbox"
  detailActive={selected !== null}
  onBack={() => setSelected(null)}
>
  <ListDetail.List>{/* items; onClick -> setSelected */}</ListDetail.List>
  <ListDetail.Detail>
    <ListDetail.Back>Back</ListDetail.Back>
    {/* the selected item */}
  </ListDetail.Detail>
</ListDetail.Root>`}</code></pre>

      <h2>Presentations</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Layout</th></tr></thead>
          <tbody>
            <tr><td>medium and expanded</td><td>two panes (list 240-320px, detail fills); the back button is hidden because nothing needs going back from</td></tr>
            <tr><td>compact</td><td>a stack: the list until a detail activates, then the detail with a back button - and focus moves to the detail, since it is a screen change</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Router-agnostic by design</h2>
      <p>
        Which item is selected is <strong>your state</strong>: feed{' '}
        <code>detailActive</code> from it (or from the presence of a route segment) and
        clear it in <code>onBack</code>. Wire it to the URL and the server knows the
        first paint exactly. Both panes always share one DOM tree and CSS decides which
        one shows, so there is nothing to hydrate wrong and nothing to shift. One
        caution: because your CSS always wins, setting <code>display</code> directly
        on <code>[data-part=&quot;list&quot;]</code> fights the stack&apos;s hiding -
        put layout styles on an inner wrapper, or scope them to the visible states.
      </p>

      <h2>Props</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Root: detailActive</td><td>boolean</td><td>whether a detail is active; in the stack it selects the visible screen</td></tr>
            <tr><td>Root: onBack</td><td>() =&gt; void</td><td>called by the Back part - usually clears the selection</td></tr>
            <tr><td>Root: presentation</td><td>&quot;stack&quot; | &quot;panes&quot; | per-size record</td><td>force this one scaffold</td></tr>
            <tr><td>List, Detail, Back</td><td></td><td>structural parts; div/button props pass through. Detail carries tabIndex=-1 to receive focus on stack transitions.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
