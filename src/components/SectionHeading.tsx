import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionHeading({ id, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12 max-w-2xl"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-lp-orange">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="font-[family-name:var(--font-family-display)] text-3xl font-normal tracking-tight text-zinc-100 sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-base leading-relaxed text-zinc-400">{subtitle}</p> : null}
    </motion.div>
  )
}
