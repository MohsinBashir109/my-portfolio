import { memo, useMemo } from 'react'
import { HERO_TECH } from '../lib/techIcons'
import { useMarqueePlayback } from '../hooks/useMarqueePlayback'

const TechPill = memo(function TechPill({
  name,
  Icon,
}: {
  name: string
  Icon: (typeof HERO_TECH)[number]['Icon']
}) {
  return (
    <span
      className="inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 shadow-none transition-colors duration-500 hover:border-white/12 hover:bg-white/[0.04] motion-safe:hover:border-lp-orange/25 sm:gap-2.5 sm:px-3.5 sm:py-2"
      aria-hidden="true"
    >
      <Icon className="h-[1rem] w-[1rem] shrink-0 text-lp-orange/80 sm:h-[1.125rem] sm:w-[1.125rem]" title={name} />
      <span className="text-[11px] font-medium tracking-wide text-zinc-500 sm:text-xs">{name}</span>
    </span>
  )
})

export function HeroTechMarquee({ className = '' }: { className?: string } = {}) {
  const { ref, playing, reducedMotion } = useMarqueePlayback()
  const row = useMemo(() => [...HERO_TECH, ...HERO_TECH], [])

  if (reducedMotion) {
    return (
      <div className={`relative flex flex-wrap justify-center gap-2.5 px-4 py-2 sm:gap-3 ${className}`} aria-hidden="true">
        {HERO_TECH.map(({ name, Icon }) => (
          <TechPill key={name} name={name} Icon={Icon} />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-lp-bg via-lp-bg/90 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-lp-bg via-lp-bg/90 to-transparent sm:w-28" />

      <div
        className="marquee-track flex gap-3 py-1.5 [pointer-events:none] sm:gap-4 [&>span]:pointer-events-auto"
        style={{
          animationDuration: '56s',
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        {row.map(({ name, Icon }, i) => (
          <TechPill key={`${name}-${i}`} name={name} Icon={Icon} />
        ))}
      </div>
    </div>
  )
}
