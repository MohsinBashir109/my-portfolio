import type { AtmosphereMode } from './atmosphereQuality'

export type ConnectionPoint = { x: number; y: number }

/** Tuned per breakpoint — fewer edges on small screens = less O(n²) work */
export function connectionNodeCount(mode: AtmosphereMode): number {
  if (mode === 'mobile') return 14
  if (mode === 'reduced') return 24
  return 36
}

export function createConnectionNodes(width: number, height: number, count: number): ConnectionPoint[] {
  const nodes: ConnectionPoint[] = []
  for (let i = 0; i < count; i++) {
    nodes.push({ x: Math.random() * width, y: Math.random() * height })
  }
  return nodes
}

/**
 * Static cybersecurity-style mesh. No sqrt in inner loop (uses d² falloff).
 */
export function drawConnectionLines(
  ctx: CanvasRenderingContext2D,
  nodes: ConnectionPoint[],
  maxDistance: number,
  mode: AtmosphereMode,
) {
  if (nodes.length < 2) return
  const maxD2 = maxDistance * maxDistance
  const lineW = mode === 'mobile' ? 0.85 : mode === 'reduced' ? 0.95 : 1
  const rOuter = mode === 'mobile' ? 1.35 : 1.75
  const rInner = mode === 'mobile' ? 0.65 : 0.9

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]!
      const b = nodes[j]!
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d2 = dx * dx + dy * dy
      if (d2 > maxD2 || d2 < 16) continue
      const t = 1 - d2 / maxD2
      const alpha = 0.14 + t * t * 0.38
      ctx.strokeStyle = `rgba(251, 146, 60, ${alpha})`
      ctx.lineWidth = lineW
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
  }

  for (const p of nodes) {
    ctx.fillStyle = 'rgba(251, 146, 60, 0.55)'
    ctx.beginPath()
    ctx.arc(p.x, p.y, rOuter, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(255, 237, 213, 0.35)'
    ctx.beginPath()
    ctx.arc(p.x, p.y, rInner, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

/** Link distance scales with the shorter viewport side — clamps for tiny / ultra-wide */
export function connectionLinkDistance(width: number, height: number, mode: AtmosphereMode): number {
  const base = Math.min(width, height)
  const ratio = mode === 'mobile' ? 0.28 : mode === 'reduced' ? 0.31 : 0.34
  const min = mode === 'mobile' ? 88 : 100
  const max = mode === 'mobile' ? 200 : mode === 'reduced' ? 280 : 340
  return Math.min(max, Math.max(min, base * ratio))
}
