export default function TraitsAndPolicyPage() {
  return (
    <div className="doc">
      <h1>Traits and policy</h1>
      <p className="lede">
        Everything in Protean flows through one pipeline: the environment is measured,
        classified into traits, and a pure policy function maps traits plus a semantic
        role to a presentation.
      </p>

      <h2>Traits</h2>
      <p>
        Pixels exist in exactly one place - the classifier. Application code and policies
        only ever see named traits:
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Trait</th><th>Values</th><th>Derived from</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>compact (&lt;600px) · medium (600-840) · expanded (&gt;840)</td>
              <td>window width, Material window-size-class aligned, thresholds configurable</td>
            </tr>
            <tr>
              <td>input</td>
              <td>touch · pointer · hybrid</td>
              <td><code>(pointer: coarse)</code> and <code>(hover: hover)</code> media queries</td>
            </tr>
            <tr>
              <td>hover / reducedMotion / virtualKeyboard</td>
              <td>booleans</td>
              <td>media queries and visualViewport</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Size classes carry a 16px hysteresis deadband so resizing across a boundary never
        thrashes. A hybrid device - a touch laptop - keeps pointer-style structure with
        touch-sized targets.
      </p>

      <h2>Why two axes</h2>
      <p>
        Width alone cannot distinguish a phone from a narrowed desktop window, and those
        deserve different UX: the phone gets a thumb-oriented bottom sheet, the desktop
        window gets a small centered modal. Every width-only recipe (including the
        popular manual ones) collapses these cases; the two-axis trait model is the
        reason Protean does not.
      </p>

      <h2>The policy pipeline</h2>
      <pre><code>{`EnvironmentSnapshot  -- matchMedia, resize, visualViewport
      |
resolveTraits()      -- the only place pixels exist
      |
decideOverlay(policy, traits, role, instanceOverride?)
      |
Decision { presentation, source, policyName, traits }`}</code></pre>
      <p>
        Decisions are plain serializable values. That single design choice is what makes
        them testable in isolation, computable during server rendering, and explainable
        in devtools.
      </p>

      <h2>The app-first pack</h2>
      <p>
        The default policy is not taste - it encodes documented platform convention
        (Material navigation guidance, HIG overlay patterns):
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>Role</th><th>compact + touch</th><th>everything else</th></tr>
          </thead>
          <tbody>
            <tr><td>overlay: confirmation</td><td>sheet</td><td>modal</td></tr>
            <tr><td>overlay: form</td><td>fullscreen</td><td>modal</td></tr>
            <tr><td>overlay: contextual</td><td>sheet</td><td>popover</td></tr>
            <tr><td>navigation</td><td>bar (drawer for pointer)</td><td>rail at medium, sidebar at expanded</td></tr>
            <tr><td>primaryAction</td><td>action-bar (sticky-footer for pointer)</td><td>inline</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Overriding</h2>
      <p>Three levels, nearest wins, all in trait language:</p>
      <ol>
        <li>Instance: <code>presentation=&quot;sheet&quot;</code> or <code>presentation=&#123;&#123; compact: &quot;fullscreen&quot; &#125;&#125;</code></li>
        <li>Project: <code>definePolicy(&#123; extends: appFirst, overlay: ... &#125;)</code> in your repository</li>
        <li>Pack: swap or author a policy pack entirely</li>
      </ol>
      <p>
        A project override receives <code>defaults()</code> so it can delegate; the
        decision trace records whether the pack, the policy, or the instance made the
        call, and <code>explain()</code> prints it.
      </p>
    </div>
  )
}
