import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useLandingRevealReady } from '../context/LandingRevealContext'
import { PERSON } from '../lib/constants'
import { LANDING_SLASH_NAV } from '../lib/landingNav'
import { easePremium, heroFadeUp, heroStaggerContainer, staggerContainerInstant } from '../lib/motion'
import { HeroContentDecorations } from './HeroContentDecorations'
import { LandingHeroClayShapes } from './LandingHeroClayShapes'

const heroSocial = [
  { label: 'GitHub', href: PERSON.github },
  { label: 'LinkedIn', href: PERSON.linkedin },
  { label: 'Email', href: `mailto:${PERSON.email}` },
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Shared typography; layout (block vs flex) is applied in `HeroAnimatedHeadline`. */
const heroHeadlineTypography =
  'text-center text-white w-full min-w-0 font-geist text-[clamp(2.1rem,min(5.75rem,calc((100svw-2.5rem)/8)),5.75rem)] font-bold uppercase leading-[1.05] tracking-[0.055em] sm:tracking-[0.06em]'

const heroNameLetters: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.032, delayChildren: 0.04 },
  },
}

const heroNameLetter: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easePremium },
  },
}

const heroWords: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
}

const heroWord: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easePremium },
  },
}

const HeroAnimatedHeadline = memo(function HeroAnimatedHeadline({
  id,
  text,
  reducedMotion,
}: {
  id: string
  text: string
  reducedMotion: boolean
}) {
  const layout = reducedMotion
    ? 'block whitespace-nowrap text-center'
    : 'flex flex-nowrap justify-center'
  const headlineClass = `${heroHeadlineTypography} ${layout}`

  const letters = useMemo(
    () =>
      text.split('').map((char, i) => ({
        key: `${i}-${char === ' ' ? 'sp' : char}`,
        char: char === ' ' ? '\u00A0' : char,
      })),
    [text],
  )

  if (reducedMotion) {
    return (
      <motion.h1 id={id} variants={heroFadeUp} className={headlineClass}>
        {text}
      </motion.h1>
    )
  }
  return (
    <motion.h1 id={id} variants={heroNameLetters} className={headlineClass}>
      {letters.map(({ key, char }) => (
        <motion.span key={key} variants={heroNameLetter} className="shrink-0 text-white">
          {char}
        </motion.span>
      ))}
    </motion.h1>
  )
})

