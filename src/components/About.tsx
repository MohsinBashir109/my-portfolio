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
            className="card-lift rounded-2xl border border-border-subtle bg-bg-surface/90 p-8 shadow-xl shadow-black/25 transition-colors hover:border-brand-primary/30 hover:shadow-[0_0_40px_-14px_rgba(79,140,255,0.18)] motion-reduce:hover:translate-y-0 lg:col-start-1 lg:row-start-1 lg:self-start"
          >
            <h3 className="font-geist text-base font-semibold text-slate-50 sm:text-lg">Professional summary</h3>
            <p className="mt-4 text-[13px] font-normal leading-relaxed text-slate-400 sm:text-sm">
              I&apos;m a React Native developer with experience shipping production mobile apps and supporting backend
              workflows. My strengths sit at the intersection of{' '}
              <strong className="font-medium text-slate-200">React Native</strong>,{' '}
              <strong className="font-medium text-slate-200">JavaScript &amp; TypeScript</strong>, and pragmatic{' '}
              <strong className="font-medium text-slate-200">Node.js / Express</strong> integrations—paired with careful UI
              execution, reusable components, and maintainable state management.
            </p>
            <p className="mt-4 text-[13px] font-normal leading-relaxed text-slate-400 sm:text-sm">
              I care about clarity under pressure: predictable architecture, thoughtful API boundaries, and polish that
              recruiters and clients can feel in the details.
            </p>
          </motion.article>

          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.k}
              variants={fadeUpSimple}
              className={`card-lift rounded-xl border border-border-subtle bg-bg-surface/90 p-5 transition-colors hover:border-brand-primary/40 hover:shadow-[0_0_32px_-10px_rgba(124,58,237,0.2)] motion-reduce:hover:translate-y-0 lg:col-start-2 ${ROW_START[i]}`}
            >
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-brand-highlight">{item.k}</p>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-slate-400 sm:text-sm">{item.v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
