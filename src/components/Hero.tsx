import { MAILTO, PERSON } from '../lib/data'

const TICKER =
  'REACT NATIVE — TYPESCRIPT — REACT — NODE.JS — EXPRESS — REDUX TOOLKIT — REST APIS — POSTGRESQL — MONGODB — CI / CD — APP STORE RELEASE — '

const SPECS: [string, string][] = [
  ['ROLE', 'React Native · Full-Stack'],
  ['CURRENT', 'Software Engineer @ Transcure'],
  ['BASE', 'Lahore, PK — UTC+5'],
  ['OVERLAP', 'US + EU hours'],
]

export function Hero() {
  return (
    <section
      id="top"
      data-screen-label="Hero"
      className="flex min-h-[calc(100svh-60px)] flex-col justify-center px-[clamp(20px,4.5vw,56px)] pt-[clamp(40px,6vh,72px)]"
    >
      <div className="anim-hero-up flex flex-wrap items-center gap-x-6 gap-y-2.5">
        <span className="font-mono text-[10.5px] tracking-[.2em] text-ink-faint">
          DOC — MB·2026 / PORTFOLIO, FOR HIRE
        </span>
        <span className="inline-flex items-center gap-2 border border-line-strong px-3 py-1.5">
          <span className="anim-pulse-dot h-[7px] w-[7px] rounded-full bg-accent" />
          <span className="font-mono text-[10.5px] uppercase tracking-[.18em]">{PERSON.availability}</span>
        </span>
      </div>

      <h1 className="anim-hero-up stretch-x m-0 mt-[clamp(22px,4vh,40px)] font-display text-[clamp(2.5rem,7.6vw,6.6rem)] font-black uppercase leading-[.95] tracking-[-0.012em] [animation-delay:.08s] [text-wrap:balance]">
        Production apps,
        <br />
        shipped <span className="text-accent">end-to-end.</span>
      </h1>

      <div className="anim-hero-up mt-[clamp(32px,5vh,56px)] flex flex-wrap items-end gap-x-[clamp(32px,5vw,80px)] gap-y-8 [animation-delay:.18s]">
        <div className="flex max-w-[600px] flex-1 basis-[340px] flex-col gap-[26px]">
          <p className="m-0 text-[clamp(15px,1.6vw,17.5px)] leading-[1.7] text-ink-soft [text-wrap:pretty]">
            Mobile, web, and API — one engineer who takes it from first commit to store release. React Native +
            React + Node.js, typed end to end, with builds you can install every week. No handoffs, no telephone
            game.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={MAILTO}
              className="inline-flex items-center gap-2.5 bg-ink px-[22px] py-[15px] font-mono text-xs tracking-[.14em] text-paper transition-colors hover:bg-accent"
            >
              REQUEST AVAILABILITY →
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 border border-line-strong px-[22px] py-[15px] font-mono text-xs tracking-[.14em] transition-colors hover:border-accent hover:text-accent"
            >
              SEE THE WORK ↓
            </a>
          </div>
        </div>
        <div className="ml-auto max-w-[460px] flex-1 basis-[300px]">
          {SPECS.map(([k, v], i) => (
            <div
              key={k}
              className={`flex justify-between gap-4 border-t border-line py-[11px] ${i === SPECS.length - 1 ? 'border-b' : ''}`}
            >
              <span className="font-mono text-[10px] tracking-[.18em] text-ink-faint">{k}</span>
              <span className="text-right font-mono text-xs">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="mt-[clamp(36px,6vh,64px)] overflow-hidden border-t border-line py-[13px]">
        <div className="marquee-track">
          <span className="whitespace-pre font-mono text-[11.5px] tracking-[.22em] text-ink-faint">
            {TICKER + TICKER}
          </span>
          <span className="whitespace-pre font-mono text-[11.5px] tracking-[.22em] text-ink-faint">
            {TICKER + TICKER}
          </span>
        </div>
      </div>
    </section>
  )
}
