import { motion, useReducedMotion } from 'framer-motion'
import { dividerReveal, viewportReveal } from '../lib/motion'

export function SectionDivider() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-1" aria-hidden="true">
      <motion.div
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-lp-orange/30 to-transparent"
        variants={dividerReveal}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportReveal}
      />
    </div>
  )
}
