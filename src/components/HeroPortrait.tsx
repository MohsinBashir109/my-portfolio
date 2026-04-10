import { motion } from 'framer-motion'
import { PERSON } from '../lib/constants'

export function HeroPortrait() {
  const src = PERSON.heroPortraitSrc

  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-[1] mx-auto w-full max-w-[min(100%,280px)] shrink-0 lg:mx-0 lg:max-w-[300px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-lp-orange/40 bg-zinc-900/60 shadow-[0_0_60px_-12px_rgba(251,146,60,0.22),0_25px_50px_-12px_rgba(0,0,0,0.55)] ring-1 ring-lp-orange/15">
        {src ? (
          <img
            src={src}
            alt={PERSON.heroPortraitAlt}
            className="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lp-orange">Portrait</span>
            <p className="text-sm leading-relaxed text-zinc-500">Your photo goes here.</p>
            <p className="text-xs leading-relaxed text-zinc-600">
              Add a file to <span className="font-mono text-zinc-500">public/</span> (e.g.{' '}
              <span className="font-mono text-lp-orange/80">me.jpg</span>), then in{' '}
              <span className="font-mono text-zinc-500">constants.ts</span> set{' '}
              <span className="font-mono text-lp-orange/80">heroPortraitSrc: &apos;/me.jpg&apos;</span>.
            </p>
          </div>
        )}
      </div>
      <figcaption className="sr-only">{PERSON.heroPortraitAlt}</figcaption>
    </motion.figure>
  )
}
