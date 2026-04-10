import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easePremium, fadeUpSimple, viewportReveal } from '../../lib/motion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  id?: string
}

/**
 * Soft fade-up when the block enters the viewport. One-shot, generous margin.
 */
export function SectionReveal({ children, className, id }: SectionRevealProps) {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.div
      id={id}
      className={className}
      variants={fadeUpSimple}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </motion.div>
  )
}

/** Lighter wrapper — opacity + tiny y only */
export function SectionRevealSoft({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportReveal}
      transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: easePremium }}
    >
      {children}
    </motion.div>
  )
}
