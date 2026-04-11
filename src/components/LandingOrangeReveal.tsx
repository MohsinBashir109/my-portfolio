import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from 'react'
import { LandingRevealReadyContext } from '../context/LandingRevealContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import styles from './LandingOrangeReveal.module.css'

const SESSION_KEY = 'mb-landing-orange-reveal-v1'

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
  /** True while the portfolio gate is covering the screen — orange waits until it closes. */
  gateBlocking: boolean
  children: ReactNode
}

/**
 * Solid orange first frame, then iris clip-path into the landing hero (plexus + glow underneath).
 * Hero content should read `useLandingRevealReady()` so stagger runs after the peel.
 */
export function LandingOrangeReveal({ gateBlocking, children }: LandingOrangeRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const skipFromSession = useMemo(() => readSkipOrangeIntro(), [])
  const reduced = readReducedMotionSync() || prefersReducedMotion
  const skipIntro = reduced || skipFromSession
  const [revealReady, setRevealReady] = useState(
    () => readReducedMotionSync() || skipFromSession,
  )
  const [overlayMounted, setOverlayMounted] = useState(
    () => !readReducedMotionSync() && !skipFromSession && !gateBlocking,
  )
  const [irisOpen, setIrisOpen] = useState(false)
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introFinishedRef = useRef(false)

  const finishIntro = useCallback(() => {
    if (introFinishedRef.current) return
    introFinishedRef.current = true
    setOverlayMounted(false)
    setRevealReady(true)
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const onOverlayTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== 'clip-path') return
      if (!irisOpen) return
      finishIntro()
    },
    [irisOpen, finishIntro],
  )

  useEffect(() => {
    if (skipIntro) {
      setOverlayMounted(false)
      setRevealReady(true)
      return
    }
    if (gateBlocking) {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
      }
      setOverlayMounted(false)
      setIrisOpen(false)
      return
    }

    introFinishedRef.current = false
    setOverlayMounted(true)
    setIrisOpen(false)
    setRevealReady(false)

    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIrisOpen(true))
      })
    }, 420)

    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
      }
    }
  }, [gateBlocking, skipIntro])

  return (
    <LandingRevealReadyContext.Provider value={revealReady}>
      {children}
      {overlayMounted ? (
        <div
          className={`${styles.overlay} ${irisOpen ? styles.overlayIris : ''}`}
          onTransitionEnd={onOverlayTransitionEnd}
          aria-hidden
        >
          <div className={styles.overlayShine} />
          <div className={styles.overlayGrid} />
        </div>
      ) : null}
    </LandingRevealReadyContext.Provider>
  )
}
