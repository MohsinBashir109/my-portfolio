import { motion, useReducedMotion } from 'framer-motion'
import { HERO_TECH } from '../lib/techIcons'

const FLOAT_INDICES = [0, 2, 4, 6, 8, 10] as const

/** Staggered tech icons — sits beside the portrait on large screens */
export function HeroTechFloat() {
  const reducedMotion = useReducedMotion() === true

  return (
    <div
      className="pointer-events-none relative hidden h-[min(380px,50vh)] w-40 shrink-0 lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {FLOAT_INDICES.map((techIndex, i) => {
          const { Icon, name } = HERO_TECH[techIndex]!
          const top = `${6 + i * 14}%`
          const delay = i * 0.35
          return (
            <motion.div
              key={name + techIndex}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-lp-orange/35 bg-lp-bg/75 shadow-[0_0_24px_-4px_rgba(251,146,60,0.28)] backdrop-blur-md"
              style={{ left: i % 2 === 0 ? '0%' : '38%', top }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: reducedMotion ? 0 : [0, -6, 0],
              }}
              transition={{
                opacity: { delay: 0.4 + i * 0.08, duration: 0.5 },
                scale: { delay: 0.4 + i * 0.08, duration: 0.5 },
                y: reducedMotion
                  ? { duration: 0 }
                  : { delay: 1.2 + delay, duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Icon className="h-6 w-6 text-lp-orange" title={name} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
