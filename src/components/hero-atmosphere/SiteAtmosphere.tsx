import { useRef } from 'react'
import { FilmGrainOverlay } from './FilmGrain'
import { HeroAtmosphere } from './HeroAtmosphere'

/**
 * Full-viewport dust + cursor trail (same canvas as hero). Sits under page content (`z-[5]`).
 * Section wrappers use transparent bg where needed so the effect reads through “empty” areas.
 */
export function SiteAtmosphere() {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={viewportRef}
      className="pointer-events-none fixed inset-0 z-[5] min-h-[100dvh] min-h-svh w-full overflow-hidden"
      aria-hidden
    >
      <HeroAtmosphere boundsRef={viewportRef} />
      <FilmGrainOverlay />
    </div>
  )
}
