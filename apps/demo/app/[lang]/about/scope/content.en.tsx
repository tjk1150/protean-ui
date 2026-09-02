import Link from 'next/link'

export default function ScopePage() {
  return (
    <div className="doc">
      <h1>Scope and non-goals</h1>
      <p className="lede">
        The map of what Protean owns and what it deliberately does not. One{' '}
        <code>npm install @protean-ui/react</code> brings Base UI along, so building a
        whole app needs no second UI library - this page answers &quot;then where do
        checkboxes and tabs come from?&quot;.
      </p>

      <h2>The map: where each thing comes from</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>You need</th><th>It comes from</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Dialog · Select · Menu · Navigation · ListDetail · PrimaryAction · Tooltip</td><td><strong>Protean decides</strong></td><td>the ones whose interaction itself changes per environment. Container-scoped judgment via Boundary.</td></tr>
            <tr><td>UI density (compact · comfortable · touch)</td><td><strong>Protean decides</strong></td><td>the pointer default is pure CSS; user settings and pattern coupling are the judgment&apos;s. See <Link href="/en/concepts/density">Density</Link>.</td></tr>
            <tr><td>Screen · Actions · SupportingPane</td><td><strong>Included - CSS-driven helpers</strong></td><td>layout helpers that provide structure without judging; their responsiveness belongs to the reference stylesheet.</td></tr>
            <tr><td>every form control - Input · Checkbox · Radio · Switch · Slider · NumberField · Field · Form</td><td><strong>Base UI, directly</strong></td><td><code>import &#123; Checkbox &#125; from &apos;@base-ui/react/checkbox&apos;</code> - already installed. The environment never changes their interaction, so no judgment belongs there.</td></tr>
            <tr><td>Tabs · Accordion · Toast · Progress · Avatar · ScrollArea · Toolbar · ContextMenu and friends</td><td><strong>Base UI, directly</strong></td><td>same. Tabs scrolling on a narrow screen is CSS, not an interaction change.</td></tr>
            <tr><td>cards, badges, section layout, <code>md:flex-row</code></td><td><strong>your CSS</strong></td><td>layout adaptation is a problem CSS already solved. &quot;No breakpoints&quot; applies to pattern branches only.</td></tr>
            <tr><td>tables</td><td><strong>HTML + CSS</strong></td><td>a semantic <code>&lt;table&gt;</code> with responsive styling; data that truly wants a card view is often ListDetail.</td></tr>
            <tr><td>DatePicker · CommandPalette · charts</td><td><strong>not yet · not yet · non-goal</strong></td><td>DatePicker waits for a Base UI calendar; CommandPalette waits for demand; charts belong to chart libraries.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>The non-goals, stated plainly</h2>
      <ul>
        <li>
          <strong>Not a general responsive engine.</strong> Rendering, smooth
          interpolation, and simple mappings (shape following the presentation, for
          one) stay CSS&apos;s. Protean owns only judgments that combine several
          signals.
        </li>
        <li>
          <strong>Not a design system.</strong> The visual language is your
          team&apos;s, left deliberately empty; the reference stylesheet is a default
          meant to be replaced.
        </li>
        <li>
          <strong>No proportional scaling by screen size.</strong> Shrinking a radius
          0.8x because the card shrank is something we evaluated and rejected.
        </li>
      </ul>

      <h2>Mixing them looks like this</h2>
      <pre><code>{`import { Dialog } from '@protean-ui/react'        // judged: the environment decides
import { Field } from '@base-ui/react/field'       // used as-is
import { Input } from '@base-ui/react/input'
import { Checkbox } from '@base-ui/react/checkbox'

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <Field.Root>
      <Field.Label>Address</Field.Label>
      <Input />
    </Field.Root>
    <Checkbox.Root /> Save as default
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        While the dialog opens as a modal on desktop and fullscreen on a phone, the
        form inside never knows. The two layers were designed as one body -
        Protean&apos;s backing primitives are Base UI.
      </p>

      <h2>How far the visuals go</h2>
      <p>
        The reference stylesheet dresses the popups immediately; the skeleton helpers
        dress inside a <code>protean-defaults</code> class. Everything else&apos;s
        visuals are yours - but the vocabulary is shareable: consume the same tokens
        in your own component CSS and the whole app moves as one.
      </p>
      <pre><code>{`/* your components, same vocabulary */
.my-checkbox {
  min-height: var(--protean-target);   /* shared touch-target discipline */
}
.my-delete-button {
  color: var(--protean-danger);        /* shared danger color */
}`}</code></pre>

      <h2>Easy in, easy out</h2>
      <div className="callout">
        Protean is not a parallel ecosystem competing with Base UI - it is one layer
        on top of it. Adopting it adds no new camp to your dependency graph, and
        leaving means returning Protean components to the same Base UI parts - the
        substrate stays.
      </div>
    </div>
  )
}
