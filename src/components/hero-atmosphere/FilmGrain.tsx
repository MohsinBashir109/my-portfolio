type Props = { className?: string }

/** Ultra-subtle film grain; hidden when the user prefers reduced motion. */
export function FilmGrainOverlay({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-[0.038] motion-reduce:hidden ${className}`}
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }}
    />
  )
}
