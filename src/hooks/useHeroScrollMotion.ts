import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsapClient'
import { scrollTriggerHeroContent } from '../lib/animationPresets'

type Options = {
  reducedMotion?: boolean
}

/**
 * Subtle scroll-linked fade / lift on hero copy and glow wrapper.
 */
export function useHeroScrollMotion(
  sectionRef: RefObject<HTMLElement | null>,
  { reducedMotion = false }: Options = {}
) {
  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return

      const section = sectionRef.current
      const content = section.querySelector<HTMLElement>('[data-hero-scroll]')
      const glow = section.querySelector<HTMLElement>('[data-hero-glow]')

      const ctx = gsap.context(() => {
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 1, y: 0, scale: 1, force3D: true },
            {
              opacity: 0.38,
              y: -18,
              scale: 0.982,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: scrollTriggerHeroContent.start,
                end: scrollTriggerHeroContent.end,
                scrub: scrollTriggerHeroContent.scrub,
              },
            }
          )
        }

        if (glow) {
          gsap.fromTo(
            glow,
            { y: 0 },
            {
              y: 28,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: scrollTriggerHeroContent.start,
                end: 'bottom top',
                scrub: 1.4,
              },
            }
          )
        }
      }, section)

      return () => ctx.revert()
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  )
}
