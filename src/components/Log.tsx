import { Reveal, SECTION, SectionHead } from './ui'

const ENTRIES = [
  {
    period: 'OCT 2025 — PRESENT',
    org: 'TRANSCURE · LAHORE',
    role: 'Software Engineer — RN / React / Node',
    points: [
      'Production features across MyLera, PharmaPulse, CrickWick: UI, API integration, state-driven flows.',
      'Built the RCM web frontend — claims, denials, payment posting, balance tracking.',
      'Shipped Retailerz end-to-end: auth to admin tools, frontend + backend.',
      'Backend services for StartSmartPlus on Node.js / Express with DB integrations.',
    ],
    tags: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX TOOLKIT', 'REST', 'NODE.JS'],
  },
  {
    period: 'JUL — SEP 2025',
    org: 'TRANSCURE · LAHORE',
    role: 'React Native Intern',
    points: [
      'Cross-platform screens and reusable components on production modules, alongside senior engineers.',
      'Debugging, refactoring, and performance work across API-connected architectures.',
    ],
    tags: [],
  },
]

export function Log() {
  return (
    <section id="log" data-screen-label="Experience log" className={SECTION}>
      <SectionHead no="05" tag="LOG" title="Where I've shipped." />
      <div className="mt-[clamp(32px,5vh,52px)]">
        {ENTRIES.map((e, i) => (
          <Reveal
            key={e.period}
            className={`flex flex-wrap gap-x-[clamp(24px,4vw,56px)] gap-y-4 border-t border-line-strong py-[clamp(20px,3vw,32px)] ${i === ENTRIES.length - 1 ? 'border-b' : ''}`}
          >
            <div className="w-[200px] shrink-0">
              <div className="font-mono text-[11px] tracking-[.16em] text-accent">{e.period}</div>
              <div className="mt-1.5 font-mono text-[10.5px] tracking-[.14em] text-ink-faint">{e.org}</div>
            </div>
            <div className="flex-1 basis-[380px]">
              <h3 className="stretch-x m-0 mb-3 text-lg font-extrabold uppercase">{e.role}</h3>
              <ul className="m-0 flex max-w-[640px] list-none flex-col gap-[9px] p-0">
                {e.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-ink-soft">
                    <span className="font-mono text-accent">—</span> {p}
                  </li>
                ))}
              </ul>
              {e.tags.length ? (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="border border-line-strong px-2 py-1 font-mono text-[10px] tracking-[.12em]">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
