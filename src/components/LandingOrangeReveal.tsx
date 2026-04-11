import { useEffect, useMemo, type ReactNode } from 'react'
import { LandingRevealReadyContext } from '../context/LandingRevealContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SESSION_KEY = 'mb-landing-reveal-v2'

function readSkipOrangeIntro() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function readReducedMotionSync(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

type LandingOrangeRevealProps = {
  /** True while the portfolio gate is covering the screen — hero stagger waits until it closes. */
  gateBlocking: boolean
  children: ReactNode
}

/**
 * Gate already ends on a full-screen dark fill (`fillBurst`); no extra overlay fade — that was
 * causing a visible hitch (flash → second dark layer → fade). Hero reveals as soon as the gate unmounts.
 */
export function LandingOrangeReveal({ gateBlocking, children }: LandingOrangeRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const skipFromSession = useMemo(() => readSkipOrangeIntro(), [])
  const reduced = readReducedMotionSync() || prefersReducedMotion
  const skipIntro = reduced || skipFromSession

  const revealReady = skipIntro || !gateBlocking

  useEffect(() => {
    if (skipIntro) return
    if (gateBlocking) return
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [gateBlocking, skipIntro])

  return (
    <LandingRevealReadyContext.Provider value={revealReady}>
      {children}
    </LandingRevealReadyContext.Provider>
  )
}
