import type { Variants } from 'framer-motion'

/** Refined ease — calm, “expensive” deceleration */
export const easePremium = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easePremium },
  },
}

/** Landing hero — clearer entrance, still smooth */
export const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

/** No stagger — use when `prefers-reduced-motion` */
export const staggerContainerInstant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
}

export const heroStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

/** Section cards / list rows — slightly tighter */
export const staggerCards: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

/** Eyebrow → title → subtitle */
export const staggerHeading: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.02 },
  },
}

/** Horizontal row of cards — nest inside a parent stagger */
export const staggerRow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

export const staggerRowInstant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.58, ease: easePremium },
  },
}

/** Subtle blur-to-clear — skip when reduced motion (use `fadeUpSimple` instead) */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.64, ease: easePremium },
  },
}

export const fadeUpSimple: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: easePremium },
  },
}

/** Horizontal line grow — parent needs `origin-left` */
export const dividerReveal: Variants = {
  hidden: { scaleX: 0.35, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easePremium },
  },
}

/** Slightly earlier trigger for section bodies */
export const viewportReveal = {
  once: true as const,
  margin: '-8% 0px -10% 0px' as const,
  amount: 0.14 as const,
}

/** Chips / small rows */
export const viewportRevealTight = {
  once: true as const,
  margin: '-4% 0px -6% 0px' as const,
  amount: 0.2 as const,
}
