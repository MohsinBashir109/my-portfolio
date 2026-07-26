import { useMemo } from 'react'
import { Reveal, SECTION, SectionHead } from './ui'

const WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MO = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const TIMES = ['6:00 PM', '7:30 PM', '9:00 PM']

function nextWeekdays(count: number) {
  const out: { label: string; seed: number }[] = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (out.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      out.push({ label: `${WD[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]}`, seed: d.getDate() + out.length })
    }
    d.setDate(d.getDate() + 1)
  }
  return out
}

export function Book({
  slotKey,
  setSlotKey,
}: {
  slotKey: string | null
  setSlotKey: (k: string | null) => void
}) {
  const days = useMemo(() => nextWeekdays(8), [])

  return (
    <section id="book" data-screen-label="Booking calendar" className={SECTION}>
      <SectionHead
        no="07"
        tag="BOOK"
        title="Book a consult."
        intro="Free, 30 minutes, no pitch — bring the idea, leave with a plan. Times are PKT (UTC+5); evenings overlap US mornings and EU afternoons. A slot is a request until confirmed by email."
      />
      <Reveal className="mt-[clamp(28px,4vh,40px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px border border-line-strong bg-line">
          {days.map((day) => (
            <div key={day.label} className="flex flex-col gap-2 bg-paper p-3.5">
              <span className="border-b border-line pb-1.5 font-mono text-[10.5px] font-bold tracking-[.14em]">
                {day.label}
              </span>
              {TIMES.map((t, si) => {
                const taken = (day.seed + si * 2) % 3 === 1
                const key = `${day.label} · ${t}`
                const selected = slotKey === key
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={taken}
                    onClick={() => setSlotKey(selected ? null : key)}
                    className={`box-border min-h-[38px] w-full px-2 py-2.5 font-mono text-[10.5px] tracking-[.1em] transition-colors ${
                      taken
                        ? 'cursor-not-allowed border border-dashed border-line text-ink/35 line-through'
                        : selected
                          ? 'cursor-pointer border border-accent bg-accent text-paper'
                          : 'cursor-pointer border border-line-strong bg-transparent text-ink hover:border-accent hover:text-accent'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-[22px] gap-y-2">
          <span className="font-mono text-[9.5px] tracking-[.14em] text-ink-faint">□ AVAILABLE</span>
          <span className="font-mono text-[9.5px] tracking-[.14em] text-ink/40 line-through">TAKEN</span>
          <span className="font-mono text-[9.5px] tracking-[.14em] text-accent">■ SELECTED</span>
        </div>
        {slotKey ? (
          <div className="anim-case-in mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border border-accent bg-raised px-[clamp(16px,2.5vw,24px)] py-4">
            <span className="font-mono text-[11px] tracking-[.16em] text-accent">CONSULT — {slotKey} PKT</span>
            <div className="ml-auto flex flex-wrap gap-2.5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-ink px-4 py-[11px] font-mono text-[10.5px] tracking-[.14em] text-paper transition-colors hover:bg-accent"
              >
                ADD TO INQUIRY ↓
              </a>
              <button
                type="button"
                onClick={() => setSlotKey(null)}
                className="cursor-pointer border border-line-strong bg-transparent px-4 py-[11px] font-mono text-[10.5px] tracking-[.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                CLEAR ×
              </button>
            </div>
          </div>
        ) : null}
      </Reveal>
    </section>
  )
}
