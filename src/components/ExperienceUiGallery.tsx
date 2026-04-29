import { motion, useReducedMotion } from 'framer-motion'
import type { ExperienceUiShot } from '../lib/constants'
import {
  fadeUpBlur,
  fadeUpSimple,
  fadeIn,
  staggerCards,
  staggerContainerInstant,
  staggerRow,
  staggerRowInstant,
  viewportRevealTight,
} from '../lib/motion'

type ExperienceUiGalleryProps = {
  shots: readonly ExperienceUiShot[]
  /** Match experience accordion panel styling */
  variant?: 'default' | 'experience'
}

export function ExperienceUiGallery({ shots, variant = 'default' }: ExperienceUiGalleryProps) {
  const reduce = useReducedMotion()
  if (shots.length === 0) return null

  const isExperience = variant === 'experience'
  const stagger = reduce ? staggerContainerInstant : staggerCards
  const row = reduce ? staggerRowInstant : staggerRow
  const itemVariants = reduce ? fadeUpSimple : fadeUpBlur

  return (
    <motion.div
      className={`mt-6 border-t border-border-subtle pt-6`}
      variants={stagger}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportRevealTight}
    >
      <motion.p
        variants={fadeIn}
        className={`mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.2em] sm:text-[10px] ${isExperience ? 'text-brand-highlight/90' : 'text-slate-500'}`}
      >
        Product &amp; UI
      </motion.p>
      <motion.ul
        variants={row}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot, index) => (
          <motion.li
            key={`${shot.caption}-${index}`}
            variants={itemVariants}
            className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px]"
          >
            <div
              className={`card-lift group overflow-hidden rounded-xl border shadow-lg shadow-black/20 transition-colors motion-reduce:hover:translate-y-0 ${isExperience ? 'border-border-subtle bg-bg-surface/95 hover:border-brand-primary/40' : 'border-border-subtle bg-bg-main/80 hover:border-brand-primary/35'}`}
            >
              {shot.imageSrc ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={shot.imageSrc}
                    alt={shot.caption}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className={`flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-gradient-to-br p-4 text-center ${
                    isExperience
                      ? 'from-bg-elevated/95 to-bg-main text-slate-400'
                      : 'from-zinc-900/80 to-zinc-950'
                  }`}
                >
                  <span className={`text-[11px] font-medium sm:text-xs ${isExperience ? 'text-slate-300' : 'text-zinc-400'}`}>
                    {shot.caption}
                  </span>
                  <span
                    className={`text-[10px] leading-relaxed sm:text-[11px] ${isExperience ? 'text-zinc-500' : 'text-zinc-600'}`}
                  >
                    UI screenshot placeholder — set{' '}
                    <span className={`font-mono ${isExperience ? 'text-brand-primary/70' : 'text-zinc-500'}`}>imageSrc</span>{' '}
                    on this slot in{' '}
                    <span className={`font-mono ${isExperience ? 'text-brand-primary/70' : 'text-zinc-500'}`}>
                      constants.ts
                    </span>
                  </span>
                </div>
              )}
              <p
                className={`border-t px-3 py-2 text-[10px] sm:text-[11px] ${isExperience ? 'border-border-subtle text-slate-400' : 'border-border-subtle text-slate-500'}`}
              >
                {shot.caption}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
