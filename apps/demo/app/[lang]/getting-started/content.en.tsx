import Link from 'next/link'

export default function GettingStartedPage() {
  return (
    <div className="doc">
      <h1>Get started in 10 minutes</h1>
      <p className="lede">
        You can have your first adaptive Dialog running in about 10 minutes.
        Protean is still pre-alpha, but it is published on npm and installs like
        a normal React package.
      </p>

      <h2>1. Install</h2>
      <pre><code>{`npm install @protean-ui/react`}</code></pre>
      <p>
        Base UI, which provides the underlying interaction primitives, is
        installed as a dependency. Protean ships its JavaScript and TypeScript
        declarations with the package, so a typical React app does not need
        special bundler configuration just to get started. This package is the
        entry point for components, utilities, and the reference stylesheet.
      </p>
      <div className="callout">
        <strong>About the version:</strong> Protean is currently in{' '}
        <code>0.1.0-alpha.x</code>. APIs may change before <code>0.1.0</code>, so
        pin the version before using it in a product.
      </div>

      <h2>2. Open your first Dialog</h2>
      <p>
        There is no policy setup required for the default behavior. Import the
        component and use it directly.
      </p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>When the trigger is pressed, Protean:</p>
      <ol>
        <li>reads the current environment when the Dialog opens,</li>
        <li>combines that environment with the Dialog&apos;s role,</li>
        <li>chooses a presentation and opens the matching interaction pattern.</li>
      </ol>
      <p>With the default policy, a form Dialog behaves like this:</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Environment</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>compact + touch</td><td>Fullscreen</td></tr>
            <tr><td>otherwise</td><td>Modal</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The selected presentation brings the interaction behavior that belongs to
        it, including focus management, Escape dismissal, and accessibility
        wiring. By default, the presentation stays{' '}
        <strong>pinned while the Dialog is open</strong>: if the window changes
        size halfway through a form, the Dialog does not suddenly switch.
        Protean checks the environment again the next time it opens.
      </p>

      <h2>3. Add the reference styles</h2>
      <p>
        Protean does not require a particular visual design, but it includes a
        reference stylesheet so you can see the components working immediately.
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <p>
        For popup components such as Dialog, importing the stylesheet is enough
        to get the reference appearance. Page-level layout helpers are
        intentionally opt-in: <code>Screen</code>, <code>Navigation</code>,{' '}
        <code>PrimaryAction</code>, <code>Actions</code>, and{' '}
        <code>SupportingPane</code> use reference layout rules under{' '}
        <code>protean-defaults</code>. If you want those layouts too, add the
        class to an app-level wrapper:
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>
        This keeps Protean&apos;s page-level reference layout from silently
        taking over an existing application.
      </p>
      <div className="callout">
        <strong>Dialog does not require <code>protean-defaults</code>.</strong>{' '}
        The class is only for the opt-in page and layout reference rules.
      </div>

      <h2>Use your own design system</h2>
      <p>
        The reference stylesheet is a starting point, not a required theme. If
        your product already has design tokens, connect them to Protean&apos;s:
      </p>
      <pre><code>{`:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

/* customize one presentation */
[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>
        The important boundary:{' '}
        <strong>Protean chooses the presentation. CSS owns its visual
        expression.</strong> A sheet, a fullscreen surface, and a modal can use
        different shape values because CSS styles the selected presentation
        directly. The reference styles live in the <code>protean</code> cascade
        layer, so normal unlayered application CSS overrides them without
        turning specificity into a contest.
      </p>

      <h2>Want only the token contract?</h2>
      <p>
        If you do not want the reference component styles, import the token
        contract alone and write the rest of the CSS yourself:
      </p>
      <pre><code>{`import "@protean-ui/css/tokens.css";`}</code></pre>
      <p>
        The token contract covers the values Protean expresses - color, shape,
        spacing, motion, and density. The actual layout and styling remain
        entirely yours.
      </p>

      <h2>That&apos;s it</h2>
      <p>
        Try the same Dialog in a wide pointer environment and a small touch
        environment. The application code stays the same while the presentation
        changes. If the default behavior does not match your product, do not
        jump straight into low-level APIs - read{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link>{' '}
        next, then{' '}
        <Link href="/en/guides/customize-decisions">Customizing results</Link>{' '}
        when you are ready to change the defaults.
      </p>
    </div>
  )
}
