import { memo } from 'react'
import { SKILLS, skillsMarqueeLabelsFlat } from '../lib/constants'
import { useMarqueePlayback } from '../hooks/useMarqueePlayback'
import { iconForSkill } from '../lib/techIcons'

const SkillPill = memo(function SkillPill({ label }: { label: string }) {
  const Icon = iconForSkill(label)
  return (
    <span className="skills-marquee-pill chip-lift pointer-events-auto inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-lp-orange/45 bg-lp-bg/95 px-4 py-2 shadow-sm ring-1 ring-lp-orange/15 transition hover:border-lp-orange hover:ring-lp-orange/35 motion-reduce:hover:scale-100">
      {Icon ? <Icon className="skills-marquee-icon h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className="text-sm font-medium text-zinc-100/90">{label}</span>
    </span>
  )
})

type MarqueeRowProps = {
  labels: readonly string[]
  duration: number
  reverse?: boolean
  playing: boolean
}

function MarqueeRow({ labels, duration, reverse, playing }: MarqueeRowProps) {
  const track = [...labels, ...labels]

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-lp-bg to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-lp-bg to-transparent sm:w-24" />

      <div
        className={`marquee-track flex gap-3 [pointer-events:none] [&_.skills-marquee-pill]:pointer-events-auto ${reverse ? 'marquee-track--reverse' : ''}`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        {track.map((label, i) => (
          <SkillPill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  )
}

const ROW_ONE = [...SKILLS.frontend, ...SKILLS.mobile] as const
const ROW_TWO = [...SKILLS.backend, ...SKILLS.tools] as const

export function SkillsMarquee() {
  const { ref, playing, reducedMotion } = useMarqueePlayback()

  if (reducedMotion) {
    return (
      <div
        className="full-bleed flex flex-wrap justify-center gap-2 px-4 py-6"
        aria-hidden="true"
      >
        {skillsMarqueeLabelsFlat().map((label) => (
          <SkillPill key={label} label={label} />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="full-bleed relative" aria-hidden="true">
      <MarqueeRow labels={ROW_ONE} duration={52} playing={playing} />
      <MarqueeRow labels={ROW_TWO} duration={58} reverse playing={playing} />
    </div>
  )
}

export { skillsMarqueeLabelsFlat }
