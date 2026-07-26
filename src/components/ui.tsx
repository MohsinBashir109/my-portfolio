import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Section shell padding — shared rhythm. */
export const SECTION = 'border-t border-line px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,10vh,110px)]'

/** Mono spec label. */
export const MONO_LABEL = 'font-mono text-[10px] tracking-[.2em] text-ink-faint'

/** Scroll-reveal wrapper (IntersectionObserver, reduced-motion aware). */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-shown')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-shown')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/** Numbered kicker row + big section title. */
export function SectionHead({
  no,
  tag,
  title,
  intro,
  right,
}: {
  no: string
  tag: string
  title: string
  intro?: string
  right?: ReactNode
}) {
  return (
    <>
      <Reveal className="mb-[clamp(28px,4vh,44px)] flex items-center gap-[18px]">
        <span className="font-mono text-xs tracking-[.2em] text-accent">{no}</span>
        <span className="h-px w-11 shrink-0 bg-line-strong" />
        <span className="font-mono text-[11px] tracking-[.22em] text-ink-faint">{tag}</span>
        {right ? <span className="ml-auto">{right}</span> : null}
      </Reveal>
      <Reveal>
        <h2 className="stretch-x m-0 font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-extrabold uppercase leading-[.98] tracking-[-0.01em]">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal className="mt-[14px]">
          <p className="m-0 max-w-[620px] text-[15px] leading-[1.65] text-ink-soft [text-wrap:pretty]">{intro}</p>
        </Reveal>
      ) : null}
    </>
  )
}

/** Selectable mono chip (filters, estimator). */
export function Chip({
  label,
  active,
  onClick,
  variant = 'solid',
}: {
  label: string
  active: boolean
  onClick: () => void
  variant?: 'solid' | 'accent'
}) {
  const base =
    'cursor-pointer border font-mono text-[11px] tracking-[.12em] px-[15px] py-[11px] transition-colors'
  const cls =
    variant === 'solid'
      ? active
        ? 'border-line-strong bg-ink text-paper'
        : 'border-line-strong bg-transparent text-ink hover:text-accent hover:border-accent'
      : active
        ? 'border-accent bg-transparent text-accent'
        : 'border-line-strong bg-transparent text-ink-soft hover:text-accent hover:border-accent'
  return (
    <button type="button" onClick={onClick} className={`${base} ${cls}`}>
      {label}
    </button>
  )
}

/**
 * Screenshot slot: shows /screens/{id}.png when the file exists,
 * otherwise a labeled dashed placeholder.
 */
export function FigureSlot({ id, cap, tall }: { id: string; cap: string; tall?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const frame = tall ? 'aspect-[9/16] max-w-[220px]' : 'aspect-[16/10]'
  return (
    <figure className="m-0 flex w-full flex-col gap-2">
      <div className={`relative w-full overflow-hidden ${frame} ${failed ? 'border border-dashed border-line-strong' : 'border border-line-strong'}`}>
        {!failed ? (
          <img
            src={`/screens/${id}.png`}
            alt={cap}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover ${loaded ? '' : 'opacity-0'}`}
          />
        ) : null}
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
            <span className="font-mono text-[10px] tracking-[.16em] text-ink-faint">[ SCREENSHOT PENDING ]</span>
            <span className="font-mono text-[9px] tracking-[.1em] text-ink-faint">ADD public/screens/{id}.png</span>
          </div>
        ) : null}
      </div>
      <figcaption className="font-mono text-[10px] tracking-[.16em] text-ink-faint">{cap}</figcaption>
    </figure>
  )
}

/** Live clock for a fixed timezone (footer). */
export function useClock(timeZone: string) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' }))
      } catch {
        setTime('')
      }
    }
    tick()
    const t = setInterval(tick, 30000)
    return () => clearInterval(t)
  }, [timeZone])
  return time
}
