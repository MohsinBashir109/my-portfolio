import { Reveal, SECTION, SectionHead } from './ui'

const STEPS = [
  { no: 'STEP·01', title: 'Scope', body: 'A short call, then a written scope: screens, endpoints, and estimates in days — not vibes.' },
  { no: 'STEP·02', title: 'Build', body: 'Repo from day one. A build on your phone every week — TestFlight or APK — and PRs you can actually read.' },
  { no: 'STEP·03', title: 'Ship', body: 'Store submission, review notes, CI. I handle the annoying parts: signing, builds, metadata.' },
  { no: 'STEP·04', title: 'Support', body: '30 days of fixes after launch, included. After that — a monthly retainer if you want a hand on call.' },
]

export function Process() {
  return (
    <section id="process" data-screen-label="Process" className={SECTION}>
      <SectionHead no="04" tag="PROCESS" title="How a project runs." />
      <Reveal className="mt-[clamp(32px,5vh,52px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {STEPS.map((s) => (
            <div key={s.no} className="flex flex-col gap-3 border-t-2 border-ink pt-4">
              <span className="font-mono text-[11px] tracking-[.18em] text-accent">{s.no}</span>
              <h3 className="stretch-x m-0 text-lg font-extrabold uppercase">{s.title}</h3>
              <p className="m-0 text-[13.5px] leading-[1.65] text-ink-soft [text-wrap:pretty]">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
