import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useLandingRevealReady } from '../context/LandingRevealContext'
import { PERSON, skillsMarqueeLabelsFlat } from '../lib/constants'
import { heroFadeUp, heroStaggerContainer } from '../lib/motion'
import { iconForSkill } from '../lib/techIcons'
import { SectionRevealSoft } from './motion'
import { HeroTechMarquee } from './HeroTechMarquee'
import { LandingHeroClayShapes } from './LandingHeroClayShapes'

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
  revealReady,
}: {
  labels: string[]
  side: 'left' | 'right'
  reducedMotion: boolean
  revealReady: boolean
}) {
  const n = labels.length
  if (n === 0) return null

  return (
    <div
      className={`pointer-events-none relative z-[2] hidden h-[min(320px,46vh)] w-9 shrink-0 flex-col justify-evenly sm:w-10 md:flex ${side === 'left' ? 'items-start md:mr-0 lg:mr-1' : 'items-end md:ml-0 lg:ml-1'} perspective-[640px]`}
      aria-hidden="true"
    >
      {labels.map((label, i) => {
        const Icon = iconForSkill(label)
        if (!Icon) return null
        const delay = i * 0.32
        return (
          <motion.div
            key={label}
            className="pointer-events-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#c2410c]/35 bg-[#9a3412]/50 shadow-[0_8px_24px_-10px_rgba(154,52,18,0.45)] backdrop-blur-md transition-[box-shadow,border-color,transform] duration-300 sm:h-9 sm:w-9"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 8, rotateY: 0 }}
            animate={
              revealReady
                ? {
                    opacity: 1,
                    y: reducedMotion ? 0 : [0, -2.5, 0],
                    rotateY: reducedMotion ? 0 : [-7, 7, -7],
                  }
                : { opacity: 0, y: 14, rotateY: 0 }
            }
            transition={{
              opacity: {
                delay: revealReady ? 0.2 + i * 0.06 : 0,
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
              },
              y: revealReady
                ? reducedMotion
                  ? { duration: 0 }
                  : {
                      delay: 0.75 + delay,
                      duration: 5.8 + i * 0.35,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                : { duration: 0.35 },
              rotateY: revealReady && !reducedMotion
                ? {
                    delay: 0.55 + i * 0.05,
                    duration: 4.2 + i * 0.28,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.35 },
            }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.05,
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 12px 32px -12px rgba(0, 0, 0, 0.4)',
                  }
            }
          >
            <Icon
              className="landing-tech-icon h-[0.95rem] w-[0.95rem] shrink-0 !text-[#fff7ed] sm:h-[1.05rem] sm:w-[1.05rem]"
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
  const revealReady = useLandingRevealReady()
  const prefersReducedMotion = useReducedMotion() === true
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroContentOpacity = useTransform(heroProgress, [0, 0.52], [1, 0.38])
  const heroContentScale = useTransform(heroProgress, [0, 0.58], [1, 0.982])
  const heroContentY = useTransform(heroProgress, [0, 0.5], [0, -20])
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

  const scrollCueTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : { delay: revealReady ? 0.85 : 0, duration: 0.55, ease: heroEase },
    [prefersReducedMotion, revealReady],
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-[1] flex min-h-svh flex-col overflow-x-clip bg-[#f97316] text-[#9a3412]"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_12%,rgba(255,255,255,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/[0.12] via-transparent to-[#c2410c]/[0.14]" />

      <LandingHeroClayShapes />

      <header className="relative z-20 px-5 py-6 sm:px-10 sm:py-7">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              onNav('hero')
            }}
            className="group flex items-center gap-2.5 font-[family-name:var(--font-roboto-mono)] text-base font-semibold tracking-tight text-[#9a3412] transition sm:gap-3 sm:text-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff7ed] shadow-[0_6px_20px_-8px_rgba(154,52,18,0.2)] ring-1 ring-[#c2410c]/25 sm:h-14 sm:w-14 sm:rounded-[1.1rem]">
              <img
                src="/favicon.svg"
                alt=""
                width={48}
                height={48}
                className="h-9 w-9 object-contain sm:h-11 sm:w-11"
                aria-hidden
              />
            </span>
            <span className="text-[#7c2d12] transition group-hover:text-[#9a3412]">{logoFirst}</span>
            {logoRest ? (
              <span className="text-[#9a3412] transition group-hover:text-[#7c2d12]">{logoRest}</span>
            ) : null}
            <span className="text-[#9a3412]">.</span>
            <span className="text-[#ea580c]/75 transition group-hover:text-[#c2410c]">_</span>
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
                className="group font-[family-name:var(--font-roboto-mono)] text-[11px] font-normal uppercase tracking-[0.08em] text-[#b45309] transition hover:text-[#7c2d12]"
              >
                <span className="text-[#ea580c]/70 transition group-hover:text-[#c2410c]">// </span>
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c2410c]/35 bg-[#9a3412]/40 font-[family-name:var(--font-roboto-mono)] text-[#fff7ed] transition hover:border-[#9a3412]/45 hover:bg-[#9a3412]/55 lg:hidden"
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
            className="relative z-20 border-y border-[#c2410c]/25 bg-[#9a3412]/95 px-5 py-4 font-[family-name:var(--font-roboto-mono)] text-[#fff7ed] backdrop-blur-md lg:hidden"
            aria-label="Mobile primary"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-3">
              {LANDING_NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block text-sm uppercase tracking-wider text-[#ffedd5] transition hover:text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      onNav(id)
                    }}
                  >
                    <span className="text-[#fdba74]/80">// </span>
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
          <LandingTechRail
            labels={LANDING_RAIL_LEFT_LABELS}
            side="left"
            reducedMotion={prefersReducedMotion}
            revealReady={revealReady}
          />

          <div className="relative z-[2] mx-auto w-full min-w-0 max-w-2xl flex-1 px-2 text-center sm:px-3 md:max-w-[min(100%,38rem)] lg:max-w-2xl">
            <motion.div className="flex flex-col items-center gap-5 sm:gap-6" style={heroContentStyle}>
              <motion.div
                variants={heroStaggerContainer}
                initial="hidden"
                animate={revealReady ? 'visible' : 'hidden'}
                className="flex w-full flex-col items-center gap-5 sm:gap-6"
              >
              <motion.div variants={heroFadeUp} className="order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c2410c]/35 bg-[#9a3412]/88 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fff7ed] shadow-[0_6px_24px_-10px_rgba(154,52,18,0.35)] ring-1 ring-[#fdba74]/25 backdrop-blur-md sm:text-[11px] sm:tracking-[0.18em]">
                  <span
                    className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#ffb38a] shadow-[0_0_14px_rgba(255,179,138,0.9)] motion-reduce:animate-none"
                    aria-hidden
                  />
                  {HERO_BADGE}
                </span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                variants={heroFadeUp}
                className="order-2 max-w-[22ch] font-[family-name:var(--font-poppins)] text-[clamp(2.4rem,7vw,4rem)] font-bold uppercase leading-[1.05] tracking-[0.055em] text-white [text-shadow:0_2px_28px_rgba(154,52,18,0.45)] sm:max-w-none sm:tracking-[0.06em]"
              >
                {PERSON.name}
              </motion.h1>

              <motion.p
                variants={heroFadeUp}
                className="order-3 max-w-xl text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/95 sm:text-[0.8125rem] sm:tracking-[0.22em]"
              >
                {PERSON.title}
              </motion.p>

              <motion.p
                variants={heroFadeUp}
                className="order-4 max-w-lg text-pretty text-sm font-normal leading-relaxed text-white/88 sm:max-w-xl sm:text-[0.9375rem] sm:leading-[1.65]"
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
                  className="btn-press focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#9a3412] px-7 py-3 text-sm font-semibold text-[#fff7ed] shadow-[0_10px_36px_-14px_rgba(154,52,18,0.45)] ring-1 ring-[#c2410c]/35 transition-colors hover:bg-[#7c2d12] hover:text-[#fffbeb] hover:shadow-[0_14px_40px_-12px_rgba(124,45,18,0.4)] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.015, y: -0.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  transition={actionSpring}
                >
                  View Projects
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onNav('contact')}
                  className="btn-press focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#c2410c]/45 bg-[#fff7ed]/65 px-7 py-3 text-sm font-semibold text-[#9a3412] backdrop-blur-md transition-colors hover:border-[#9a3412]/55 hover:bg-[#fff7ed]/90 hover:text-[#7c2d12] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.015, y: -0.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  transition={actionSpring}
                >
                  Contact Me
                </motion.button>
              </motion.nav>

              <motion.div
                variants={heroFadeUp}
                className="order-6 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-2xl border border-[#c2410c]/28 bg-[#9a3412]/78 py-5 shadow-[0_12px_40px_-18px_rgba(154,52,18,0.35)] backdrop-blur-md sm:gap-x-10 sm:px-4 sm:py-6"
                aria-label="Highlights"
              >
                {HERO_STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="flex min-w-[7rem] flex-col items-center gap-1 px-3 text-center sm:min-w-[7.5rem]"
                  >
                    {stat.value ? (
                      <>
                        <span className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tabular-nums text-[#fff7ed] sm:text-[1.65rem]">
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffedd5]/90 sm:text-[11px] sm:tracking-[0.12em]">
                          {stat.label}
                        </span>
                      </>
                    ) : (
                      <span className="max-w-[16rem] text-xs font-medium leading-snug text-[#ffedd5] sm:max-w-none sm:text-sm">
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
                      <span className="mx-2 hidden h-3 w-px bg-[#c2410c]/35 sm:inline" aria-hidden />
                    ) : null}
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="focus-ring rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#b45309] underline-offset-4 transition hover:text-[#7c2d12] hover:underline sm:text-[13px]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </motion.ul>
              </motion.div>
            </motion.div>
          </div>

          <LandingTechRail
            labels={LANDING_RAIL_RIGHT_LABELS}
            side="right"
            reducedMotion={prefersReducedMotion}
            revealReady={revealReady}
          />
        </div>

        <motion.div
          className="relative z-[2] mt-auto w-full border-t border-[#c2410c]/22 bg-[#9a3412]/22 pb-24 pt-4 backdrop-blur-md sm:pb-28"
          initial={false}
          animate={{
            opacity: revealReady ? 1 : 0,
            y: revealReady ? 0 : 10,
          }}
          transition={{ duration: 0.55, delay: revealReady ? 0.12 : 0, ease: heroEase }}
        >
          <SectionRevealSoft className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7c2d12] sm:mb-2.5 sm:text-[11px] sm:tracking-[0.2em]">
              Stack &amp; tools
            </p>
          </SectionRevealSoft>
          <SectionRevealSoft>
            <HeroTechMarquee className="mt-1 sm:mt-2" tone="orange" />
          </SectionRevealSoft>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="group/scroll focus-ring absolute bottom-5 left-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-2.5 rounded-lg px-3 py-1 text-[#b45309] transition hover:text-[#7c2d12]"
        aria-label="Scroll to about section"
        initial={false}
        animate={{
          opacity: revealReady ? 1 : 0,
          y: revealReady ? 0 : 8,
        }}
        transition={scrollCueTransition}
        onClick={(e) => {
          e.preventDefault()
          onNav('about')
        }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c2410c] transition group-hover/scroll:text-[#7c2d12] sm:text-[11px] sm:tracking-[0.24em]">
          Scroll to Explore
        </span>
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-[#c2410c]/35 bg-[#9a3412]/35 pt-2.5 transition group-hover/scroll:border-[#9a3412]/50 group-hover/scroll:bg-[#9a3412]/48">
          <span className="scroll-cue-dot h-5 w-[3px] rounded-full bg-[#fff7ed] will-change-transform" />
        </span>
      </motion.a>
    </section>
  )
}
