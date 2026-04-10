import { motion } from 'framer-motion'
import { HERO_TECH } from '../lib/techIcons'

function TechPill({ name, Icon }: { name: string; Icon: (typeof HERO_TECH)[number]['Icon'] }) {
  return (
    <span
      className="inline-flex shrink-0 cursor-default items-center gap-2.5 rounded-full border border-lp-orange/25 bg-white/[0.04] px-4 py-2.5 shadow-sm backdrop-blur-md transition hover:border-lp-orange hover:shadow-[0_0_20px_-6px_rgba(251,146,60,0.35)]"
      aria-hidden="true"
    >
      <Icon className="h-5 w-5 text-lp-orange" title={name} />
      <span className="text-sm font-medium text-zinc-300">{name}</span>
    </span>
  )
}

export function HeroTechMarquee() {
  const row = [...HERO_TECH, ...HERO_TECH]

  return (
    <div className="relative mt-14 w-full overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-gradient-to-r from-lp-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-gradient-to-l from-lp-bg to-transparent" />

      <motion.div
        className="flex w-max gap-4 py-1 [pointer-events:none] [&>span]:pointer-events-auto"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
      >
        {row.map(({ name, Icon }, i) => (
          <TechPill key={`${name}-${i}`} name={name} Icon={Icon} />
        ))}
      </motion.div>
    </div>
  )
}
