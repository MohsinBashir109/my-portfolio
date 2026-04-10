import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { PERSON, skillsMarqueeLabelsFlat } from '../lib/constants'
import { heroFadeUp, heroStaggerContainer } from '../lib/motion'
import { iconForSkill } from '../lib/techIcons'
import { HeroGlowLayer } from './hero-atmosphere'
import { SectionRevealSoft } from './motion'
import { HeroTechMarquee } from './HeroTechMarquee'

const LANDING_NAV = [
  { id: 'hero', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
] as const

const HERO_DESCRIPTION =
  'Building modern, scalable, and user-focused mobile applications with React Native and JavaScript.' as const

const HERO_BADGE = 'Open to Opportunities' as const

const HERO_STATS = [
  { value: '1+', label: 'Years experience' },
  { value: '10+', label: 'Apps and software' },
  { value: null as string | null, label: 'React Native • Node.js • React' },
] as const

const heroSocial = [
  { label: 'GitHub', href: PERSON.github },
  { label: 'LinkedIn', href: PERSON.linkedin },
  { label: 'Email', href: `mailto:${PERSON.email}` },
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** First eight labels from `skillsMarqueeLabelsFlat` — left / right rails */
const LANDING_RAIL_SKILL_LABELS = skillsMarqueeLabelsFlat().slice(0, 8)
const LANDING_RAIL_LEFT_LABELS = LANDING_RAIL_SKILL_LABELS.filter((_, i) => i % 2 === 0)
const LANDING_RAIL_RIGHT_LABELS = LANDING_RAIL_SKILL_LABELS.filter((_, i) => i % 2 === 1)

/** Vertical stacks on the sides — quiet cards, subtle float */
const LandingTechRail = memo(function LandingTechRail({
  labels,
  side,
  reducedMotion,
}: {
  labels: string[]
  side: 'left' | 'right'
  reducedMotion: boolean
}) {
  const n = labels.length
  if (n === 0) return null

  return (
    <div
      className={`pointer-events-none relative z-[2] hidden h-[min(320px,46vh)] w-9 shrink-0 flex-col justify-evenly sm:w-10 md:flex ${side === 'left' ? 'items-start md:mr-0 lg:mr-1' : 'items-end md:ml-0 lg:ml-1'}`}
      aria-hidden="true"
    >
      {labels.map((label, i) => {
        const Icon = iconForSkill(label)
        if (!Icon) return null
        const delay = i * 0.32
        return (
          <motion.div
            key={label}
            className="pointer-events-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-lp-bg/70 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[box-shadow,border-color] duration-300 sm:h-9 sm:w-9 sm:rounded-xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: reducedMotion ? 0 : [0, -2.5, 0],
            }}
            transition={{
              opacity: { delay: 0.25 + i * 0.06, duration: 0.52, ease: [0.22, 1, 0.36, 1] },
              y: reducedMotion
                ? { duration: 0 }
                : {
                    delay: 0.9 + delay,
                    duration: 5.8 + i * 0.35,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
            }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.04,
                    borderColor: 'rgba(251, 146, 60, 0.28)',
                    boxShadow: '0 10px 28px -12px rgba(251, 146, 60, 0.18)',
                  }
            }
          >
            <Icon
              className="landing-tech-icon h-[0.95rem] w-[0.95rem] shrink-0 text-lp-orange/75 sm:h-[1.05rem] sm:w-[1.05rem]"
              title={label}
            />
          </motion.div>
        )
      })}
    </div>
  )
})

const heroEase = [0.22, 1, 0.36, 1] as const
const actionSpring = { type: 'spring' as const, stiffness: 380, damping: 26 }

