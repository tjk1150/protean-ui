import Link from 'next/link'

export default function CustomizeDecisionsPage() {
  return (
    <div className="doc">
      <h1>Customize the decisions</h1>
      <p className="lede">
        What to do when the default rules do not fit your product. There are three
        layers, and the nearest one wins: this one screen → your project rules → the
        whole rule set. All three speak environment names, not pixels.
      </p>

      <h2>1. Just this one screen</h2>
      <p>Override directly on the component:</p>
      <pre><code>{`// always open as a bottom sheet
<Dialog.Root presentation="sheet" />

// fullscreen on small screens only
<Dialog.Root presentation={{ compact: "fullscreen" }} />`}</code></pre>

      <h2>2. Project rules</h2>
      <p>
        To change a convention product-wide, put a rules file in your repository -
        like a Tailwind config, the team&apos;s decision lives in code.
      </p>
      <pre><code>{`// protean.config.ts
import { appFirst, definePolicy } from "@protean-ui/react";

export const policy = definePolicy({
  extends: appFirst, // start from the defaults
  overlay: ({ traits, role, defaults }) =>
    // compact input forms open as a sheet instead of fullscreen
    role === "form" && traits.size === "compact" ? "sheet" : defaults(),
});`}</code></pre>
      <pre><code>{`// wrap once at the app root
import { ProteanProvider } from "@protean-ui/react";
import { policy } from "./protean.config";

<ProteanProvider policy={policy}>{children}</ProteanProvider>`}</code></pre>
      <p>
        Calling <code>defaults()</code> defers everything else to the default rules,
        so you write only the one thing you want changed.
      </p>

      <h2>3. Replace the rule set</h2>
      <p>
        Skip <code>extends: appFirst</code> and you can build a rule set with entirely
        different conventions - and publish it as an org package so several projects
        share it.
      </p>

      <h2>When you wonder why it opened that way</h2>
      <p>
        Every decision lands on the DOM as <code>data-presentation</code>, and dev
        mode prints the reasoning - including who decided (defaults · project rules ·
        per-instance).
      </p>
      <pre><code>{`[protean] overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`}</code></pre>

      <h2>The inputs: traits</h2>
      <p>
        The <code>traits</code> object your rules receive is the current environment
        distilled into a few names. Rules and overrides speak only these names - pixel
        numbers exist in one classification step only.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Trait</th><th>Values</th><th>How it is decided</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>compact (below 600px) · medium (600 to below 840px) · expanded (840px and up)</td>
              <td>window width - the same buckets as Android&apos;s window size classes; the thresholds are configurable on <code>ProteanProvider</code>.</td>
            </tr>
            <tr>
              <td>input</td>
              <td>touch · pointer · hybrid</td>
              <td>from the browser&apos;s <code>pointer</code>/<code>hover</code> media queries.</td>
            </tr>
            <tr>
              <td>others</td>
              <td>hover · reducedMotion · virtualKeyboard</td>
              <td>hover capability, the reduce-motion preference, whether the on-screen keyboard is up.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Near a boundary, the class only flips after crossing it by more than 16px, so
        fine resizing never makes the UI shiver. Hybrid devices (touch laptops) are
        judged as pointer for patterns. Why size and input are read together is
        covered in{' '}
        <Link href="/en/concepts/pattern-adaptation">Pattern adaptation</Link> - a
        narrow desktop window is not a phone.
      </p>

      <h2>The default rules: app-first</h2>
      <p>
        The defaults are not taste - they transcribe conventions iOS and Android apps
        have already validated.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Role</th><th>Small screen + touch</th><th>Everything else</th></tr>
          </thead>
          <tbody>
            <tr><td>Dialog: confirmation</td><td>bottom sheet</td><td>modal</td></tr>
            <tr><td>Dialog: form</td><td>fullscreen</td><td>modal</td></tr>
            <tr><td>Dialog: contextual</td><td>bottom sheet</td><td>popover</td></tr>
            <tr><td>Navigation</td><td>bottom tab bar (drawer with a mouse)</td><td>rail at medium, sidebar at expanded</td></tr>
            <tr><td>Primary action</td><td>fixed bottom bar (sticky footer with a mouse)</td><td>inline</td></tr>
            <tr><td>Density</td><td colSpan={2}>touch reads touch, a mouse reads comfortable - at every size. See <Link href="/en/concepts/density">Density</Link></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
