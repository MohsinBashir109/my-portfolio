/** Shared breakpoints (align with Tailwind sm/md/lg). */

export type AtmosphereMode = 'full' | 'reduced' | 'mobile'

export function getAtmosphereMode(): AtmosphereMode {
  if (typeof window === 'undefined') return 'full'
  const w = window.innerWidth
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (coarse || w < 768) return 'mobile'
  if (w < 1024) return 'reduced'
  return 'full'
}

/** Lower DPR = fewer pixels to fill on small GPUs / phones */
export function devicePixelRatioForMode(mode: AtmosphereMode): number {
  const raw = window.devicePixelRatio || 1
  if (mode === 'mobile') return Math.min(raw, 1.25)
  if (mode === 'reduced') return Math.min(raw, 1.5)
  return Math.min(raw, 2)
}

