import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
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
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
    }
  }, [])

  return { cursorRef, ringRef }
}
