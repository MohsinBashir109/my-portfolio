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
          className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-lp-orange"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        id={id}
        variants={fadeUpSimple}
        className="font-[family-name:var(--font-family-display)] text-3xl font-normal tracking-tight text-zinc-100 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={fadeUpSimple} className="mt-3 text-base leading-relaxed text-zinc-400">
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
