import { useState, type ChangeEvent } from 'react'
import { MAILTO, PERSON } from '../lib/data'
import { Reveal, useClock } from './ui'

const FIELD =
  'box-border w-full border border-paper-line bg-paper/5 px-3.5 py-[13px] font-mono text-[12.5px] text-paper outline-none transition-colors focus:border-accent'
const LABEL = 'font-mono text-[10px] tracking-[.18em] text-paper-soft'
const ERR = 'font-mono text-[9.5px] tracking-[.14em] text-err'
const GHOST_BTN =
  'inline-flex cursor-pointer items-center gap-2 border border-paper-line bg-transparent px-[18px] py-[13px] font-mono text-[11px] tracking-[.14em] text-paper transition-colors hover:border-accent hover:text-accent'

type Errors = Partial<Record<'name' | 'email' | 'ptype' | 'details', string>>

export function Contact({ slotKey, clearSlot }: { slotKey: string | null; clearSlot: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [ptype, setPtype] = useState('')
  const [budget, setBudget] = useState('')
  const [details, setDetails] = useState('')
  const [errs, setErrs] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const time = useClock('Asia/Karachi')

  const copyEmail = () => {
    navigator.clipboard?.writeText(PERSON.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }).catch(() => {})
  }

  const submit = () => {
    const e: Errors = {}
    if (!name.trim()) e.name = 'NAME REQUIRED'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'VALID EMAIL REQUIRED'
    if (!ptype) e.ptype = 'PICK A PROJECT TYPE'
    if (details.trim().length < 20) e.details = 'ADD A LITTLE MORE CONTEXT (20+ CHARACTERS)'
    setErrs(e)
    if (Object.keys(e).length) return
    const slotLine = slotKey ? `Consult slot requested: ${slotKey} PKT\n` : ''
    const body = `Name: ${name}\nEmail: ${email}\nProject type: ${ptype}\nBudget: ${budget || '—'}\n${slotLine}\nDetails:\n${details}`
    window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(`Project inquiry — ${ptype}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      data-screen-label="Contact"
      className="bg-ink px-[clamp(20px,4.5vw,56px)] pb-[clamp(40px,6vh,64px)] pt-[clamp(72px,12vh,130px)] text-paper"
    >
      <Reveal className="mb-[clamp(28px,4vh,44px)] flex flex-wrap items-center gap-[18px]">
        <span className="font-mono text-xs tracking-[.2em] text-accent">08</span>
        <span className="h-px w-11 shrink-0 bg-paper-line" />
        <span className="font-mono text-[11px] tracking-[.22em] text-paper-soft">CONTACT</span>
        <span className="ml-auto inline-flex items-center gap-2">
          <span className="anim-pulse-dot h-[7px] w-[7px] rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-paper-soft">{PERSON.availability}</span>
        </span>
      </Reveal>

      <Reveal>
        <h2 className="stretch-x m-0 mb-[clamp(28px,5vh,48px)] font-display text-[clamp(2.2rem,6.8vw,5.6rem)] font-black uppercase leading-[.95] tracking-[-0.012em] [text-wrap:balance]">
          Have an app
          <br />
          to <span className="text-accent">ship?</span>
        </h2>
      </Reveal>

      <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(32px,5vw,64px)]">
        <div>
          {!sent ? (
            <div className="flex flex-col gap-[18px]">
              <span className="font-mono text-[10.5px] tracking-[.2em] text-accent">INQUIRY FORM — 60 SECONDS</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                <label className="flex flex-col gap-[7px]">
                  <span className={LABEL}>NAME *</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Founder" className={FIELD} />
                  {errs.name ? <span className={ERR}>{errs.name}</span> : null}
                </label>
                <label className="flex flex-col gap-[7px]">
                  <span className={LABEL}>EMAIL *</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" className={FIELD} />
                  {errs.email ? <span className={ERR}>{errs.email}</span> : null}
                </label>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                <label className="flex flex-col gap-[7px]">
                  <span className={LABEL}>PROJECT TYPE *</span>
                  <select value={ptype} onChange={(e: ChangeEvent<HTMLSelectElement>) => setPtype(e.target.value)} className={FIELD}>
                    <option value="" className="text-ink">SELECT TYPE…</option>
                    {['MOBILE APP', 'WEB FRONTEND', 'BACKEND / API', 'FULL-STACK', 'NOT SURE YET'].map((o) => (
                      <option key={o} value={o} className="text-ink">{o}</option>
                    ))}
                  </select>
                  {errs.ptype ? <span className={ERR}>{errs.ptype}</span> : null}
                </label>
                <label className="flex flex-col gap-[7px]">
                  <span className={LABEL}>BUDGET</span>
                  <select value={budget} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBudget(e.target.value)} className={FIELD}>
                    <option value="" className="text-ink">OPTIONAL…</option>
                    {['UNDER $3K', '$3K – $6K', '$6K – $12K', '$12K+', 'UNDECIDED'].map((o) => (
                      <option key={o} value={o} className="text-ink">{o}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-[7px]">
                <span className={LABEL}>DETAILS *</span>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={5}
                  placeholder="What are you building, who is it for, and when does it need to ship?"
                  className={`${FIELD} resize-y leading-relaxed`}
                />
                {errs.details ? <span className={ERR}>{errs.details}</span> : null}
              </label>
              {slotKey ? (
                <div className="flex flex-wrap items-center gap-2.5 border border-dashed border-paper-line px-3.5 py-[11px]">
                  <span className="font-mono text-[10px] tracking-[.16em] text-accent">+ CONSULT — {slotKey} PKT</span>
                  <button
                    type="button"
                    onClick={clearSlot}
                    className="ml-auto cursor-pointer border-0 bg-transparent p-1 font-mono text-[10.5px] tracking-[.14em] text-paper-soft transition-colors hover:text-err"
                  >
                    REMOVE ×
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                onClick={submit}
                className="inline-flex cursor-pointer items-center gap-2.5 self-start border-0 bg-accent px-6 py-4 font-mono text-xs tracking-[.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                SEND INQUIRY →
              </button>
            </div>
          ) : (
            <div className="anim-case-in flex flex-col gap-4 border border-accent p-[clamp(22px,3vw,32px)]">
              <span className="font-mono text-[11px] tracking-[.2em] text-accent">✓ INQUIRY PREPARED</span>
              <p className="stretch-x m-0 text-[clamp(1.2rem,2.4vw,1.7rem)] font-extrabold uppercase leading-[1.15]">
                Your email app opened with the full brief.
              </p>
              <p className="m-0 text-sm leading-[1.65] text-paper-soft [text-wrap:pretty]">
                Review it and hit send — replies land within 24 hours, PKT. If nothing opened, copy the address
                below and paste the brief manually.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={copyEmail} className={GHOST_BTN}>
                  {copied ? 'COPIED ✓' : 'COPY EMAIL'}
                </button>
                <button type="button" onClick={() => setSent(false)} className={GHOST_BTN}>
                  EDIT & RESEND
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <span className="font-mono text-[10.5px] tracking-[.2em] text-paper-soft">PREFER DIRECT?</span>
          <a
            href={MAILTO}
            className="self-start border-b border-paper-line pb-1.5 font-mono text-[clamp(1rem,2.6vw,1.5rem)] tracking-[.02em] [word-break:break-all] transition-colors hover:border-accent hover:text-accent"
          >
            {PERSON.email}
          </a>
          <p className="m-0 max-w-[460px] text-sm leading-[1.65] text-paper-soft [text-wrap:pretty]">
            Send the one-paragraph version of what you're building. You'll get a reply within 24 hours, PKT — with
            questions, not a sales pitch.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={copyEmail} className={GHOST_BTN}>
              {copied ? 'COPIED ✓' : 'COPY EMAIL'}
            </button>
            <a href={PERSON.whatsapp} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>WHATSAPP ↗</a>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>GITHUB ↗</a>
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>LINKEDIN ↗</a>
            <a href={PERSON.phoneHref} className={GHOST_BTN}>{PERSON.phone}</a>
          </div>
          <div className="flex flex-col gap-1.5 border border-paper-line/70 px-4 py-3.5">
            <span className="font-mono text-[9.5px] tracking-[.18em] text-paper-soft">RESPONSE LOG</span>
            <span className="font-mono text-[11px] tracking-[.1em] text-paper/75">
              AVG REPLY — UNDER 24H PKT · CONSULTS — FREE, 30 MIN
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mt-[clamp(48px,8vh,80px)] flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-paper-line/60 pt-5">
        <span className="font-mono text-[10px] tracking-[.16em] text-paper-soft">© 2026 MOHSIN BASHIR</span>
        <span className="font-mono text-[10px] tracking-[.16em] text-paper-soft">LAHORE — {time} PKT</span>
        <span className="font-mono text-[10px] tracking-[.16em] text-paper-soft">BUILT BY HAND. NO TEMPLATE.</span>
      </div>
    </section>
  )
}
