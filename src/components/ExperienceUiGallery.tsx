import { motion } from 'framer-motion'
import type { ExperienceUiShot } from '../lib/constants'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

type ExperienceUiGalleryProps = {
  shots: readonly ExperienceUiShot[]
  /** Match experience accordion panel styling */
  variant?: 'default' | 'experience'
}

export function ExperienceUiGallery({ shots, variant = 'default' }: ExperienceUiGalleryProps) {
  if (shots.length === 0) return null

  const isExperience = variant === 'experience'

  return (
    <motion.div
      className={`mt-6 border-t pt-6 ${isExperience ? 'border-white/10' : 'border-white/[0.06]'}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <p
        className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${isExperience ? 'text-[#f4c4a0]/90' : 'text-zinc-500'}`}
      >
        Product &amp; UI
      </p>
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shots.map((shot, index) => (
          <motion.li
            key={`${shot.caption}-${index}`}
            variants={fadeUp}
            className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px]"
          >
            <div
              className={`card-lift group overflow-hidden rounded-xl border shadow-lg shadow-black/20 transition-colors motion-reduce:hover:translate-y-0 ${isExperience ? 'border-white/10 bg-[#1a1510]/95 hover:border-[#fb923c]/45' : 'border-white/[0.08] bg-lp-bg/60 hover:border-lp-orange/40'}`}
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
                      ? 'from-[#2a2218]/90 to-[#14110c] text-zinc-400'
                      : 'from-zinc-900/80 to-zinc-950'
                  }`}
                >
                  <span className={`text-xs font-medium ${isExperience ? 'text-[#f4c4a0]/85' : 'text-zinc-400'}`}>
                    {shot.caption}
                  </span>
                  <span
                    className={`text-[11px] leading-relaxed ${isExperience ? 'text-zinc-500' : 'text-zinc-600'}`}
                  >
                    UI screenshot placeholder — set{' '}
                    <span className={`font-mono ${isExperience ? 'text-[#fb923c]/55' : 'text-zinc-500'}`}>imageSrc</span>{' '}
                    on this slot in{' '}
                    <span className={`font-mono ${isExperience ? 'text-[#fb923c]/55' : 'text-zinc-500'}`}>
                      constants.ts
                    </span>
                  </span>
                </div>
              )}
              <p
                className={`border-t px-3 py-2 text-[11px] ${isExperience ? 'border-white/10 text-[#f4c4a0]/80' : 'border-white/[0.06] text-zinc-500'}`}
              >
                {shot.caption}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
