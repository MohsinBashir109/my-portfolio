import { Reveal, SECTION, SectionHead } from './ui'

const CAPS = [
  {
    no: 'CAP·01',
    title: 'Mobile, end-to-end',
    desc: 'React Native apps for iOS and Android from one codebase — architecture, UI, native modules, releases.',
    items: ['Weekly TestFlight / APK builds', 'Store submission handled', 'CI pipeline + release docs'],
    engagement: 'ENGAGEMENT — FIXED SCOPE OR MONTHLY',
  },
  {
    no: 'CAP·02',
    title: 'Web frontends',
    desc: 'React + TypeScript interfaces wired to real APIs — dashboards, admin tools, marketplaces, work queues.',
    items: ['Typed API layer, no any', 'Component system, not a CSS pile', 'Fast tables — filter, sort, bulk actions'],
    engagement: 'ENGAGEMENT — FIXED SCOPE OR MONTHLY',
  },
  {
    no: 'CAP·03',
    title: 'APIs & backend',
    desc: 'Node.js / Express services with PostgreSQL or MongoDB — auth, payments, uploads, notifications, chat.',
    items: ['REST API + written docs', 'DB schema + migrations', 'Deploy scripts included'],
    engagement: 'ENGAGEMENT — WITH FRONTEND OR SOLO',
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" data-screen-label="Capabilities" className={SECTION}>
      <SectionHead no="01" tag="CAPABILITIES" title="What I ship." />
      <Reveal className="mt-[clamp(32px,5vh,52px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px border border-line bg-line">
          {CAPS.map((c) => (
            <article key={c.no} className="flex flex-col gap-4 bg-paper p-[clamp(22px,3vw,32px)]">
              <span className="font-mono text-[11px] tracking-[.18em] text-accent">{c.no}</span>
              <h3 className="stretch-x m-0 text-xl font-extrabold uppercase tracking-[.01em]">{c.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.65] text-ink-soft [text-wrap:pretty]">{c.desc}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {c.items.map((it) => (
                  <li key={it} className="font-mono text-[11.5px] leading-normal">
                    <span className="text-accent">+</span> {it}
                  </li>
                ))}
              </ul>
              <span className="mt-auto border-t border-line pt-3.5 font-mono text-[10px] tracking-[.16em] text-ink-faint">
                {c.engagement}
              </span>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
