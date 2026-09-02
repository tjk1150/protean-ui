import Link from 'next/link'

export default function GettingStartedPage() {
  return (
    <div className="doc">
      <h1>Start in 10 minutes</h1>
      <p className="lede">
        Ten minutes to your first adaptive dialog. Pre-alpha, but published to npm -
        install is one line.
      </p>

      <h2>1. Install</h2>
      <pre><code>{`npm install @protean-ui/react`}</code></pre>
      <p>
        Base UI, which owns the behavior, comes along. Compiled files and types ship
        in the package, so no bundler or Next.js configuration is needed. This package
        is the one official entry point - install, imports, and the stylesheet all
        share one name, so there is nothing to mix up.
      </p>
      <div className="callout">
        <strong>On versions:</strong> this is <code>0.1.0-alpha.x</code>. APIs move
        without notice - pin your version before relying on it.
      </div>

      <h2>2. Your first dialog</h2>
      <p>Nothing to configure - import it and the default rules apply.</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>When the button is pressed:</p>
      <ol>
        <li>The current environment is read - screen size plus input method.</li>
        <li>The rules apply: &quot;an input form on a phone opens fullscreen; otherwise a modal.&quot;</li>
        <li>It opens in that presentation, with focus, ESC, and accessibility wired.</li>
      </ol>
      <p>
        While open, it keeps its presentation even if the window resizes - UI that
        morphs mid-use is disorienting. It decides again the next time it opens.
      </p>

      <h2>3. Style it</h2>
      <p>
        Protean imposes no visual language, but it ships a reference stylesheet. One
        import and popups such as dialogs look presentable right away:
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <p>
        The components that shape the page skeleton (Screen, Navigation, Actions and
        friends) need one more thing: a <code>protean-defaults</code> class on an
        ancestor. Their default look is opt-in so it never collides with your app-wide
        styles.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>With your own design, rebind tokens or copy the file wholesale:</p>
      <pre><code>{`/* rebind the palette */
:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

/* reshape one presentation - values hang off the presentation */
[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>
        The file has one governing principle:{' '}
        <strong>values follow the presentation, never the viewport.</strong> A sheet
        rounds only its top corners, fullscreen has none, a modal keeps all four. And
        everything sits in <code>@layer</code>, so any unlayered CSS you write wins.
      </p>
      <p>
        Teams that want to own every structural rule can take the vocabulary alone:{' '}
        <code>@protean-ui/css/tokens.css</code> carries the token contract only -
        per-presentation shape, padding, and motion, plus global color, scrim, danger,
        and tap-target values. Import it and write the rest yourself.
      </p>

      <h2>That is the whole start</h2>
      <p>
        Resize the window; press the same button on desktop and on a phone. When the
        default rules do not fit your product, you can bring the rules into a project
        file and change them - read{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link> first,
        then <Link href="/en/guides/customize-decisions">Customize the decisions</Link>.
      </p>
    </div>
  )
}
