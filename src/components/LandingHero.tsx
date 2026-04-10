import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { PERSON, skillsMarqueeLabelsFlat } from '../lib/constants'
import { iconForSkill } from '../lib/techIcons'

/** Order matches page scroll: skills block sits above about */
const LANDING_NAV = [
  { id: 'hero', label: 'home' },
  { id: 'skills', label: 'expertise' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Outer = translateY-only CSS animation; inner = static 3D transform (no fighting keyframes). */
function DriftShape({
  wrapperClass,
  faceClass,
  faceStyle,
  duration,
  delay = '0s',
  children,
}: {
  wrapperClass: string
  faceClass: string
  faceStyle: CSSProperties
  duration: string
  delay?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`hero-drift absolute ${wrapperClass}`}
      style={
        {
          ['--hero-drift-duration' as string]: duration,
          animationDelay: delay,
        } as CSSProperties
      }
    >
      <div className={faceClass} style={faceStyle}>
        {children}
      </div>
    </div>
  )
}

const SCENE_DRIFT_LAYOUT: {
  duration: string
  delay?: string
  wrapperClass: string
  faceClass: string
  faceStyle: CSSProperties
  iconClass: string
}[] = [
  {
    duration: '7s',
    wrapperClass: 'left-[11%] top-[28%] h-16 w-16',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-zinc-800/95 to-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.5)]',
    faceStyle: { transform: 'rotateX(52deg) rotateY(-28deg) rotateZ(4deg)' },
    iconClass: 'h-8 w-8',
  },
  {
    duration: '8s',
    delay: '0.2s',
    wrapperClass: 'right-[10%] top-[22%] h-14 w-[4.5rem]',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-md border border-white/12 bg-gradient-to-br from-zinc-800/90 to-zinc-950 shadow-[0_16px_48px_rgba(0,0,0,0.45)]',
    faceStyle: { transform: 'rotateX(48deg) rotateY(36deg)' },
    iconClass: 'h-7 w-7',
  },
  {
    duration: '6s',
    delay: '0.4s',
    wrapperClass: 'bottom-[20%] left-[16%] h-[3.25rem] w-[3.25rem]',
    faceClass: 'flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-zinc-900/95 shadow-lg',
    faceStyle: { transform: 'rotateX(58deg) rotateZ(-8deg)' },
    iconClass: 'h-7 w-7',
  },
  {
    duration: '6.5s',
    delay: '0.15s',
    wrapperClass: 'bottom-[18%] right-[14%] h-12 w-12',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-lg border border-lp-accent/25 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-[0_0_28px_-6px_rgba(110,193,228,0.28)]',
    faceStyle: { transform: 'rotateX(50deg) rotateY(18deg)' },
    iconClass: 'h-6 w-6',
  },
  {
    duration: '5.5s',
    wrapperClass: 'left-1/2 top-[18%] h-20 w-11 -translate-x-1/2',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-full border border-white/12 bg-gradient-to-b from-zinc-700/80 via-zinc-900 to-zinc-950 shadow-[inset_0_-4px_12px_rgba(0,0,0,0.6)]',
    faceStyle: { transform: 'rotateX(68deg)' },
    iconClass: 'h-8 w-8',
  },
  {
    duration: '5s',
    delay: '0.5s',
    wrapperClass: 'left-[38%] top-[52%] h-10 w-10',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-md border border-white/10 bg-gradient-to-br from-zinc-800/85 to-black/80',
    faceStyle: { transform: 'rotateX(44deg) rotateY(-12deg)' },
    iconClass: 'h-5 w-5',
  },
  {
    duration: '7.5s',
    delay: '0.25s',
    wrapperClass: 'right-[24%] top-[44%] h-11 w-11',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-lg border border-white/12 bg-gradient-to-br from-zinc-800/90 to-zinc-950 shadow-[0_12px_36px_rgba(0,0,0,0.4)]',
    faceStyle: { transform: 'rotateX(46deg) rotateY(-20deg)' },
    iconClass: 'h-6 w-6',
  },
  {
    duration: '6.8s',
    delay: '0.35s',
    wrapperClass: 'left-[20%] top-[38%] h-10 w-10',
    faceClass:
      'flex h-full w-full items-center justify-center rounded-md border border-white/10 bg-gradient-to-br from-zinc-800/88 to-zinc-950 shadow-lg',
    faceStyle: { transform: 'rotateX(54deg) rotateY(14deg)' },
    iconClass: 'h-5 w-5',
  },
]

/** Same strings + icons as `SkillsMarquee` (ROW_ONE + ROW_TWO) */
const LANDING_SKILLS_STRIP_LABELS = skillsMarqueeLabelsFlat()
const LANDING_SCENE_SKILL_LABELS = LANDING_SKILLS_STRIP_LABELS.slice(0, SCENE_DRIFT_LAYOUT.length)

function HeroScene3D() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[min(52vh,440px)] w-[min(92vw,620px)] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      style={{ perspective: '1000px' }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-200/90 via-orange-500 to-orange-700 opacity-90 shadow-[0_0_80px_40px_rgba(251,146,60,0.35)]" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 blur-2xl" />

      {LANDING_SCENE_SKILL_LABELS.map((label, i) => {
        const layout = SCENE_DRIFT_LAYOUT[i]
        const Icon = iconForSkill(label)
        if (!layout || !Icon) return null
        return (
          <DriftShape
            key={label}
            duration={layout.duration}
            delay={layout.delay}
            wrapperClass={layout.wrapperClass}
            faceClass={layout.faceClass}
            faceStyle={layout.faceStyle}
          >
            <Icon
              className={`${layout.iconClass} landing-tech-icon text-lp-orange shrink-0 drop-shadow-[0_0_10px_rgba(251,146,60,0.28)]`}
              title={label}
            />
          </DriftShape>
        )
      })}
    </div>
  )
}

function FeaturedStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
      <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-500">
        As featured in
      </p>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Scroll logos left"
          onClick={() => scrollByDir(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-sm text-zinc-400 transition hover:border-lp-orange/45 hover:bg-lp-orange/10 hover:text-[#fdba74]"
        >
          &lt;
        </button>
        <div
          ref={scrollerRef}
          className="flex min-h-[3rem] flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-pl-3 scroll-pr-3 py-2 ps-3 pe-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:scroll-pl-4 sm:scroll-pr-4 sm:ps-4 sm:pe-4"
        >
          {LANDING_SKILLS_STRIP_LABELS.map((name) => {
            const Icon = iconForSkill(name)
            return (
              <span
                key={name}
                className="inline-flex shrink-0 snap-center items-center gap-2.5 rounded-full border border-lp-orange/45 bg-lp-bg/95 px-4 py-2 shadow-sm ring-1 ring-lp-orange/15"
              >
                {Icon ? (
                  <Icon
                    className="landing-tech-icon h-4 w-4 shrink-0 text-lp-orange"
                    aria-hidden="true"
                    title={name}
                  />
                ) : null}
                <span className="whitespace-nowrap text-sm font-medium text-zinc-100/90">{name}</span>
              </span>
            )
          })}
        </div>
        <button
          type="button"
          aria-label="Scroll logos right"
          onClick={() => scrollByDir(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-sm text-zinc-400 transition hover:border-lp-orange/45 hover:bg-lp-orange/10 hover:text-[#fdba74]"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

function heroTagline(): string {
  return PERSON.title
    .split(/\s*\|\s*/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
}

export function LandingHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion() === true
  const onNav = useCallback((id: string) => {
    scrollToId(id)
    setMenuOpen(false)
  }, [])

  const nameParts = PERSON.name.split(/\s+/)
  const logoFirst = nameParts[0] ?? ''
  const logoRest = nameParts.slice(1).join('')

  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-svh flex-col overflow-x-clip bg-lp-bg"
      aria-label="Introduction"
    >
      {/* Moody gradient + subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_38%,rgba(255,140,60,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(120,80,200,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <header className="relative z-20 px-5 py-6 sm:px-10 sm:py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              onNav('hero')
            }}
            className="group font-[family-name:var(--font-roboto-mono)] text-sm font-medium tracking-tight transition sm:text-base"
          >
            <span className="text-[#6ec1e4] transition group-hover:text-[#fdba74]">{logoFirst}</span>
            {logoRest ? (
              <span className="text-white transition group-hover:text-[#fdba74]">{logoRest}</span>
            ) : null}
            <span className="text-white transition group-hover:text-[#fdba74]">.</span>
            <span className="bg-gradient-to-r from-[#b388ff] to-[#9333ea] bg-clip-text text-transparent transition group-hover:from-[#fdba74] group-hover:to-lp-orange">
              _
            </span>
          </a>

          <nav className="hidden items-center gap-x-6 lg:flex xl:gap-x-8" aria-label="Primary">
            {LANDING_NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNav(id)
                }}
                className="group font-[family-name:var(--font-roboto-mono)] text-[11px] font-normal uppercase tracking-[0.06em] text-white transition hover:text-[#fdba74]"
              >
                <span className="text-white/45 transition group-hover:text-lp-orange/90">// </span>
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-[family-name:var(--font-roboto-mono)] text-zinc-200 transition hover:border-lp-orange/50 hover:bg-lp-orange/15 hover:text-[#fdba74] lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '×' : '≡'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 border-y border-white/[0.06] bg-lp-bg/98 px-5 py-4 font-[family-name:var(--font-roboto-mono)] backdrop-blur-md lg:hidden"
            aria-label="Mobile primary"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-3">
              {LANDING_NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block text-sm uppercase tracking-wider text-zinc-300 transition hover:text-lp-orange"
                    onClick={(e) => {
                      e.preventDefault()
                      onNav(id)
                    }}
                  >
                    <span className="text-white/40">// </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-visible px-5 pb-8 pt-4 sm:px-8">
          <HeroScene3D />

          <div className="relative z-[2] mx-auto max-w-4xl text-center">
            <motion.h1
              className="font-[family-name:var(--font-poppins)] text-[clamp(2.25rem,10vw,4.25rem)] font-bold uppercase leading-[1.05] tracking-[0.06em] text-white drop-shadow-[0_2px_48px_rgba(0,0,0,0.45)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {PERSON.name.toUpperCase()}
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-roboto-mono)] text-[10px] font-normal uppercase leading-relaxed tracking-[0.28em] text-white/85 sm:text-[11px] sm:tracking-[0.22em]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {heroTagline()}.
            </motion.p>
          </div>
        </div>

        <div className="pb-10 pt-2">
          <FeaturedStrip />
        </div>
      </div>

      <motion.a
        href="#skills"
        className="group/scroll absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 transition hover:text-lp-orange"
        aria-label="Scroll to skills section"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { delay: 0.9, duration: 0.5 }
        }
        onClick={(e) => {
          e.preventDefault()
          onNav('skills')
        }}
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/25 bg-black/25 pt-2.5 transition group-hover/scroll:border-lp-orange/60 group-hover/scroll:bg-lp-orange/10">
          <span className="scroll-cue-dot h-5 w-[3px] rounded-full bg-lp-orange will-change-transform" />
        </span>
      </motion.a>
    </section>
  )
}
