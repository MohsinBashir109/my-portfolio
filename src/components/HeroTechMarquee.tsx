import { memo, useMemo } from 'react'
import { HERO_TECH } from '../lib/techIcons'
import { useMarqueePlayback } from '../hooks/useMarqueePlayback'

export type HeroTechMarqueeTone = 'dark' | 'landing'

const TechPill = memo(function TechPill({
  name,
  Icon,
  tone,
}: {
  name: string
  Icon: (typeof HERO_TECH)[number]['Icon']
  tone: HeroTechMarqueeTone
}) {
  const pill =
    tone === 'landing'
      ? 'border-border-subtle/50 bg-transparent shadow-none hover:border-brand-primary/35 hover:bg-white/[0.06] motion-safe:hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]'
      : 'border-white/[0.06] bg-white/[0.025] shadow-none hover:border-white/12 hover:bg-white/[0.04] motion-safe:hover:border-brand-primary/25'

  return (
    <span
      className={`inline-flex shrink-0 cursor-default items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-500 sm:gap-2.5 sm:px-3.5 sm:py-2 ${pill}`}
      aria-hidden="true"
    >
      <Icon
        className={`h-[1rem] w-[1rem] shrink-0 sm:h-[1.125rem] sm:w-[1.125rem] ${tone === 'landing' ? 'text-brand-highlight' : 'text-brand-primary/80'}`}
        title={name}
      />
      <span
        className={`font-mono text-[11px] font-medium tracking-wide sm:text-xs ${tone === 'landing' ? 'text-slate-300' : 'text-zinc-500'}`}
      >
        {name}
      </span>
    </span>
  )
})

type HeroTechMarqueeProps = {
  className?: string
  /** `landing` matches dark hero; pills use surface + cyan tag signal. */
  tone?: HeroTechMarqueeTone
}

export function HeroTechMarquee({ className = '', tone = 'dark' }: HeroTechMarqueeProps = {}) {
  const { ref, playing, reducedMotion } = useMarqueePlayback()
  const row = useMemo(() => [...HERO_TECH, ...HERO_TECH], [])
  const fadeFrom =
    tone === 'landing' ? 'from-bg-main via-bg-main/93' : 'from-lp-bg via-lp-bg/90'

  if (reducedMotion) {
    return (
      <div className={`relative flex flex-wrap justify-center gap-2.5 px-4 py-2 sm:gap-3 ${className}`} aria-hidden="true">
        {HERO_TECH.map(({ name, Icon }) => (
          <TechPill key={name} name={name} Icon={Icon} tone={tone} />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-28`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-28`}
      />

      <div
        className="marquee-track flex gap-3 py-1.5 [pointer-events:none] sm:gap-4 [&>span]:pointer-events-auto"
        style={{
          animationDuration: '56s',
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        {row.map(({ name, Icon }, i) => (
          <TechPill key={`${name}-${i}`} name={name} Icon={Icon} tone={tone} />
        ))}
      </div>
    </div>
  )
}
