import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'
import {
  devicePixelRatioForMode,
  getAtmosphereMode,
  type AtmosphereMode,
} from './atmosphereQuality'
import {
  ambientCountForMode,
  createAmbientParticles,
  drawAmbient,
  stepAmbient,
  type AmbientParticle,
} from './ambientLayer'
import {
  connectionLinkDistance,
  connectionNodeCount,
  createConnectionNodes,
  drawConnectionLines,
  type ConnectionPoint,
} from './connectionLines'
import { drawTrail, maxTrailForMode, spawnTrailBurst, stepTrail, type TrailParticle } from './trailLayer'

export type HeroAtmosphereProps = {
  boundsRef: RefObject<HTMLElement | null>
  parallaxRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Single canvas: ambient dust, static orange mesh, cursor trail.
 * Adaptive DPR, debounced resize, mode-aware counts; lighter work on mobile / tablet.
 */
export function HeroAtmosphere({ boundsRef, parallaxRef, className = '' }: HeroAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion() === true
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion
  const modeRef = useRef<AtmosphereMode>(getAtmosphereMode())
  const ambientRef = useRef<AmbientParticle[]>([])
  const trailRef = useRef<TrailParticle[]>([])
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = boundsRef.current
    if (!canvas || !host) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    } as CanvasRenderingContext2DSettings)
    if (!ctx) return

    let cw = 0
    let ch = 0
    let dpr = 1
    let connectionNodes: ConnectionPoint[] = []
    let lastMode: AtmosphereMode = getAtmosphereMode()
    let resizeRaf = 0

    const syncSize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (w < 1 || h < 1) return

      const m = getAtmosphereMode()
      const sizeChanged = w !== cw || h !== ch
      const modeChanged = m !== lastMode

      if (sizeChanged || modeChanged) {
        cw = w
        ch = h
        lastMode = m
        modeRef.current = m
        dpr = devicePixelRatioForMode(m)
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ambientRef.current = createAmbientParticles(w, h, ambientCountForMode(m))
        connectionNodes = createConnectionNodes(w, h, connectionNodeCount(m))
      } else {
        modeRef.current = m
      }
    }

    const scheduleSync = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        syncSize()
      })
    }

    let tx = host.clientWidth * 0.5
    let ty = host.clientHeight * 0.42
    let sx = tx
    let sy = ty
    let prevSx = sx
    let prevSy = sy

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === 'visible'
    }

    const onWindowResize = () => {
      modeRef.current = getAtmosphereMode()
      scheduleSync()
    }

    const ro = new ResizeObserver(() => scheduleSync())

    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onWindowResize, { passive: true })
    ro.observe(host)
    syncSize()

    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (!visibleRef.current) return

      const w = cw
      const h = ch
      if (w < 1 || h < 1) return

      const mode = modeRef.current
      const maxTrail = maxTrailForMode(mode)
      const smooth = mode === 'full' ? 0.08 : mode === 'reduced' ? 0.1 : 0.12
      sx += (tx - sx) * smooth
      sy += (ty - sy) * smooth

      const driftScale = mode === 'mobile' ? 0.55 : mode === 'reduced' ? 0.75 : 1
      const rm = reducedMotionRef.current
      stepAmbient(ambientRef.current, w, h, t, driftScale, rm)

      const trailPool = trailRef.current
      if (rm || mode === 'mobile' || maxTrail < 1) {
        trailPool.length = 0
      } else {
        const dx = sx - prevSx
        const dy = sy - prevSy
        const speed = Math.hypot(dx, dy)
        const lagX = sx - dx * 2.8
        const lagY = sy - dy * 2.8
        const intensityScale = mode === 'reduced' ? 0.72 : 1
        if (speed > 0.22) {
          const intensity = Math.min(1.25, speed * 0.095) * intensityScale
          spawnTrailBurst(
            trailPool,
            lagX,
            lagY,
            2.6 + Math.min(speed * 0.26, 7.5),
            intensity,
            maxTrail,
          )
        }
        stepTrail(trailPool, mode === 'reduced' ? 0.014 : 0.022, maxTrail)
      }
      prevSx = sx
      prevSy = sy

      if (parallaxRef?.current && !rm) {
        const nx = (sx / w - 0.5) * 2
        const ny = (sy / h - 0.5) * 2
        const px = nx * (mode === 'full' ? 16 : 10)
        const py = ny * (mode === 'full' ? 13 : 8)
        parallaxRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`
      } else if (parallaxRef?.current) {
        parallaxRef.current.style.transform = 'translate3d(0,0,0)'
      }

      const simpleAmbient = mode === 'mobile' || mode === 'reduced'

      ctx.clearRect(0, 0, w, h)
      drawAmbient(ctx, ambientRef.current, t, simpleAmbient)
      if (!rm && mode !== 'mobile' && maxTrail > 0) {
        drawTrail(ctx, trailPool)
      }
      drawConnectionLines(ctx, connectionNodes, connectionLinkDistance(w, h, mode), mode)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(resizeRaf)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onWindowResize)
      ro.disconnect()
      trailRef.current = []
      if (parallaxRef?.current) parallaxRef.current.style.transform = 'translate3d(0,0,0)'
    }
  }, [boundsRef, parallaxRef])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full min-h-[100dvh] min-h-svh ${reducedMotion ? 'opacity-[0.4]' : 'opacity-[1]'} ${className}`}
      aria-hidden
    />
  )
}
