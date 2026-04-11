import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsapClient'
import { DURATION, EASE, STAGGER } from '../lib/animationPresets'

type Options = {
  reducedMotion?: boolean
}

/**
 * Landing hero entrance: `[data-hero-line]` elements stagger in once on load.
 */
export function useHeroAnimations(scopeRef: RefObject<HTMLElement | null>, { reducedMotion = false }: Options = {}) {
  useGSAP(
    () => {
      if (!scopeRef.current) return

      const root = scopeRef.current
      const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]')
      if (lines.length === 0) return

      if (reducedMotion) {
        gsap.set(lines, { opacity: 1, y: 0 })
        return
      }

      // Avoid opacity:0 — React StrictMode revert can leave copy stuck invisible.
      gsap.fromTo(
        lines,
        { opacity: 0.2, y: 18, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.heroLine,
          ease: EASE.premium,
          stagger: STAGGER.heroLines,
          delay: 0.04,
        }
      )
    },
    { scope: scopeRef, dependencies: [reducedMotion] }
  )
}
