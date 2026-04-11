import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { useCustomCursor } from '../../hooks/useCustomCursor'
import { useFinePointer } from '../../hooks/useFinePointer'
import { useNodeNetwork } from '../../hooks/useNodeNetwork'
import { GatePage } from './GatePage'
import './portfolioGate.css'

export const PORTFOLIO_GATE_SESSION_KEY = 'mb-portfolio-gate-dismissed'

type PortfolioGateProps = {
  /** When the gate sequence has finished (after fill burst + handoff delay). */
  onComplete: () => void
}

export function PortfolioGate({ onComplete }: PortfolioGateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const { cursorRef, ringRef } = useCustomCursor()
  const finePointer = useFinePointer()

  useNodeNetwork(canvasRef, mouseRef)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleEnter = useCallback(() => {
    try {
      sessionStorage.setItem(PORTFOLIO_GATE_SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    /** Same frame as fillBurst completion — circle already covers the viewport. */
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (finePointer) {
      document.body.style.cursor = 'none'
    }
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      document.body.style.cursor = ''
    }
  }, [finePointer])

  return (
    <div className="portfolio-gate-root" onMouseMove={handleMouseMove}>
      {finePointer ? (
        <>
          <div ref={cursorRef} className="gate-cursor" aria-hidden />
          <div ref={ringRef} className="gate-cursor-ring" aria-hidden />
        </>
      ) : null}

      <canvas ref={canvasRef} className="gate-bg-canvas" aria-hidden />

      <div id="fill-layer">
        <div id="fill-circle" />
      </div>

      <GatePage onEnter={handleEnter} />
    </div>
  )
}
