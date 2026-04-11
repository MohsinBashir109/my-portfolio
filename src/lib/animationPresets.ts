/** Calm easing — no elastic / bounce */
export const EASE = {
  premium: 'power3.out',
  smooth: 'power2.out',
  none: 'none',
} as const

export const DURATION = {
  sectionReveal: 0.88,
  sectionRevealShort: 0.72,
  heroLine: 0.72,
  micro: 0.35,
} as const

/** Vertical offset for scroll reveals (px) */
export const REVEAL_OFFSET_Y = 24

/** Stagger between sibling reveals */
export const STAGGER = {
  sectionChildren: 0.08,
  headingLines: 0.1,
  heroLines: 0.09,
} as const

export const scrollTriggerReveal = {
  start: 'top 84%',
  end: 'bottom top',
  once: true,
  toggleActions: 'play none none none' as const,
}

export const scrollTriggerRevealEarly = {
  start: 'top 88%',
  end: 'bottom top',
  once: true,
  toggleActions: 'play none none none' as const,
}

/** Hero content fades slightly while scrolling past hero */
export const scrollTriggerHeroContent = {
  start: 'top top',
  end: 'bottom start',
  scrub: 1.1,
}
