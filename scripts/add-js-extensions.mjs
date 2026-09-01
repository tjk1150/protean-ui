// tsc emits the extensionless relative specifiers the sources use (a
// Turbopack dev-linking constraint), but published ESM must carry explicit
// .js extensions for Node resolution. This rewrites every relative
// import/export specifier in the built output, .d.ts files included.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dir = process.argv[2] ?? 'dist'
const specifier = /(from\s+|import\s*\(\s*|export\s+\*\s+from\s+)(['"])(\.{1,2}\/[^'"]+)\2/g

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(path, entry.name)
      if (entry.isDirectory()) return walk(full)
      return /\.(js|d\.ts)$/.test(entry.name) ? [full] : []
    })
  )
  return files.flat()
}

const files = await walk(dir)
await Promise.all(
  files.map(async (file) => {
    const source = await readFile(file, 'utf8')
    const next = source.replace(specifier, (match, lead, quote, spec) =>
      spec.endsWith('.js') ? match : `${lead}${quote}${spec}.js${quote}`
    )
    if (next !== source) await writeFile(file, next)
  })
)
console.log(`add-js-extensions: processed ${files.length} files in ${dir}`)