export function LandingHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion() === true
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroContentOpacity = useTransform(heroProgress, [0, 0.52], [1, 0.38])
  const heroContentScale = useTransform(heroProgress, [0, 0.58], [1, 0.982])
  const heroContentY = useTransform(heroProgress, [0, 0.5], [0, -20])
  const glowLiftY = useTransform(heroProgress, [0, 1], [0, 32])
  const onNav = useCallback((id: string) => {
    scrollToId(id)
    setMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

  const { logoFirst, logoRest } = useMemo(() => {
    const nameParts = PERSON.name.split(/\s+/)
    return { logoFirst: nameParts[0] ?? '', logoRest: nameParts.slice(1).join('') }
  }, [])

  const heroContentStyle = useMemo(
    () =>
      prefersReducedMotion
        ? undefined
        : {
            opacity: heroContentOpacity,
            scale: heroContentScale,
            y: heroContentY,
          },
    [prefersReducedMotion, heroContentOpacity, heroContentScale, heroContentY]
  )

  const glowWrapStyle = useMemo(
    () => (prefersReducedMotion ? undefined : { y: glowLiftY }),
    [prefersReducedMotion, glowLiftY]
  )

  const scrollCueTransition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { delay: 0.85, duration: 0.55, ease: heroEase }),
    [prefersReducedMotion]
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-[1] flex min-h-svh flex-col overflow-x-clip bg-transparent"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_50%_38%,rgba(251,146,60,0.04),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/[0.58]" />

      <header className="relative z-20 px-5 py-6 sm:px-10 sm:py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              onNav('hero')
            }}
            className="group flex items-center gap-2.5 font-[family-name:var(--font-roboto-mono)] text-base font-semibold tracking-tight transition sm:gap-3 sm:text-lg"
          >
            <img
              src="/favicon.svg"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              aria-hidden
            />
            <span className="text-[#fdba74] transition group-hover:text-white">{logoFirst}</span>
            {logoRest ? (
              <span className="text-white/90 transition group-hover:text-[#fdba74]">{logoRest}</span>
            ) : null}
            <span className="text-white/90 transition group-hover:text-[#fdba74]">.</span>
            <span className="bg-gradient-to-r from-[#fdba74] to-lp-orange bg-clip-text text-transparent transition group-hover:from-white group-hover:to-[#fdba74]">
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
            onClick={toggleMenu}
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
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 pt-2 sm:px-6 md:flex-row md:items-center md:justify-center md:gap-1 md:px-6 lg:gap-3 lg:px-10">
          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
            aria-hidden
          >
            <motion.div className="flex h-full w-full items-center justify-center" style={glowWrapStyle}>
              <HeroGlowLayer reducedMotion={prefersReducedMotion} />
            </motion.div>
          </div>
          <LandingTechRail labels={LANDING_RAIL_LEFT_LABELS} side="left" reducedMotion={prefersReducedMotion} />

          <div className="relative z-[2] mx-auto w-full min-w-0 max-w-2xl flex-1 px-2 text-center sm:px-3 md:max-w-[min(100%,38rem)] lg:max-w-2xl">
            <motion.div className="flex flex-col items-center gap-5 sm:gap-6" style={heroContentStyle}>
              <motion.div
                variants={heroStaggerContainer}
                initial="hidden"
                animate="visible"
                className="flex w-full flex-col items-center gap-5 sm:gap-6"
              >
              <motion.div variants={heroFadeUp} className="order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-lp-orange/45 bg-gradient-to-r from-lp-orange/[0.12] to-lp-orange/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fdba74] shadow-[0_0_28px_-8px_rgba(251,146,60,0.4)] ring-1 ring-lp-orange/20 backdrop-blur-sm sm:text-[11px] sm:tracking-[0.18em]">
                  <span
                    className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-lp-orange shadow-[0_0_10px_rgba(251,146,60,0.85)] motion-reduce:animate-none"
                    aria-hidden
                  />
                  {HERO_BADGE}
                </span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                variants={heroFadeUp}
                className="order-2 max-w-[22ch] font-[family-name:var(--font-poppins)] text-[clamp(2.4rem,7vw,4rem)] font-bold uppercase leading-[1.05] tracking-[0.055em] text-zinc-50 drop-shadow-[0_4px_48px_rgba(0,0,0,0.35)] sm:max-w-none sm:tracking-[0.06em]"
              >
                {PERSON.name}
              </motion.h1>

              <motion.p
                variants={heroFadeUp}
                className="order-3 max-w-xl text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-zinc-400 sm:text-[0.8125rem] sm:tracking-[0.22em]"
              >
                {PERSON.title}
              </motion.p>

              <motion.p
                variants={heroFadeUp}
                className="order-4 max-w-lg text-pretty text-sm leading-relaxed text-zinc-500 sm:max-w-xl sm:text-[0.9375rem] sm:leading-relaxed"
              >
                {HERO_DESCRIPTION}
              </motion.p>

              <motion.nav
                variants={heroFadeUp}
                className="order-5 flex w-full max-w-md flex-col items-stretch justify-center gap-3 pt-0.5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3.5 sm:pt-1"
                aria-label="Primary actions"
              >
                <motion.button
                  type="button"
                  onClick={() => onNav('projects')}
                  className="btn-press focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-gradient-to-r from-lp-orange to-orange-500 px-7 py-3 text-sm font-semibold text-lp-bg shadow-[0_8px_32px_-14px_rgba(251,146,60,0.42)] ring-1 ring-white/10 transition-colors hover:from-orange-400 hover:to-lp-orange hover:shadow-[0_12px_36px_-12px_rgba(251,146,60,0.38)] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.015, y: -0.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  transition={actionSpring}
                >
                  View Projects
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onNav('contact')}
                  className="btn-press focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-lp-orange/40 hover:bg-lp-orange/[0.07] hover:text-white motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.015, y: -0.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  transition={actionSpring}
                >
                  Contact Me
                </motion.button>
              </motion.nav>

              <motion.div
                variants={heroFadeUp}
                className="order-6 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-4 border-y border-white/[0.08] bg-white/[0.02] py-5 sm:gap-x-10 sm:px-4 sm:py-6"
                aria-label="Highlights"
              >
                {HERO_STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="flex min-w-[7rem] flex-col items-center gap-1 px-3 text-center sm:min-w-[7.5rem]"
                  >
                    {stat.value ? (
                      <>
                        <span className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tabular-nums text-lp-orange sm:text-[1.65rem]">
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:text-[11px] sm:tracking-[0.12em]">
                          {stat.label}
                        </span>
                      </>
                    ) : (
                      <span className="max-w-[16rem] text-xs font-medium leading-snug text-zinc-400 sm:max-w-none sm:text-sm">
                        {stat.label}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>

              <motion.ul
                variants={heroFadeUp}
                className="order-7 flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
                aria-label="Social links"
              >
                {heroSocial.map(({ label, href }, i) => (
                  <li key={label} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-2 hidden h-3 w-px bg-white/15 sm:inline" aria-hidden />
                    ) : null}
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="focus-ring rounded-md px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500 transition hover:text-lp-orange sm:text-[13px]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </motion.ul>
              </motion.div>
            </motion.div>
          </div>

          <LandingTechRail labels={LANDING_RAIL_RIGHT_LABELS} side="right" reducedMotion={prefersReducedMotion} />
        </div>

        <div className="relative z-[2] mt-auto w-full pb-24 pt-2 sm:pb-28">
          <SectionRevealSoft className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-lp-orange/65 sm:mb-2.5 sm:text-[11px] sm:tracking-[0.18em]">
              Stack &amp; tools
            </p>
          </SectionRevealSoft>
          <SectionRevealSoft>
            <HeroTechMarquee className="mt-1 sm:mt-2" />
          </SectionRevealSoft>
        </div>
      </div>

      <motion.a
        href="#about"
        className="group/scroll focus-ring absolute bottom-5 left-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-2.5 rounded-lg px-3 py-1 text-zinc-500 transition hover:text-lp-orange"
        aria-label="Scroll to about section"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={scrollCueTransition}
        onClick={(e) => {
          e.preventDefault()
          onNav('about')
        }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500 transition group-hover/scroll:text-lp-orange/90 sm:text-[11px] sm:tracking-[0.24em]">
          Scroll to Explore
        </span>
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/20 bg-black/30 pt-2.5 transition group-hover/scroll:border-lp-orange/50 group-hover/scroll:bg-lp-orange/10">
          <span className="scroll-cue-dot h-5 w-[3px] rounded-full bg-lp-orange will-change-transform" />
        </span>
      </motion.a>
    </section>
  )
}
