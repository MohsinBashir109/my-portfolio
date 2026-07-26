import { useMemo, useState } from 'react'
import { relatedTo, WORK, type Project } from '../lib/data'
import { Chip, FigureSlot, Reveal, SECTION, SectionHead } from './ui'

type Mode = 'TYPE' | 'INDUSTRY' | 'SKILL'
const MODES: Mode[] = ['TYPE', 'INDUSTRY', 'SKILL']

function filterValues(mode: Mode): string[] {
  const uniq = (a: string[]) => ['ALL', ...Array.from(new Set(a))]
  if (mode === 'INDUSTRY') return uniq(WORK.map((p) => p.industry))
  if (mode === 'SKILL') return uniq(WORK.flatMap((p) => p.skills))
  return uniq(WORK.map((p) => p.type))
}

function matches(p: Project, mode: Mode, val: string): boolean {
  if (val === 'ALL') return true
  if (mode === 'INDUSTRY') return p.industry === val
  if (mode === 'SKILL') return p.skills.includes(val)
  return p.type === val
}

function BeforeAfter({ p }: { p: Project }) {
  const [pct, setPct] = useState(50)
  return (
    <div className="relative h-[clamp(250px,34vw,330px)] select-none overflow-hidden border border-ink">
      <div className="absolute inset-0 bg-ink text-paper">
        <div className="absolute bottom-0 left-0 top-0 flex w-[min(50%,420px)] flex-col justify-center gap-2.5 p-[clamp(16px,2.5vw,28px)]">
          <span className="font-mono text-[9.5px] tracking-[.2em] text-paper-soft">BEFORE</span>
          <span className="stretch-x text-[clamp(.95rem,1.8vw,1.3rem)] font-extrabold uppercase leading-[1.1]">
            {p.ba.beforeTitle}
          </span>
          <ul className="m-0 mt-1 flex list-none flex-col gap-[7px] p-0">
            {p.ba.before.map((pt) => (
              <li key={pt} className="font-mono text-[10.5px] tracking-[.1em] text-paper-soft">
                × {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute inset-0 bg-accent text-paper" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <div className="absolute bottom-0 right-0 top-0 flex w-[min(50%,420px)] flex-col items-end justify-center gap-2.5 p-[clamp(16px,2.5vw,28px)] text-right">
          <span className="font-mono text-[9.5px] tracking-[.2em] opacity-75">AFTER</span>
          <span className="stretch-x text-[clamp(.95rem,1.8vw,1.3rem)] font-extrabold uppercase leading-[1.1]">
            {p.ba.afterTitle}
          </span>
          <ul className="m-0 mt-1 flex list-none flex-col items-end gap-[7px] p-0">
            {p.ba.after.map((pt) => (
              <li key={pt} className="font-mono text-[10.5px] tracking-[.1em]">
                + {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-paper" style={{ left: `${pct}%` }} />
      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper font-mono text-xs text-ink shadow-[0_2px_12px_rgba(0,0,0,.35)]"
        style={{ left: `${pct}%` }}
      >
        ◂▸
      </div>
      <input
        type="range"
        min={10}
        max={90}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

function ViewerRule({ label, note }: { label: string; note?: string }) {
  return (
    <div className="mb-3.5 mt-[clamp(26px,4vw,40px)] flex items-center gap-[18px]">
      <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">{label}</span>
      <span className="h-px flex-1 bg-line" />
      {note ? <span className="font-mono text-[9.5px] tracking-[.14em] text-ink-faint">{note}</span> : null}
    </div>
  )
}

function CaseViewer({
  p,
  viewed,
  onOpen,
  onClose,
}: {
  p: Project
  viewed: string[]
  onOpen: (id: string) => void
  onClose: () => void
}) {
  const related = useMemo(() => relatedTo(p, viewed), [p, viewed])
  return (
    <div id="case-viewer" className="mt-[clamp(24px,4vh,40px)] border border-ink bg-raised">
      <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 border-b border-line-strong bg-ink px-[clamp(18px,2.5vw,28px)] py-[13px] text-paper">
        <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">CASE FILE — {p.no}</span>
        <span className="font-mono text-[10px] tracking-[.16em] text-paper-soft">{p.status}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto cursor-pointer border border-paper-line bg-transparent px-3.5 py-2 font-mono text-[10.5px] tracking-[.16em] text-paper transition-colors hover:border-accent hover:text-accent"
        >
          CLOSE FILE ✕
        </button>
      </div>

      <div key={p.id} className="anim-case-in p-[clamp(20px,3vw,36px)]">
        <div className="mb-[clamp(20px,3vw,30px)] flex flex-wrap items-baseline gap-x-6 gap-y-2.5">
          <h3 className="stretch-x m-0 flex-1 basis-[320px] text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold uppercase leading-none">
            {p.title}
          </h3>
          <span className="font-mono text-[10.5px] tracking-[.16em] text-ink-faint">
            {p.type} · {p.industry} · {p.year}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[clamp(22px,3vw,36px)]">
          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">CS·01 — OVERVIEW</span>
            <p className="m-0 text-sm leading-[1.7] text-ink-soft [text-wrap:pretty]">{p.long}</p>
            <span className="mt-2 font-mono text-[10.5px] tracking-[.2em] text-accent">CS·02 — BUILD NOTES</span>
            <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
              {p.build.map((b) => (
                <li key={b} className="text-[13.5px] leading-relaxed text-ink-soft">
                  <span className="font-mono text-accent">—</span> {b}
                </li>
              ))}
            </ul>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 self-start border-b border-line-strong pb-0.5 font-mono text-[11px] tracking-[.14em] transition-colors hover:border-accent hover:text-accent"
            >
              GITHUB ↗
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">CS·03 — SCOPE</span>
            <div>
              {p.scope.map((row) => (
                <div key={row.k} className="flex gap-3.5 border-t border-line py-[9px]">
                  <span className="w-24 shrink-0 font-mono text-[10.5px] tracking-[.12em] text-ink-faint">{row.k}</span>
                  <span className="text-[13px] leading-normal">{row.v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-line pt-3">
              {p.skills.map((sk) => (
                <span key={sk} className="border border-line-strong px-2 py-1 font-mono text-[10px] tracking-[.12em]">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 self-start border border-dashed border-line-strong p-[clamp(16px,2vw,22px)]">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">CLIENT NOTE</span>
              <span className="ml-auto border border-line-strong px-[7px] py-[3px] font-mono text-[9px] tracking-[.16em] text-ink-faint">
                AWAITING SIGN-OFF
              </span>
            </div>
            <p className="m-0 text-sm leading-[1.7] text-ink-faint [text-wrap:pretty]">
              “Quote pending — two sentences from the client or PM go here: what shipped, and what it changed for
              the team.”
            </p>
            <span className="font-mono text-[10px] tracking-[.14em] text-ink-faint">— NAME · ROLE, COMPANY</span>
          </div>
        </div>

        <ViewerRule label="CS·04 — GALLERY" note="ADD PNGs TO public/screens/" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(14px,2vw,24px)]">
          {p.gallery.map((shot) => (
            <FigureSlot key={shot.id} {...shot} />
          ))}
        </div>

        <ViewerRule label="CS·05 — BEFORE / AFTER" note="DRAG ◂ ▸ TO COMPARE" />
        <BeforeAfter p={p} />

        <ViewerRule label="CS·06 — RELATED FILES" note="MATCHED ON TYPE · INDUSTRY · STACK" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px border border-line-strong bg-line">
          {related.map(({ p: rp, reason }) => (
            <button
              key={rp.id}
              type="button"
              onClick={() => onOpen(rp.id)}
              className="flex cursor-pointer flex-col gap-[9px] bg-paper p-[18px] text-left transition-colors hover:bg-white"
            >
              <span className="font-mono text-[10px] tracking-[.14em] text-accent">
                {rp.no} · {reason}
              </span>
              <span className="stretch-x text-base font-extrabold uppercase leading-[1.1]">{rp.title}</span>
              <span className="font-mono text-[9.5px] tracking-[.14em] text-ink-faint">
                {rp.type} · {rp.industry} · {rp.year}
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-[.16em]">OPEN FILE →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Work() {
  const [mode, setMode] = useState<Mode>('TYPE')
  const [val, setVal] = useState('ALL')
  const [openId, setOpenId] = useState<string | null>(null)
  const [viewed, setViewed] = useState<string[]>([])

  const filtered = WORK.filter((p) => matches(p, mode, val))
  const current = WORK.find((p) => p.id === openId) ?? null

  const openCase = (id: string) => {
    const closing = openId === id
    setOpenId(closing ? null : id)
    if (!closing) {
      setViewed((v) => (v.includes(id) ? v : [...v, id]))
      requestAnimationFrame(() => {
        const el = document.getElementById('case-viewer')
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 70
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      })
    }
  }

  return (
    <section id="work" data-screen-label="Work showcase" className={SECTION}>
      <SectionHead
        no="02"
        tag="SELECTED WORK"
        title="Proof, not promises."
        intro="Seven case files. Filter the index, open a file — each one carries scope, build notes, a before / after of the workflow it replaced, and related files."
      />

      <Reveal className="mt-[clamp(28px,4vh,40px)]">
        <div className="mb-px border border-line-strong bg-raised px-[clamp(14px,2vw,22px)] py-3.5">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
            <span className="font-mono text-[10px] tracking-[.2em] text-ink-faint">FILTER BY</span>
            <div className="flex gap-1.5">
              {MODES.map((m) => (
                <Chip key={m} label={m} active={mode === m} onClick={() => { setMode(m); setVal('ALL') }} />
              ))}
            </div>
            <span className="ml-auto font-mono text-[10px] tracking-[.18em] text-ink-faint">
              SHOWING 0{filtered.length} / 07
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
            {filterValues(mode).map((v) => (
              <Chip key={v} label={v} variant="accent" active={val === v} onClick={() => setVal(v)} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-px border border-line-strong bg-line">
          {filtered.map((p) => {
            const open = p.id === openId
            const isViewed = viewed.includes(p.id)
            return (
              <article
                key={p.id}
                role="button"
                tabIndex={0}
                aria-label={`Open case study: ${p.title}`}
                onClick={() => openCase(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openCase(p.id)
                  }
                }}
                className={`flex min-h-[210px] cursor-pointer flex-col gap-[13px] p-[clamp(20px,2.6vw,28px)] transition-colors hover:bg-white ${open ? 'bg-raised shadow-[inset_3px_0_0_var(--color-accent)]' : 'bg-paper'}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] tracking-[.14em] text-accent">{p.no}</span>
                  {p.flagship ? (
                    <span className="bg-ink px-[7px] py-[3px] font-mono text-[9px] tracking-[.18em] text-paper">
                      FLAGSHIP
                    </span>
                  ) : null}
                  {isViewed && !open ? (
                    <span className="ml-auto font-mono text-[9px] tracking-[.16em] text-ink-faint">● REVIEWED</span>
                  ) : null}
                </div>
                <h3 className="stretch-x m-0 text-[clamp(1.15rem,2.2vw,1.45rem)] font-extrabold uppercase leading-[1.05] tracking-[.01em]">
                  {p.title}
                </h3>
                <span className="font-mono text-[10px] tracking-[.16em] text-ink-faint">
                  {p.type} · {p.industry} · {p.year}
                </span>
                <p className="m-0 text-[13.5px] leading-relaxed text-ink-soft [text-wrap:pretty]">{p.desc}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {p.skills.slice(0, 3).map((sk) => (
                    <span key={sk} className="border border-line px-[7px] py-[3px] font-mono text-[9.5px] tracking-[.1em]">
                      {sk}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-line pt-3">
                  <span className={`font-mono text-[10.5px] tracking-[.16em] ${open ? 'text-accent' : ''}`}>
                    {open ? 'FILE OPEN — CLOSE ▾' : 'OPEN CASE FILE →'}
                  </span>
                  <span className="font-mono text-[10px] tracking-[.14em] text-ink-faint">{p.year}</span>
                </div>
              </article>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-wrap items-center gap-4 border border-dashed border-line-strong border-t-0 p-8">
            <span className="font-mono text-xs tracking-[.16em] text-ink-faint">NO FILES MATCH THIS FILTER.</span>
            <button
              type="button"
              onClick={() => setVal('ALL')}
              className="cursor-pointer border-0 bg-ink px-4 py-2.5 font-mono text-[11px] tracking-[.14em] text-paper transition-colors hover:bg-accent"
            >
              RESET ×
            </button>
          </div>
        ) : null}
      </Reveal>

      {current ? (
        <CaseViewer p={current} viewed={viewed} onOpen={openCase} onClose={() => setOpenId(null)} />
      ) : null}
    </section>
  )
}
