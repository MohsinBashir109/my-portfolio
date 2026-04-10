import { HERO_TECH } from '../lib/techIcons'
import { useMarqueePlayback } from '../hooks/useMarqueePlayback'

function TechPill({ name, Icon }: { name: string; Icon: (typeof HERO_TECH)[number]['Icon'] }) {
  return (
    <span
      className="inline-flex shrink-0 cursor-default items-center gap-2.5 rounded-full border border-lp-orange/25 bg-white/[0.04] px-4 py-2.5 shadow-sm transition hover:border-lp-orange"
      aria-hidden="true"
    >
      <Icon className="h-5 w-5 text-lp-orange" title={name} />
      <span className="text-sm font-medium text-zinc-300">{name}</span>
    </span>
  )
}

export function HeroTechMarquee() {
  const { ref, playing, reducedMotion } = useMarqueePlayback()
  const row = [...HERO_TECH, ...HERO_TECH]

  if (reducedMotion) {
    return (
      <div className="relative mt-14 flex flex-wrap justify-center gap-3 px-4 py-2" aria-hidden="true">
        {HERO_TECH.map(({ name, Icon }) => (
          <TechPill key={name} name={name} Icon={Icon} />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative mt-14 w-full overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-gradient-to-r from-lp-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-gradient-to-l from-lp-bg to-transparent" />

      <div
        className="marquee-track flex gap-4 py-1 [pointer-events:none] [&>span]:pointer-events-auto"
        style={{
          animationDuration: '48s',
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
