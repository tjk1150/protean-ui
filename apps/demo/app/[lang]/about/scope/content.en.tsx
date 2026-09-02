export default function CoveragePage() {
  return (
    <div className="doc">
      <h1>Is this enough?</h1>
      <p className="lede">
        Yes. One <code>npm install @protean-ui/react</code> brings the adaptation layer
        (Protean) and the entire behavior layer (Base UI installs alongside it). You
        do not need another UI library to build a whole app. This page is the map
        for &quot;then where do checkboxes, tabs, and toasts come from?&quot;.
      </p>

      <h2>The map: where each thing comes from</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>You need</th><th>It comes from</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Dialog · Select · Menu · Navigation · Screen · PrimaryAction · Tooltip · ListDetail · Actions · SupportingPane</td><td><strong>Protean roles</strong></td><td>the ones whose interaction contract changes per environment - the runtime owns the decision. Container-scoped decisions via Boundary.</td></tr>
            <tr><td>UI density (compact · comfortable · touch)</td><td><strong>Protean decision + tokens</strong></td><td>the pointer default is pure CSS; user settings and pattern coupling are the policy&apos;s - see the Density page.</td></tr>
            <tr><td>every form control - Input · Checkbox · Radio · Switch · Slider · NumberField · OtpField · Field · Fieldset · Form</td><td><strong>Base UI, directly</strong></td><td><code>import &#123; Checkbox &#125; from &apos;@base-ui/react/checkbox&apos;</code> - already installed. The environment never changes their contract, so no runtime belongs there.</td></tr>
            <tr><td>Tabs · Accordion · Collapsible · Toast · Progress · Meter · Avatar · ScrollArea · Toggle · Toolbar · Menubar · ContextMenu · PreviewCard · Autocomplete</td><td><strong>Base UI, directly</strong></td><td>same. Tabs scrolling on a narrow screen is CSS, not a contract change.</td></tr>
            <tr><td>cards, badges, section layout, <code>md:flex-row</code></td><td><strong>your CSS</strong></td><td>layout adaptation is a problem CSS already solved. Protean&apos;s &quot;no breakpoints&quot; applies to pattern branches only.</td></tr>
            <tr><td>tables</td><td><strong>HTML + CSS</strong></td><td>a semantic <code>&lt;table&gt;</code> with responsive styling; when the data really wants a card view, that is often ListDetail.</td></tr>
            <tr><td>DatePicker · CommandPalette · charts</td><td><strong>not yet · not yet · out of scope</strong></td><td>DatePicker waits for a Base UI calendar; CommandPalette waits for demand; charts belong to chart libraries.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Mixing them looks like this</h2>
      <pre><code>{`import { Dialog } from 'protean-ui'              // adaptation: the environment decides
import { Field } from '@base-ui/react/field'      // behavior: use it as-is
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
        The dialog opens as a modal on desktop and a sheet on a phone; the form
        inside never knows. The two layers were designed as one body - Protean&apos;s
        backend is Base UI.
      </p>

      <h2>How far the visuals go</h2>
      <p>
        The reference stylesheet (<code>.protean-defaults</code>) chromes the Protean
        roles only. The visuals of everything else are yours - that is what
        style-agnostic means, and it is why teams with a brand have kept rejecting
        design-system bundles. The vocabulary is shareable, though: consume the same
        tokens in your own component CSS and the whole app moves as one.
      </p>
      <pre><code>{`/* your components, same vocabulary */
.my-checkbox {
  min-height: var(--protean-target);   /* shared touch-target discipline */
}
.my-delete-button {
  color: var(--protean-danger);        /* shared danger color */
}`}</code></pre>

      <h2>Why this shape</h2>
      <div className="callout">
        <strong>Coupling does not grow.</strong> Protean is not a parallel ecosystem
        competing with Base UI - it is one layer on top of it. Adopting it adds no
        new camp to your dependency graph, and leaving is cheap: remove the role
        components and a plain Base UI app remains. Easy in, easy out - by design.
      </div>
    </div>
  )
}
