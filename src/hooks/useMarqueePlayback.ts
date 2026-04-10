import { useEffect, useRef, useState } from 'react'

/**
 * Pauses infinite CSS animations when the block is off-screen (saves GPU/CPU).
 * Respects prefers-reduced-motion (no animation when reduced).
 */
export function useMarqueePlayback() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { root: null, rootMargin: '120px 0px', threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const playing = inView && !reducedMotion

  return { ref, playing, reducedMotion }
}
