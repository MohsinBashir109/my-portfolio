import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin top reading-progress bar. Cheap: one scaled div driven by scrollYProgress.
 */
export function ScrollProgressBar() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
    restDelta: 0.0004,
  })

  if (reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brand-primary/90 via-brand-highlight/80 to-brand-secondary/75"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
