export default function StatusPage() {
  return (
    <div className="doc">
      <h1>Quality and support status</h1>
      <p className="lede">
        Figures and support claims drift between releases, so they live on exactly one
        page, with a date. When another page&apos;s number disagrees, this page is
        right.
      </p>
      <div className="callout">
        <strong>As of 2026-09-02, 0.1.0-alpha.9.</strong> Pre-alpha - APIs move
        without notice.
      </div>

      <h2>Measured on that date</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Item</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Library tests</td><td>245 (decision engine 123 + React 122) - all must pass to publish</td></tr>
            <tr><td>Default-rule exhaustion</td><td>a 72-cell decision table - 3 sizes x 3 inputs across 3 overlay roles, navigation, primary action, hint, list-detail, and density</td></tr>
            <tr><td>Real-app scenario</td><td>a 24-screen app&apos;s 699 existing tests all green after migration</td></tr>
            <tr><td>Bundle (gzip, excluding Base UI)</td><td>react 7.1KB whole · 3.1KB for a single role · decision engine 1.3KB - budgets (8 / 3.5 / 2KB) are gate-enforced</td></tr>
            <tr><td>Accessibility scan</td><td>0 violations across navigation presentations and the fullscreen dialog - context on the accessibility page</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How it is tested</h2>
      <p>
        Testing borrows the framing of ISO/IEC 25010 and ISO/IEC/IEEE 29119 and uses
        named techniques: decision-table exhaustion, boundary values (599/600 and
        839/840, anti-shiver in both directions), state transitions (pinned while
        open, re-judged on reopen), negative inputs (double clicks, absent values,
        unmeasurable containers), and the real-app integration scenario.
      </p>
      <p>
        Every version that reaches npm passes one release-gate command - everything in
        the table above plus a workspace typecheck and a curl-measured check that the
        deployed site&apos;s server HTML carries zero overlay markup. One wrong cell
        blocks the release; publishing itself runs from CI on a tag push, with signed
        provenance attached automatically.
      </p>

      <h2>Verified where</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Environment</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Chrome (desktop, several widths)</td><td>checked every release</td></tr>
            <tr><td>Real WebKit in the iOS Simulator - iPhone 16 Pro, iPad Pro</td><td>tab bar, overflow, and rail verified</td></tr>
            <tr><td>macOS Safari · Firefox</td><td>spot-checked - a full pass remains</td></tr>
            <tr><td>Android · physical devices</td><td>not yet - on the roadmap</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Support limits, stated plainly</h2>
      <ul>
        <li>React 18+ is declared and designed for (ref forwarding, for one), but execution testing runs on React 19. If 18 misbehaves, file an issue - reproduction goes first.</li>
        <li>Tablet differentiation in the default pattern rules waits for real usage data - no speculative defaults.</li>
        <li>The virtual keyboard is collected but not yet consulted by the defaults.</li>
        <li>One maintainer today - offset by the gate, CI, and contribution docs, so the project&apos;s state lives in the repository rather than in one head.</li>
      </ul>
      <div className="callout">
        <strong>Why no &quot;95% pass rate&quot;?</strong> A wrong decision cell or a
        server-rendering regression is not a problem percentages may dilute. Failure
        blocks; there are no exceptions.
      </div>
    </div>
  )
}
