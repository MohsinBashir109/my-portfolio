import { useEffect, useRef, useState } from 'react'
import { FilmGrainOverlay } from './FilmGrain'
import { HeroAtmosphere } from './HeroAtmosphere'

/**
 * Full-viewport dust + cursor trail. Above main (`z-10`) so the effect is visible on the landing
 * hero; wrapper stays `pointer-events-none` so clicks reach links and buttons underneath.
 */
export function SiteAtmosphere() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      {
        root: null,
        rootMargin: '180px 0px 180px 0px',
        threshold: 0.08,
      },
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)')
    const narrow = window.matchMedia('(max-width: 767px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(!(coarse.matches || narrow.matches || reduced.matches))
    sync()

    coarse.addEventListener('change', sync)
    narrow.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      coarse.removeEventListener('change', sync)
      narrow.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={viewportRef}
      className={`pointer-events-none fixed inset-0 z-[11] min-h-[100dvh] min-h-svh w-full overflow-hidden transition-opacity duration-300 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden
    >
      <HeroAtmosphere boundsRef={viewportRef} active={active} />
      {active ? <FilmGrainOverlay /> : null}
    </div>
  )
}
