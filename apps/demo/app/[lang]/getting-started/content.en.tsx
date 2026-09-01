import Link from 'next/link'

export default function GettingStartedPage() {
  return (
    <div className="doc">
      <h1>Getting started</h1>
      <p className="lede">
        Protean is pre-alpha and not yet published to npm. Today it is consumed from the
        repository; the packages are plain TypeScript sources compiled by your bundler.
      </p>

      <h2>Install</h2>
      <pre><code>{`git clone https://github.com/tjk1150/protean-ui
# in your app:
npm install ../protean-ui/packages/core ../protean-ui/packages/react @base-ui/react`}</code></pre>
      <p>
        Next.js needs to transpile the linked sources, and - while the packages are
        file-linked rather than published - <code>@base-ui/react</code> should resolve to
        your app&apos;s copy so only one React instance exists:
      </p>
      <pre><code>{`// next.config.ts
const nextConfig = {
  transpilePackages: ["@protean-ui/react", "@protean-ui/core"],
  turbopack: {
    resolveAlias: {
      "@base-ui/react": "./node_modules/@base-ui/react",
      "@base-ui/react/*": "./node_modules/@base-ui/react/*",
    },
  },
};`}</code></pre>
      <div className="callout">
        Both workarounds disappear once the packages are published: a normal npm install
        resolves a single React and ships compiled output.
      </div>

      <h2>First component</h2>
      <p>No provider is required - the app-first defaults apply out of the box:</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>Edit shipping address</Dialog.Trigger>
  <Dialog.Content title="Edit shipping address">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        On a phone this form opens fullscreen; in a desktop window it is a centered
        modal; the decision happens the moment it opens, so the server never renders it
        wrong.
      </p>

      <h2>Style it</h2>
      <p>
        Protean imposes no visual language, but it ships a reference stylesheet you can
        import as-is, override token by token, or copy wholesale:
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <pre><code>{`/* rebind the palette */
:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

/* reshape one presentation - values hang off the presentation, not the viewport */
[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>
        The file has one governing principle: <strong>values follow the presentation,
        never the viewport</strong>. A sheet rounds only its top corners, a fullscreen
        surface has none, a modal keeps all four - the radius changes because the role
        changed, not because the window narrowed. Everything sits in{' '}
        <code>@layer protean</code>, so any unlayered rule you write wins automatically.
      </p>

      <h2>Own the policy</h2>
      <p>
        When you want different conventions, the policy is a file in your repository, not
        a hidden constant:
      </p>
      <pre><code>{`// protean.config.ts
import { appFirst, definePolicy } from "@protean-ui/react";

export const policy = definePolicy({
  extends: appFirst,
  overlay: ({ traits, role, defaults }) =>
    role === "form" && traits.size === "compact" ? "sheet" : defaults(),
});`}</code></pre>
      <pre><code>{`import { ProteanProvider } from "@protean-ui/react";
import { policy } from "./protean.config";

<ProteanProvider policy={policy}>{children}</ProteanProvider>`}</code></pre>

      <h2>Escape hatches, in trait language</h2>
      <p>Overrides never speak pixels. Three levels, nearest wins:</p>
      <pre><code>{`// 1. force one instance
<Dialog.Root presentation="sheet" />

// 2. override per size class
<Dialog.Root presentation={{ compact: "fullscreen" }} />

// 3. change the project policy in protean.config.ts`}</code></pre>
      <p>
        Every decision is stamped on the DOM as <code>data-presentation</code>, and{' '}
        <code>explain(decision)</code> renders the reasoning:{' '}
        <code>overlay(form) -&gt; fullscreen [pack:app-first] size=compact input=touch</code>.
      </p>

      <p>
        Next: <Link href="/en/concepts/traits-and-policy">how traits and policies work</Link>.
      </p>
    </div>
  )
}
