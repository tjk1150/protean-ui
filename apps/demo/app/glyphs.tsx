export function Glyph({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
