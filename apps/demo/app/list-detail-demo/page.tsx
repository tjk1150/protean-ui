import Link from 'next/link'
import { InboxDemo } from './inbox'
import './list-detail.css'

export default function ListDetailDemoPage() {
  return (
    <div className="page listDetailDemoPage">
      <p>
        <Link href="/">Back</Link>
      </p>
      <h1>List-detail</h1>
      <p className="lede">
        The canonical master-detail pattern: two panes side by side on a wide screen,
        one screen at a time on a phone - with a back affordance that only exists where
        the stack does. Both panes live in one DOM tree; which one shows is CSS, and
        detail activation is your state, so the server renders it right by
        construction.
      </p>
      <InboxDemo />
      <p className="hint">
        Resize across 600px with a message selected: the same selection is a pane on
        one side and a screen on the other. In the stack, activating a detail moves
        focus to it, and Back returns - wire <code>detailActive</code> to your route
        for URL-driven selection.
      </p>
    </div>
  )
}
