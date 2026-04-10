import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUpBlur, fadeUpSimple, viewportReveal } from '../../lib/motion'

type FadeUpProps = {
  children: ReactNode
  className?: string
  /** Premium blur-to-clear; ignored when reduced motion */
  blur?: boolean
  /**
   * When nested under `StaggerGroup`, set true — only `variants` are applied (no `whileInView`).
   */
  staggerChild?: boolean
}

export function FadeUp({ children, className, blur = false, staggerChild = false }: FadeUpProps) {
  const reduce = useReducedMotion()
  const variants = blur && !reduce ? fadeUpBlur : fadeUpSimple

  if (staggerChild) {
    return (
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </motion.div>
  )
}
