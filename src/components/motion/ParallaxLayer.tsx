import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

type ParallaxLayerProps = {
  children: ReactNode
  className?: string
  /** Max vertical shift in px at bottom of page */
  yRange?: number
}

/**
 * Gentle document-scroll parallax for decorative layers only (transform-only).
 */
export function ParallaxLayer({ children, className, yRange = 36 }: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion() === true
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, yRange])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} style={{ y, willChange: 'transform' }}>
      {children}
    </motion.div>
  )
}
