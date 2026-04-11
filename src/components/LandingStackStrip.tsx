import { motion } from 'framer-motion'
import { useLandingRevealReady } from '../context/LandingRevealContext'
import { HeroTechMarquee } from './HeroTechMarquee'
import { SectionRevealSoft } from './motion'

const stripEase = [0.22, 1, 0.36, 1] as const

/**
 * Tech stack row — lives between the hero and the rest of the site (not inside `#hero`).
 */
export function LandingStackStrip() {
  const revealReady = useLandingRevealReady()

  return (
    <motion.section
      aria-label="Stack and tools"
      className="relative z-[2] mt-6 w-full bg-transparent pb-10 pt-2 sm:mt-8 sm:pb-12 sm:pt-3"
      initial={false}
      animate={{
        opacity: revealReady ? 1 : 0,
        y: revealReady ? 0 : 10,
      }}
      transition={{ duration: 0.55, delay: revealReady ? 0.12 : 0, ease: stripEase }}
    >
      <SectionRevealSoft className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-2 text-center font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 sm:mb-2.5 sm:text-[11px] sm:tracking-[0.2em]">
          Stack &amp; tools
        </p>
      </SectionRevealSoft>
      <SectionRevealSoft>
        <HeroTechMarquee className="mt-1 sm:mt-2" tone="landing" />
      </SectionRevealSoft>
    </motion.section>
  )
}
