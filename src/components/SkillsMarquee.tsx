import { motion } from 'framer-motion'
import { SKILLS } from '../lib/constants'
import { iconForSkill } from '../lib/techIcons'

function SkillPill({ label }: { label: string }) {
  const Icon = iconForSkill(label)
  return (
    <span className="skills-marquee-pill pointer-events-auto inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-lp-orange/45 bg-lp-bg/95 px-4 py-2 shadow-sm ring-1 ring-lp-orange/15 backdrop-blur-sm transition hover:border-lp-orange hover:ring-lp-orange/35 hover:shadow-[0_0_20px_-6px_rgba(251,146,60,0.35)]">
      {Icon ? <Icon className="skills-marquee-icon h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className="text-sm font-medium text-zinc-100/90">{label}</span>
    </span>
  )
}

type MarqueeRowProps = {
  labels: readonly string[]
  /** Seconds for one full loop */
  duration?: number
  reverse?: boolean
}

function MarqueeRow({ labels, duration = 50, reverse = false }: MarqueeRowProps) {
  const track = [...labels, ...labels]

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-lp-bg to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-lp-bg to-transparent sm:w-24" />

      <motion.div
        className="flex w-max gap-3 [pointer-events:none] [&_.skills-marquee-pill]:pointer-events-auto"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {track.map((label, i) => (
          <SkillPill key={`${label}-${i}`} label={label} />
        ))}
      </motion.div>
    </div>
  )
}

const ROW_ONE = [...SKILLS.frontend, ...SKILLS.mobile] as const
const ROW_TWO = [...SKILLS.backend, ...SKILLS.tools] as const

export function SkillsMarquee() {
  return (
    <div className="full-bleed relative" aria-hidden="true">
      <MarqueeRow labels={ROW_ONE} duration={52} />
      <MarqueeRow labels={ROW_TWO} duration={58} reverse />
    </div>
  )
}

/** Flat list for screen readers (avoids hiding all skills inside decorative marquee) */
export function skillsMarqueeLabelsFlat(): string[] {
  return [...ROW_ONE, ...ROW_TWO]
}
