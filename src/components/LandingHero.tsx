import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { PERSON } from '../lib/constants'

/** Order matches page scroll: skills block sits above about */
const LANDING_NAV = [
  { id: 'hero', label: 'home' },
  { id: 'skills', label: 'expertise' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
] as const

const FEATURED_BRANDS = [
  'React Native',
  'TypeScript',
  'Expo',
  'Node.js',
  'GitHub',
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function HeroScene3D() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[min(52vh,440px)] w-[min(96vw,640px)] -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: '1000px' }}
      aria-hidden="true"
    >
      {/* Warm center glow (sun) */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-100 via-orange-400 to-orange-600 opacity-[0.85] blur-[2px] shadow-[0_0_100px_50px_rgba(255,150,60,0.42),0_0_160px_80px_rgba(255,120,40,0.18)]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/25 blur-3xl" />

      {/* Floating cubes & cylinder */}
      <motion.div
        className="absolute left-[8%] top-[28%] h-16 w-16 rounded-lg border border-white/15 bg-gradient-to-br from-zinc-800/95 to-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.5)]"
        style={{ transform: 'rotateX(52deg) rotateY(-28deg) rotateZ(4deg)' }}
        animate={{ y: [0, -12, 0], rotateY: [-28, -22, -28] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[6%] top-[22%] h-14 w-[4.5rem] rounded-md border border-white/12 bg-gradient-to-br from-zinc-800/90 to-zinc-950 shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
        style={{ transform: 'rotateX(48deg) rotateY(36deg)' }}
        animate={{ y: [0, 10, 0], rotateY: [36, 30, 36] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[14%] h-[3.25rem] w-[3.25rem] rounded-lg border border-white/10 bg-zinc-900/95 shadow-lg"
        style={{ transform: 'rotateX(58deg) rotateZ(-8deg)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[12%] h-12 w-12 rounded-lg border border-lp-accent/25 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-[0_0_36px_-6px_rgba(110,193,228,0.32)]"
        style={{ transform: 'rotateX(50deg) rotateY(18deg)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
      />
      {/* Cylinder */}
      <motion.div
        className="absolute left-1/2 top-[18%] h-20 w-11 -translate-x-1/2 rounded-full border border-white/12 bg-gradient-to-b from-zinc-700/80 via-zinc-900 to-zinc-950 shadow-[inset_0_-4px_12px_rgba(0,0,0,0.6)]"
        style={{ transform: 'rotateX(68deg)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[38%] top-[52%] h-10 w-10 rounded-md border border-white/10 bg-gradient-to-br from-zinc-800/85 to-black/80"
        style={{ transform: 'rotateX(44deg) rotateY(-12deg)' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
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
          className="flex min-h-[2.5rem] flex-1 snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURED_BRANDS.map((name) => (
            <span
              key={name}
              className="snap-center whitespace-nowrap font-[family-name:var(--font-poppins)] text-base font-semibold uppercase tracking-[0.12em] text-white/35 sm:text-lg"
            >
              {name}
            </span>
          ))}
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
      className="relative z-[1] flex min-h-svh flex-col overflow-hidden bg-lp-bg"
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
            className="relative z-20 border-y border-white/[0.06] bg-lp-bg/98 px-5 py-4 font-[family-name:var(--font-roboto-mono)] backdrop-blur-xl lg:hidden"
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
        <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-8 pt-4 sm:px-8">
          <HeroScene3D />

          <div className="relative z-[2] mx-auto max-w-4xl text-center">
            <motion.h1
              className="font-[family-name:var(--font-poppins)] text-[clamp(2.25rem,10vw,4.25rem)] font-bold uppercase leading-[1.05] tracking-[0.06em] text-white drop-shadow-[0_2px_48px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {PERSON.name.toUpperCase()}
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-roboto-mono)] text-[10px] font-normal uppercase leading-relaxed tracking-[0.28em] text-white/85 sm:text-[11px] sm:tracking-[0.22em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={(e) => {
          e.preventDefault()
          onNav('skills')
        }}
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/25 bg-black/25 pt-2.5 backdrop-blur-sm transition group-hover/scroll:border-lp-orange/60 group-hover/scroll:bg-lp-orange/10">
          <motion.span
            className="h-5 w-[3px] rounded-full bg-lp-orange"
            animate={{ y: [0, 10, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
