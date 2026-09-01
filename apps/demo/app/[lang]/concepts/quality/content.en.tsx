export default function QualityPage() {
  return (
    <div className="doc">
      <h1>Quality and testing</h1>
      <p className="lede">
        How this library decides that it works. The frame is borrowed from the
        standards: what quality means (ISO/IEC 25010), how to test for it
        (ISO/IEC/IEEE 29119), and what passing means (the release gate).
      </p>

      <h2>How it is tested</h2>
      <p>
        Suites are derived from named design techniques rather than intuition - each
        technique dictates exactly which points must be covered.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Technique</th><th>In Protean</th></tr></thead>
          <tbody>
            <tr><td>Decision table</td><td>the app-first pack verified as an exhaustive 63-cell table - 3 overlay roles x 3 sizes x 3 inputs, plus navigation, primary action, hint, and list-detail. Editing the policy means consciously editing the table; the table is the documentation.</td></tr>
            <tr><td>Boundary value analysis</td><td>size thresholds (599/600, 839/840), hysteresis in both directions (583/584, 615/616, 823/824, 855/856), the keyboard threshold (649/650), bar capacity (5/6) - one pixel on each side of every boundary.</td></tr>
            <tr><td>State transition</td><td>decision pinned while open, re-decided at the next open; drawers and overflow panels closing when their presentation leaves.</td></tr>
            <tr><td>Negative</td><td>double-clicked triggers, values missing from items, unmeasurable boundaries, browsers without visualViewport - odd usage must not break anything.</td></tr>
            <tr><td>Scenario</td><td>a real 24-screen app migration that keeps its 699 existing tests green - the end-to-end basis.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>The pass line: the release gate</h2>
      <p>
        Every version published to npm passes one command - <code>pnpm gate</code>.
        Machine-checkable criteria run automatically; human ones print as a checklist.
      </p>
      <ul>
        <li>100% of library tests (currently 218) plus a clean workspace typecheck</li>
        <li>all 63 decision-table cells - one wrong cell is a blocked release, not a statistic</li>
        <li>the 699-test real-app scenario suite green</li>
        <li>bundle budgets: all roles under 8KB gzip (6.6 today); one role via its public subpath under 3.5KB tree-shaken (3.0 today - shakeability is a contract); core under 2KB (1.2)</li>
        <li>zero overlay markup in the deployed site&apos;s server HTML (measured with curl)</li>
        <li>manual checklist: axe, CLS 0, the browser matrix, docs-match-reality</li>
      </ul>
      <div className="callout">
        <strong>Why no &quot;95% pass rate&quot;?</strong> A wrong decision cell or an
        SSR regression is not the kind of problem a percentage should dilute. A failure
        blocks the release; there are no exceptions.
      </div>

      <h2>Verified so far, and what remains</h2>
      <p>
        Chrome at several widths and real WebKit in the iOS Simulator (the bar and
        overflow panel on iPhone 16 Pro, the rail on iPad Pro) are checked each release.
        macOS Safari and Firefox are spot-checked; Android and physical hardware remain -
        stated as such in the roadmap.
      </p>
    </div>
  )
}
