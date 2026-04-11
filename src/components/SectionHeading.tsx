import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, fadeUpSimple, staggerContainerInstant, staggerHeading, viewportReveal } from '../lib/motion'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionHeading({ id, eyebrow, title, subtitle }: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const container = reduce ? staggerContainerInstant : staggerHeading

  return (
    <motion.div
      className="mb-12 max-w-2xl"
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReveal}
    >
      {eyebrow ? (
        <motion.p
          variants={fadeIn}
          className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-highlight"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        id={id}
        variants={fadeUpSimple}
        className="font-geist text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={fadeUpSimple} className="mt-3 text-base font-normal leading-relaxed text-slate-400">
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