const HeroAnimatedTitle = memo(function HeroAnimatedTitle({
  text,
  reducedMotion,
  className,
}: {
  text: string
  reducedMotion: boolean
  className?: string
}) {
  const centered = className?.includes('text-center') ? className : `${className ?? ''} text-center`.trim()

  const segments = useMemo(() => text.split(/(\s*•\s*)/), [text])

  if (reducedMotion) {
    return (
      <motion.p variants={heroFadeUp} className={centered}>
        {text}
      </motion.p>
    )
  }
  return (
    <motion.p variants={heroWords} className={centered}>
      {segments.map((segment, i) =>
        /^\s*•\s*$/.test(segment) ? (
          <span key={i} className="inline-block px-1 text-slate-500" aria-hidden>
            •
          </span>
        ) : (
          <motion.span key={i} variants={heroWord} className="inline-block">
            {segment}
          </motion.span>
        ),
      )}
    </motion.p>
  )
})

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
        : { delay: revealReady ? 0.85 : 0, duration: 0.55, ease: easePremium },
    [prefersReducedMotion, revealReady],
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-[1] flex min-h-dvh flex-col overflow-x-visible bg-bg-main text-slate-50"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top left, #1a2238 0%, #0b1020 45%, #070b14 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(17,24,39,0.85),transparent_55%)]" />

      <LandingHeroClayShapes />
      <HeroContentDecorations />

      <header className="relative z-20 bg-transparent py-5 pl-3 pr-4 sm:py-6 sm:pl-4 sm:pr-6 lg:py-7 lg:pl-5 lg:pr-8">
        <div className="flex w-full items-center gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 justify-start">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                onNav('hero')
              }}
              className="group flex min-w-0 items-center text-left font-geist text-xl font-semibold tracking-tight text-white transition sm:text-2xl lg:text-[1.65rem] lg:leading-none"
            >
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 sm:gap-x-2">
              <span className="text-white transition group-hover:text-brand-primary">{logoFirst}</span>
              {logoRest ? (
                <span className="text-white transition group-hover:text-slate-100">{logoRest}</span>
              ) : null}
              <span className="text-slate-400">.</span>
              <span className="font-mono text-brand-highlight/90 transition group-hover:text-brand-highlight">_</span>
            </span>
            </a>
          </div>

          <nav
            className="hidden shrink-0 items-center justify-center gap-x-7 lg:flex xl:gap-x-9"
            aria-label="Primary"
          >
            {LANDING_SLASH_NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNav(id)
                }}
                className="group font-mono text-sm font-medium uppercase tracking-[0.1em] text-slate-200 transition hover:text-brand-primary lg:text-[0.9375rem] lg:tracking-[0.11em]"
              >
                <span className="text-brand-highlight/75 transition group-hover:text-brand-highlight">// </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-surface/60 font-mono text-sm font-medium text-slate-100 transition hover:border-brand-primary/40 hover:bg-bg-elevated/90 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              {menuOpen ? '×' : '≡'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 360 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.28, ease: easePremium }}
            style={{ overflow: 'hidden' }}
            className="relative z-20 border-y border-border-subtle bg-bg-surface px-5 py-4 font-mono text-slate-100 lg:hidden"
            aria-label="Mobile primary"
          >
            <ul className="mx-auto flex max-w-6xl flex-col items-center gap-3.5 text-center">
              {LANDING_SLASH_NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block text-base font-medium uppercase tracking-[0.14em] text-slate-200 transition hover:text-slate-50"
                    onClick={(e) => {
                      e.preventDefault()
                      onNav(id)
                    }}
                  >
                    <span className="text-brand-highlight/80">// </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 pb-20 pt-4 text-center sm:px-6 sm:py-10 sm:pb-24 md:px-6 md:py-12 md:pb-28 lg:px-10 lg:py-14 lg:pb-32">
          <div className="relative z-[2] mx-auto w-full min-w-0 max-w-2xl shrink-0 px-2 text-center sm:px-3 md:max-w-[min(100%,38rem)] lg:max-w-2xl">
            <div className="flex w-full flex-col items-center gap-5 text-center sm:gap-6">
              <motion.div
                style={heroContentStyle}
                className="flex w-full flex-col items-center gap-5 text-center sm:gap-6 transform-gpu"
              >
                <motion.div
                  variants={heroStaggerContainer}
                  initial="hidden"
                  animate={revealReady ? 'visible' : 'hidden'}
                  className="flex w-full flex-col items-center gap-5 text-center sm:gap-6"
                >
                  <div className="order-1 w-full min-w-0 px-1 text-center sm:px-0">
                    <HeroAnimatedHeadline
                      id="hero-heading"
                      text={PERSON.name}
                      reducedMotion={prefersReducedMotion}
                    />
                  </div>

                  <HeroAnimatedTitle
                    text={PERSON.title}
                    reducedMotion={prefersReducedMotion}
                    className="order-2 mx-auto w-full max-w-xl text-center text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-slate-300 sm:text-[0.8125rem] sm:tracking-[0.22em]"
                  />
                </motion.div>
              </motion.div>

              <motion.ul
                variants={prefersReducedMotion ? staggerContainerInstant : heroStaggerContainer}
                initial="hidden"
                animate={revealReady ? 'visible' : 'hidden'}
                className="flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center"
                aria-label="Social links"
              >
                {heroSocial.map(({ label, href }, i) => (
                  <motion.li key={label} variants={heroFadeUp} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-2 hidden h-3 w-px bg-border-subtle sm:inline" aria-hidden />
                    ) : null}
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="focus-ring rounded-md px-2 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-slate-400 underline-offset-4 transition hover:text-brand-highlight hover:underline sm:text-[13px]"
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="group/scroll focus-ring absolute bottom-5 left-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-2.5 rounded-lg px-3 py-1 text-slate-500 transition hover:text-brand-highlight"
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
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 transition group-hover/scroll:text-brand-highlight sm:text-[11px] sm:tracking-[0.24em]">
          Scroll to Explore
        </span>
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-border-subtle bg-bg-surface/50 pt-2.5 transition group-hover/scroll:border-brand-primary/45 group-hover/scroll:bg-bg-elevated/60">
          <span className="scroll-cue-dot h-5 w-[3px] rounded-full bg-slate-200 will-change-transform" />
        </span>
      </motion.a>
    </section>
  )
}
