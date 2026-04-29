import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarsePointer || reduceMotion) return

    let raf = 0
    let x = -999
    let y = -999

    const apply = () => {
      raf = 0
      const t = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      cursor.style.transform = t
      ring.style.transform = t
    }

    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(apply)
    }

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      schedule()
    }
    const down = () => {
      cursor.style.width = '6px'
      cursor.style.height = '6px'
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(249,115,22,0.9)'
    }
    const up = () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'rgba(249,115,22,0.5)'
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
    }
  }, [])

  return { cursorRef, ringRef }
}
