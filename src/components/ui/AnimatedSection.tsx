import { type ReactNode, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  id?: string
  /** ScrollTrigger `start` */
  start?: string
  stagger?: number
  duration?: number
  fromY?: number
  disabled?: boolean
}

/**
 * Wrapper that reveals `[data-reveal]` descendants on scroll (one-shot).
 */
export function AnimatedSection({
  children,
  className,
  id,
  start,
  stagger,
  duration,
  fromY,
  disabled,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  useSectionReveal(ref, {
    reducedMotion,
    disabled,
    start,
    stagger,
    duration,
    fromY,
  })

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}
