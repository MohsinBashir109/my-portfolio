import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  staggerCards,
  staggerContainer,
  staggerContainerInstant,
  staggerHeading,
  viewportReveal,
} from '../../lib/motion'

type Mode = 'default' | 'cards' | 'heading'

type StaggerGroupProps = {
  children: ReactNode
  className?: string
  mode?: Mode
}

function pickVariants(reducedMotion: boolean, mode: Mode) {
  if (reducedMotion) return staggerContainerInstant
  if (mode === 'cards') return staggerCards
  if (mode === 'heading') return staggerHeading
  return staggerContainer
}

/**
 * Staggers direct motion children that define `variants` (e.g. FadeUp or fadeUp item variants).
 */
export function StaggerGroup({ children, className, mode = 'default' }: StaggerGroupProps) {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.div
      className={className}
      variants={pickVariants(reducedMotion, mode)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </motion.div>
  )
}
