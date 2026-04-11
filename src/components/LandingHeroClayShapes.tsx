import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const clayShadowSoft =
  'shadow-[0_10px_28px_-10px_rgba(79,140,255,0.2),inset_0_1px_0_rgba(255,255,255,0.35)]'

type ClayMode = 'float' | 'drift' | 'pulse'

const modeClass: Record<ClayMode, string> = {
  float: 'landing-loop landing-clay-float',
  drift: 'landing-loop landing-clay-drift',
  pulse: 'landing-loop landing-clay-pulse',
}

function ClayShape({
  className,
  duration,
  delay = 0,
  reduced,
  mode = 'float',
  children,
}: {
  className: string
  duration: number
  delay?: number
  reduced: boolean
  mode?: ClayMode
  children: ReactNode
}) {
  return (
    <div
      className={`${className}${reduced ? '' : ` ${modeClass[mode]}`}`}
      style={
        reduced
          ? undefined
          : {
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }
      }
    >
      {children}
    </div>
  )
}

/**
 * Large soft blobs only — full-bleed behind the hero. Small UI chips live in
 * `HeroContentDecorations` inside the headline column so they never overlap.
 * Motion uses CSS keyframes (compositor) instead of Framer repeat loops.
 */
export function LandingHeroClayShapes() {
  const reduced = useReducedMotion() === true

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-x-hidden overflow-y-visible select-none [contain:layout_paint]"
      aria-hidden
    >
      <ClayShape
        className={`absolute -left-[8%] top-[14%] h-[min(42vw,280px)] w-[min(42vw,280px)] rounded-[42%_58%_48%_52%/48%_42%_58%_52%] bg-gradient-to-br from-white/50 to-white/25 ${clayShadowSoft}`}
        duration={9}
        delay={0}
        reduced={reduced}
      >
        <span />
      </ClayShape>

      <ClayShape
        className={`absolute -bottom-[6%] -right-[6%] h-[min(38vw,220px)] w-[min(38vw,220px)] rounded-[55%_45%_52%_48%/44%_56%_46%_54%] bg-gradient-to-tl from-white/38 to-white/16 ${clayShadowSoft}`}
        duration={11}
        delay={0.35}
        reduced={reduced}
        mode="drift"
      >
        <span />
      </ClayShape>

      <ClayShape
        className={`absolute left-1/2 top-1/2 h-[min(55vw,320px)] w-[min(55vw,320px)] -translate-x-1/2 -translate-y-[42%] rounded-[50%_50%_48%_52%/46%_54%_50%_50%] bg-gradient-to-b from-white/22 to-white/8 ${clayShadowSoft} opacity-60`}
        duration={14}
        delay={0.2}
        reduced={reduced}
        mode="pulse"
      >
        <span />
      </ClayShape>
    </div>
  )
}
