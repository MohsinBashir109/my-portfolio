import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsapClient'
import { DURATION, EASE, REVEAL_OFFSET_Y, scrollTriggerReveal, STAGGER } from '../lib/animationPresets'

type Options = {
  reducedMotion?: boolean
  disabled?: boolean
  /** Override ScrollTrigger `start` */
  start?: string
  stagger?: number
  duration?: number
  /** Initial translateY in px */
  fromY?: number
}

/**
 * One-shot scroll reveal: `[data-reveal]` descendants fade up.
 * Scoped to `containerRef` for cleanup via gsap.context.
 */
export function useSectionReveal(
  containerRef: RefObject<HTMLElement | null>,
  {
    reducedMotion = false,
    disabled = false,
    start = scrollTriggerReveal.start,
    stagger = STAGGER.sectionChildren,
    duration = DURATION.sectionReveal,
    fromY = REVEAL_OFFSET_Y,
  }: Options = {}
) {
  useGSAP(
    () => {
      if (disabled || !containerRef.current) return

      const root = containerRef.current
      const nodes = root.querySelectorAll<HTMLElement>('[data-reveal]')
      if (nodes.length === 0) return

      if (reducedMotion) {
        gsap.set(nodes, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        nodes,
        { opacity: 0, y: fromY, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: EASE.premium,
          stagger,
          scrollTrigger: {
            trigger: root,
            start,
            end: scrollTriggerReveal.end,
            once: scrollTriggerReveal.once,
            toggleActions: scrollTriggerReveal.toggleActions,
          },
        }
      )
    },
    { scope: containerRef, dependencies: [reducedMotion, disabled, start, stagger, duration, fromY] }
  )
}
