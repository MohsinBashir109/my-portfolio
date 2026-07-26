import { Reveal, SECTION, SectionHead } from './ui'

// Replace these SAMPLE entries with real client quotes when you have them.
const REVIEWS = [
  {
    stars: '★★★★★', rating: '5.0',
    quote: '“Scope doc on Monday, a working TestFlight build the same week. Every milestone landed when he said it would.”',
    who: '— CLIENT NAME · FOUNDER', re: 'RE: MOBILE BUILD',
  },
  {
    stars: '★★★★★', rating: '5.0',
    quote: '“One engineer covered what we had budgeted a frontend + backend pair for. The admin tools alone paid for the project.”',
    who: '— CLIENT NAME · PRODUCT LEAD', re: 'RE: FULL-STACK',
  },
  {
    stars: '★★★★☆', rating: '4.8',
    quote: '“PRs came with context we could actually read. Handoff to our in-house team took an afternoon, not a sprint.”',
    who: '— CLIENT NAME · CTO', re: 'RE: WEB FRONTEND',
  },
]

export function Reviews() {
  return (
    <section id="reviews" data-screen-label="Testimonials" className={SECTION}>
      <SectionHead
        no="06"
        tag="REVIEWS"
        title="What clients say."
        right={
          <span className="border border-dashed border-line-strong px-[9px] py-1 font-mono text-[9.5px] tracking-[.16em] text-ink-faint">
            SAMPLE ENTRIES — REAL QUOTES PENDING
          </span>
        }
      />
      <Reveal className="mt-[clamp(32px,5vh,52px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px border border-line bg-line">
          {REVIEWS.map((r) => (
            <article key={r.re} className="flex flex-col gap-3.5 bg-paper p-[clamp(22px,3vw,30px)]">
              <div className="flex items-center gap-2.5">
                <span className="text-sm tracking-[3px] text-accent">{r.stars}</span>
                <span className="font-mono text-[10px] tracking-[.12em] text-ink-faint">{r.rating}</span>
                <span className="ml-auto border border-dashed border-line-strong px-[7px] py-[3px] font-mono text-[9px] tracking-[.16em] text-ink-faint">
                  SAMPLE
                </span>
              </div>
              <p className="m-0 text-[14.5px] leading-[1.7] text-ink-soft [text-wrap:pretty]">{r.quote}</p>
              <div className="mt-auto flex justify-between gap-2.5 border-t border-line pt-3">
                <span className="font-mono text-[10px] tracking-[.14em] text-ink-faint">{r.who}</span>
                <span className="font-mono text-[10px] tracking-[.14em] text-accent">{r.re}</span>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
