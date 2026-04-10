import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import {
  fadeUp,
  fadeUpSimple,
  staggerCards,
  staggerContainerInstant,
  viewportReveal,
} from '../lib/motion'
import { SectionHeading } from './SectionHeading'

const HIGHLIGHTS = [
  { k: 'Mobile', v: 'Cross-platform delivery with React Native and disciplined UI craft.' },
  { k: 'Engineering', v: 'Type-safe patterns, scalable components, and pragmatic performance work.' },
  { k: 'Collaboration', v: 'Clear communication, iterative shipping, and production-minded decisions.' },
] as const

const ROW_START = ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3'] as const

export function About() {
  const reducedMotion = useReducedMotion() === true
  const stagger = useMemo(
    () => (reducedMotion ? staggerContainerInstant : staggerCards),
    [reducedMotion]
  )

  return (
    <section id="about" className="relative px-6 py-24 sm:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="Building products end-to-end"
          subtitle="A concise snapshot of how I work and what I optimize for when shipping mobile software."
        />

        <motion.div
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
          variants={stagger}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReveal}
        >
          <motion.article
            variants={fadeUp}
            className="card-lift rounded-2xl border border-white/[0.08] bg-lp-elevated/40 p-8 shadow-xl shadow-black/25 transition-colors hover:border-lp-orange/30 hover:shadow-lg hover:shadow-lp-orange/[0.06] motion-reduce:hover:translate-y-0 lg:col-start-1 lg:row-start-1 lg:self-start"
          >
            <h3 className="text-lg font-semibold text-zinc-100">Professional summary</h3>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I&apos;m a React Native developer with experience shipping production mobile apps and supporting backend
              workflows. My strengths sit at the intersection of{' '}
              <strong className="font-medium text-zinc-200">React Native</strong>,{' '}
              <strong className="font-medium text-zinc-200">JavaScript &amp; TypeScript</strong>, and pragmatic{' '}
              <strong className="font-medium text-zinc-200">Node.js / Express</strong> integrations—paired with careful UI
              execution, reusable components, and maintainable state management.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I care about clarity under pressure: predictable architecture, thoughtful API boundaries, and polish that
              recruiters and clients can feel in the details.
            </p>
          </motion.article>

          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.k}
              variants={fadeUpSimple}
              className={`card-lift rounded-xl border border-white/[0.06] bg-lp-elevated/50 p-5 transition-colors hover:border-lp-orange/45 hover:shadow-[0_0_28px_-10px_rgba(251,146,60,0.22)] motion-reduce:hover:translate-y-0 lg:col-start-2 ${ROW_START[i]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-lp-orange">{item.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
