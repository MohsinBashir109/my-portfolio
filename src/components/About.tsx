import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function About() {
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.article
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.08] bg-lp-elevated/40 p-8 shadow-xl shadow-black/25 backdrop-blur-md transition hover:border-lp-orange/25"
          >
            <h3 className="text-lg font-semibold text-zinc-100">Professional summary</h3>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I&apos;m a React Native developer with experience shipping production mobile apps and supporting backend
              workflows. My strengths sit at the intersection of{' '}
              <strong className="font-medium text-zinc-200">React Native</strong>,{' '}
              <strong className="font-medium text-zinc-200">JavaScript &amp; TypeScript</strong>, and pragmatic{' '}
              <strong className="font-medium text-zinc-200">Node.js / Express</strong> integrations—paired with careful
              UI execution, reusable components, and maintainable state management.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I care about clarity under pressure: predictable architecture, thoughtful API boundaries, and polish that
              recruiters and clients can feel in the details.
            </p>
          </motion.article>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {[
              { k: 'Mobile', v: 'Cross-platform delivery with React Native and disciplined UI craft.' },
              { k: 'Engineering', v: 'Type-safe patterns, scalable components, and pragmatic performance work.' },
              { k: 'Collaboration', v: 'Clear communication, iterative shipping, and production-minded decisions.' },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-white/[0.06] bg-lp-elevated/50 p-5 backdrop-blur-sm transition hover:border-lp-orange/50 hover:shadow-[0_0_24px_-8px_rgba(251,146,60,0.25)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-lp-orange">{item.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.v}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
