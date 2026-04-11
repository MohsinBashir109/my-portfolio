import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react'

type MousePos = { x: number; y: number }

export function useNodeNetwork(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mouseRef: MutableRefObject<MousePos>,
) {
  const nodesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number }[]
  >([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initNodes = () => {
      const W = canvas.width
      const H = canvas.height
      const count = Math.min(Math.floor((W * H) / 10000), 130)
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.8,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const mouse = mouseRef.current
      const nodes = nodesRef.current

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#080808'
      ctx.fillRect(0, 0, W, H)

      const glow = ctx.createRadialGradient(W / 2, H * 0.65, 0, W / 2, H * 0.65, H * 0.6)
      glow.addColorStop(0, 'rgba(249,115,22,0.07)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 110) {
          n.x -= dx * 0.004
          n.y -= dy * 0.004
        }
      })

      const MAX_DIST = 165
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.38
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249,115,22,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      nodes.forEach((n) => {
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.sqrt(dx * dx + dy * dy)
        const bright = d < 130 ? 0.9 : 0.35

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${bright})`
        ctx.fill()

        if (d < 130) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(249,115,22,0.12)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [canvasRef, mouseRef])
}
