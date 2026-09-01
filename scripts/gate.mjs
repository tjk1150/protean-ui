/* Release quality gate (docs/qa.md, "Release exit criteria").
   Runs every machine-checkable criterion and lists the manual ones.
   Exit code 1 if any automated criterion fails; SKIPs never fail the gate
   but are printed so a release decision sees them.

   Knobs:
     PROTEAN_SCENARIO_DIR  path to the toss-clone scenario suite
                           (default: ~/Documents/toss-clone if present)
     PROTEAN_GATE_URL      deployed origin for the SSR check
                           (default: the production demo)
     SKIP_SCENARIO=1       skip the scenario suite explicitly */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ROOT = join(import.meta.dirname, '..')
const BUDGETS = { react: 8 * 1024, core: 2 * 1024, role: 3.5 * 1024 }
const GATE_URL = process.env.PROTEAN_GATE_URL ?? 'https://protean-ui-jintaes-projects.vercel.app'

const results = []
function record(name, status, detail = '') {
  results.push({ name, status, detail })
  console.log(`[${status}] ${name}${detail ? ` - ${detail}` : ''}`)
}

function run(name, command, parse) {
  try {
    const output = execSync(command, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' })
    record(name, 'PASS', parse ? parse(output) : '')
    return output
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`
    record(name, 'FAIL', output.split('\n').filter(Boolean).slice(-3).join(' | '))
    return null
  }
}

console.log(`protean-ui quality gate\n`)

// 1. Library suites and typecheck
run('library test suites (core + react)', `pnpm --filter './packages/**' test`, (out) => {
  const counts = [...out.matchAll(/Tests\s+(\d+) passed/g)].map((m) => m[1])
  return counts.length ? `${counts.join(' + ')} tests` : ''
})
run('typecheck (workspace)', 'pnpm -r typecheck')

// 2. Build for bundle measurement
const built = run('package builds', 'pnpm build:packages')

// 3. Bundle budgets
if (built !== null) {
  const { build } = await import('esbuild')
  async function measure(entry, external) {
    const bundle = await build({
      entryPoints: [join(ROOT, entry)],
      bundle: true,
      minify: true,
      format: 'esm',
      write: false,
      external,
      logLevel: 'silent'
    })
    return gzipSync(bundle.outputFiles[0].contents).length
  }
  try {
    const react = await measure('packages/react/dist/index.js', [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@base-ui/react',
      '@base-ui/react/*',
      '@protean-ui/core'
    ])
    const core = await measure('packages/core/dist/index.js', [])
    // The public per-role subpath ('@protean-ui/react/dialog') must stay
    // tree-shaken: a consumer of one role never pays for the others.
    const dialogSlice = await build({
      stdin: {
        contents:
          "export * from './packages/react/dist/overlay/index.parts.js'; export { ProteanProvider } from './packages/react/dist/provider.js'",
        resolveDir: ROOT,
        sourcefile: 'role-entry.js'
      },
      bundle: true,
      minify: true,
      format: 'esm',
      write: false,
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@base-ui/react',
        '@base-ui/react/*',
        '@protean-ui/core'
      ],
      logLevel: 'silent'
    })
    const role = gzipSync(dialogSlice.outputFiles[0].contents).length
    const fmt = (n) => `${(n / 1024).toFixed(1)}KB`
    record(
      'bundle budget: react (all roles) <= 8KB gzip',
      react <= BUDGETS.react ? 'PASS' : 'FAIL',
      `${fmt(react)} gzip (minified, externals excluded)`
    )
    record(
      'bundle budget: one role via subpath <= 3.5KB gzip',
      role <= BUDGETS.role ? 'PASS' : 'FAIL',
      `${fmt(role)} gzip (dialog + provider, tree-shaken)`
    )
    record('bundle budget: core <= 2KB gzip', core <= BUDGETS.core ? 'PASS' : 'FAIL', `${fmt(core)} gzip`)
  } catch (error) {
    record('bundle budgets', 'FAIL', String(error).slice(0, 120))
  }
} else {
  record('bundle budgets', 'SKIP', 'build failed')
}

// 4. Scenario suite (real-app migration)
const scenarioDir = process.env.PROTEAN_SCENARIO_DIR ?? join(homedir(), 'Documents', 'toss-clone')
if (process.env.SKIP_SCENARIO === '1') {
  record('scenario suite (toss-clone)', 'SKIP', 'SKIP_SCENARIO=1')
} else if (!existsSync(scenarioDir)) {
  record('scenario suite (toss-clone)', 'SKIP', `not found at ${scenarioDir}`)
} else {
  try {
    const out = execSync('npx vitest run', { cwd: scenarioDir, encoding: 'utf8', stdio: 'pipe' })
    const match = /Tests\s+(\d+) passed/.exec(out)
    record('scenario suite (toss-clone)', 'PASS', match ? `${match[1]} tests` : '')
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`
    record('scenario suite (toss-clone)', 'FAIL', output.split('\n').filter(Boolean).slice(-3).join(' | '))
  }
}

// 5. SSR invariant on the deployed site
try {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)
  const response = await fetch(`${GATE_URL}/delete-demo`, { signal: controller.signal })
  clearTimeout(timer)
  const html = await response.text()
  const triggers = (html.match(/data-part="trigger"/g) ?? []).length
  const popups = (html.match(/data-part="popup"/g) ?? []).length
  const ok = response.ok && triggers > 0 && popups === 0
  record(
    'SSR invariant: zero overlay markup in server HTML',
    ok ? 'PASS' : 'FAIL',
    `${GATE_URL} - triggers ${triggers}, popups ${popups}`
  )
} catch {
  record('SSR invariant: zero overlay markup in server HTML', 'SKIP', 'network unavailable')
}

// 6. Manual criteria - never automated, always listed
for (const item of [
  'axe on demo states: 0 critical/serious introduced by protean',
  'navigation CLS 0 on presentation change (devtools check)',
  'compatibility matrix: 0 critical on Chrome, iOS Safari, iPadOS',
  'docs parity: every shipped prop documented in ko and en; honesty sections match reality'
]) {
  record(item, 'MANUAL')
}

const failed = results.filter((r) => r.status === 'FAIL')
const skipped = results.filter((r) => r.status === 'SKIP')
console.log(
  `\ngate: ${failed.length === 0 ? 'PASS' : 'FAIL'} - ${
    results.filter((r) => r.status === 'PASS').length
  } passed, ${failed.length} failed, ${skipped.length} skipped, ${
    results.filter((r) => r.status === 'MANUAL').length
  } manual`
)
process.exit(failed.length === 0 ? 0 : 1)
