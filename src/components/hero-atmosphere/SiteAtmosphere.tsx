import { useRef } from 'react'
import { FilmGrainOverlay } from './FilmGrain'
import { HeroAtmosphere } from './HeroAtmosphere'

/**
 * Full-viewport dust + cursor trail. Above main (`z-10`) so the effect is visible on the landing
 * hero; wrapper stays `pointer-events-none` so clicks reach links and buttons underneath.
 */
export function SiteAtmosphere() {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={viewportRef}
      className="pointer-events-none fixed inset-0 z-[11] min-h-[100dvh] min-h-svh w-full overflow-hidden"
      aria-hidden
    >
      <HeroAtmosphere boundsRef={viewportRef} />
      <FilmGrainOverlay />
    </div>
  )
}
