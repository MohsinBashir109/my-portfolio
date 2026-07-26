import { MAILTO } from '../lib/data'

const LINKS = [
  { no: '01', label: 'CAPABILITIES', href: '#capabilities' },
  { no: '02', label: 'WORK', href: '#work' },
  { no: '03', label: 'ESTIMATE', href: '#estimate' },
  { no: '07', label: 'BOOK', href: '#book' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 px-[clamp(20px,4.5vw,56px)] py-3.5">
        <a href="#top" className="flex min-h-[30px] items-baseline gap-2.5">
          <span className="stretch-x text-[15px] font-extrabold uppercase tracking-[.02em]">Mohsin Bashir</span>
          <span className="font-mono text-[10px] tracking-[.16em] text-ink-faint">RN — FULL-STACK</span>
        </a>
        <nav aria-label="Primary" className="ml-auto flex flex-wrap items-center gap-x-[18px] gap-y-1">
          {LINKS.map((l) => (
            <a
              key={l.no}
              href={l.href}
              className="py-2 font-mono text-[11px] tracking-[.14em] transition-colors hover:text-accent"
            >
              <span className="text-accent">{l.no}</span> {l.label}
            </a>
          ))}
          <a
            href={MAILTO}
            className="bg-ink px-4 py-2.5 font-mono text-[11px] tracking-[.14em] text-paper transition-colors hover:bg-accent"
          >
            HIRE ME →
          </a>
        </nav>
      </div>
    </header>
  )
}
