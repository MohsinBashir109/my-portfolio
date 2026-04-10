import { motion } from 'framer-motion'
import { PERSON } from '../lib/constants'
import { fadeUp, staggerContainer } from '../lib/motion'
import { HeroPortrait } from './HeroPortrait'
import { HeroTechFloat } from './HeroTechFloat'
import { HeroTechMarquee } from './HeroTechMarquee'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const social = [
  { label: 'GitHub', href: PERSON.github },
  { label: 'LinkedIn', href: PERSON.linkedin },
  { label: 'Email', href: `mailto:${PERSON.email}` },
] as const

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-28"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-[1] mx-auto w-full max-w-5xl max-lg:flex max-lg:flex-col max-lg:gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-x-12 lg:gap-y-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-1 min-w-0 space-y-4 lg:order-none lg:col-start-1 lg:row-start-1 lg:space-y-5 lg:pr-2"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.25em] text-lp-orange"
          >
            {PERSON.location}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-[family-name:var(--font-family-display)] text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-zinc-50"
          >
            {PERSON.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-lg text-zinc-400 sm:text-xl">
            {PERSON.title}
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-zinc-500">
            I build and ship cross-platform mobile products with React Native, strong TypeScript practices, and pragmatic
            backend support—focused on clean UI, maintainable architecture, and reliable delivery.
          </motion.p>
        </motion.div>

        <aside className="order-2 flex w-full flex-col items-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-auto lg:flex-row lg:items-start lg:justify-end lg:justify-self-end lg:gap-5 lg:pt-2">
          <HeroPortrait />
          <HeroTechFloat />
        </aside>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="order-3 lg:order-none lg:col-start-1 lg:row-start-2"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              onClick={() => scrollToId('projects')}
              className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-6 py-3 text-sm font-semibold text-lp-bg shadow-lg shadow-lp-orange/18 ring-1 ring-transparent transition hover:bg-[#fdba74] hover:ring-lp-orange/50"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View projects
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 backdrop-blur-sm transition hover:border-lp-orange/50 hover:bg-lp-orange/10"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact me
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="order-4 lg:order-none lg:col-span-2">
          <div className="full-bleed relative z-[1] mt-4 lg:mt-2">
            <div className="mx-auto max-w-5xl px-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-lp-orange/90">
                Stack &amp; tools
              </p>
            </div>
            <HeroTechMarquee />
          </div>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="order-5 flex flex-wrap gap-3 lg:order-none lg:col-span-2"
          role="list"
          aria-label="Social links"
        >
          {social.map(({ label, href }) => (
            <li key={label}>
              <motion.a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-300 transition hover:border-lp-orange/40 hover:text-lp-orange"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {label}
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          className="flex h-9 w-5 justify-center rounded-full border border-lp-orange/35 bg-white/5 pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lp-orange" />
        </motion.span>
      </motion.a>
    </section>
  )
}
