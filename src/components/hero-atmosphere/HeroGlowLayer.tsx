import { motion } from 'framer-motion'
import { memo } from 'react'

type Props = { reducedMotion: boolean }

/** Large warm bloom behind the headline — Framer pulse; optional parallax from parent `transform`. */
export const HeroGlowLayer = memo(function HeroGlowLayer({ reducedMotion }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible"
      aria-hidden="true"
    >
      <div className="relative h-[min(32rem,92vw)] w-[min(32rem,92vw)] shrink-0">
        <div
          className="absolute inset-[-8%] rounded-full opacity-90 blur-[100px] sm:blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse 62% 52% at 50% 48%, color-mix(in srgb, var(--color-lp-orange) 32%, transparent) 0%, transparent 58%)',
          }}
        />
        <motion.div
          className="absolute inset-[6%] rounded-full blur-[48px] sm:blur-[56px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(253, 186, 116, 0.2) 0%, rgba(251, 146, 60, 0.1) 45%, transparent 70%)',
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.52, 0.82, 0.52],
                  scale: [0.97, 1.05, 0.97],
                }
          }
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-[18%] rounded-full bg-gradient-to-br from-amber-200/22 via-lp-orange/26 to-orange-700/14 blur-2xl"
          animate={reducedMotion ? undefined : { opacity: [0.42, 0.7, 0.42] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        />
      </div>
    </div>
  )
})
