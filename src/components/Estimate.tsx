import { useState } from 'react'
import { PERSON } from '../lib/data'
import { Chip, Reveal, SECTION, SectionHead } from './ui'

// ——— Tune your rates here (USD) ———
const TYPES: Record<string, { base: [number, number, number]; weeks: [number, number, number] }> = {
  'MOBILE APP': { base: [3000, 6000, 12000], weeks: [4, 7, 12] },
  'WEB FRONTEND': { base: [2500, 5000, 10000], weeks: [3, 6, 10] },
  'BACKEND / API': { base: [2000, 4000, 8000], weeks: [3, 5, 9] },
  'FULL-STACK': { base: [4500, 9000, 18000], weeks: [6, 10, 16] },
}
const SCOPES = ['MVP', 'STANDARD', 'COMPLEX'] as const
const TIMES: Record<string, { mult: number; wMult: number }> = {
  FLEXIBLE: { mult: 0.9, wMult: 1.15 },
  STANDARD: { mult: 1, wMult: 1 },
  RUSH: { mult: 1.3, wMult: 0.75 },
}
const ADDONS = [
  { label: 'ADMIN PANEL', cost: 1200, weeks: 1 },
  { label: 'PAYMENTS', cost: 900, weeks: 1 },
  { label: 'CHAT / NOTIFICATIONS', cost: 800, weeks: 1 },
  { label: 'CI + STORE RELEASE', cost: 500, weeks: 0 },
]

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export function Estimate() {
  const [type, setType] = useState('MOBILE APP')
  const [scope, setScope] = useState<(typeof SCOPES)[number]>('MVP')
  const [timeline, setTimeline] = useState('STANDARD')
  const [addons, setAddons] = useState<string[]>([])

  const si = SCOPES.indexOf(scope)
  const t = TYPES[type]
  const add = ADDONS.filter((a) => addons.includes(a.label))
  const addCost = add.reduce((s, a) => s + a.cost, 0)
  const addWeeks = add.reduce((s, a) => s + a.weeks, 0)
  const tm = TIMES[timeline]
  const total = (t.base[si] + addCost) * tm.mult
  const low = Math.round((total * 0.85) / 100) * 100
  const high = Math.round((total * 1.2) / 100) * 100
  const weeks = Math.max(2, Math.round((t.weeks[si] + addWeeks) * tm.wMult))

  const body =
    `Spec from your estimate tool:\n\nProject type: ${type}\nScope: ${scope}\nTimeline: ${timeline}\n` +
    `Add-ons: ${addons.length ? addons.join(', ') : 'none'}\n` +
    `Ballpark shown: ${fmt(low)} \u2013 ${fmt(high)} USD \u00b7 ~${weeks} weeks\n\nAbout the project:\n`
  const mailto = `mailto:${PERSON.email}?subject=${encodeURIComponent(`Project inquiry — ${type} (${scope})`)}&body=${encodeURIComponent(body)}`

  const group = (label: string, children: React.ReactNode, hint?: string) => (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[10px] tracking-[.2em] text-ink-faint">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
      {hint ? <span className="font-mono text-[10px] tracking-[.1em] text-ink-faint">{hint}</span> : null}
    </div>
  )

  return (
    <section id="estimate" data-screen-label="Estimate calculator" className={SECTION}>
      <SectionHead
        no="03"
        tag="ESTIMATE"
        title="Price it yourself."
        intro="Pick what you need and get a ballpark before we ever talk. Honest ranges in USD — a real number comes after a scope call."
      />
      <Reveal className="mt-[clamp(28px,4vh,40px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(24px,3.5vw,48px)]">
          <div className="flex flex-col gap-6">
            {group(
              'PROJECT TYPE',
              Object.keys(TYPES).map((k) => <Chip key={k} label={k} active={type === k} onClick={() => setType(k)} />),
            )}
            {group(
              'SCOPE',
              SCOPES.map((s) => <Chip key={s} label={s} active={scope === s} onClick={() => setScope(s)} />),
              'MVP = CORE FLOWS · STANDARD = MVP + POLISH · COMPLEX = MULTI-ROLE, INTEGRATIONS',
            )}
            {group(
              'TIMELINE',
              Object.keys(TIMES).map((k) => (
                <Chip key={k} label={k} active={timeline === k} onClick={() => setTimeline(k)} />
              )),
            )}
            {group(
              'ADD-ONS',
              ADDONS.map((a) => {
                const on = addons.includes(a.label)
                return (
                  <Chip
                    key={a.label}
                    variant="accent"
                    label={`${on ? '×' : '+'} ${a.label}`}
                    active={on}
                    onClick={() => setAddons(on ? addons.filter((x) => x !== a.label) : [...addons, a.label])}
                  />
                )
              }),
            )}
          </div>

          <div className="sticky top-[84px] flex flex-col gap-3.5 border border-ink bg-raised p-[clamp(20px,2.5vw,28px)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">ESTIMATE — BALLPARK</span>
              <span className="ml-auto font-mono text-[10px] tracking-[.14em] text-ink-faint">
                {type} · {scope}
              </span>
            </div>
            <div className="stretch-x text-[clamp(1.7rem,3.6vw,2.7rem)] font-black uppercase leading-none">
              {fmt(low)} — {fmt(high)}
            </div>
            <span className="font-mono text-[11px] tracking-[.16em] text-ink-faint">
              ~{weeks}–{weeks + 2} WEEKS · USD
            </span>
            <div>
              {[
                ['BASE', fmt(t.base[si])],
                ['ADD-ONS', addCost ? `+${fmt(addCost)}` : '—'],
                ['TIMELINE', `${timeline} ×${tm.mult.toFixed(1)}`],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className={`flex justify-between gap-4 border-t border-line py-[9px] ${i === arr.length - 1 ? 'border-b' : ''}`}
                >
                  <span className="font-mono text-[10px] tracking-[.18em] text-ink-faint">{k}</span>
                  <span className="font-mono text-[11.5px]">{v}</span>
                </div>
              ))}
            </div>
            <p className="m-0 font-mono text-[10px] leading-relaxed tracking-[.08em] text-ink-faint">
              BALLPARK, NOT A QUOTE. THE REAL NUMBER COMES AFTER A FREE 30-MIN SCOPE CALL.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={mailto}
                className="inline-flex items-center gap-2.5 bg-ink px-[18px] py-3.5 font-mono text-[11.5px] tracking-[.14em] text-paper transition-colors hover:bg-accent"
              >
                SEND THIS SPEC →
              </a>
              <a
                href="#book"
                className="inline-flex items-center gap-2.5 border border-line-strong px-[18px] py-3.5 font-mono text-[11.5px] tracking-[.14em] transition-colors hover:border-accent hover:text-accent"
              >
                BOOK A CONSULT ↓
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
