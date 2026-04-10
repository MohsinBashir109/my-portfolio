/** Cursor-driven soft smoke wake */

export type TrailMode = 'full' | 'reduced' | 'mobile'

export function maxTrailForMode(mode: TrailMode): number {
  if (mode === 'mobile') return 0
  if (mode === 'reduced') return 115
  return 160
}

export type TrailParticle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  spin: number
}

export function spawnTrailBurst(
  pool: TrailParticle[],
  x: number,
  y: number,
  spread: number,
  intensity: number,
  maxTrail: number,
) {
  if (maxTrail < 1) return
  const n = Math.floor(1 + intensity * 2.85)
  for (let i = 0; i < n && pool.length < maxTrail; i++) {
    const ang = Math.random() * Math.PI * 2
    const dist = Math.random() * spread
    pool.push({
      x: x + Math.cos(ang) * dist,
      y: y + Math.sin(ang) * dist,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      life: 0.94 + Math.random() * 0.08,
      size: 1.35 + Math.random() * 3.8,
      spin: (Math.random() - 0.5) * 0.048,
    })
  }
}

export function stepTrail(pool: TrailParticle[], turbulence: number, maxTrail: number) {
  for (let i = pool.length - 1; i >= 0; i--) {
    const p = pool[i]!
    p.life -= 0.008 + p.size * 0.0012
    p.vx += (Math.random() - 0.5) * turbulence
    p.vy += (Math.random() - 0.5) * turbulence
    p.vx *= 0.97
    p.vy *= 0.97
    p.x += p.vx
    p.y += p.vy
    p.size += p.spin
    if (p.life <= 0 || p.size < 0.3) pool.splice(i, 1)
  }
  while (maxTrail > 0 && pool.length > maxTrail) pool.shift()
}

export function drawTrail(ctx: CanvasRenderingContext2D, pool: TrailParticle[]) {
  const prev = ctx.globalCompositeOperation
  ctx.globalCompositeOperation = 'lighter'
  for (const p of pool) {
    const a = p.life * p.life * 0.19
    if (a < 0.002) continue
    const rad = p.size * 5.4
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
    g.addColorStop(0, `rgba(255, 230, 200, ${a * 0.58})`)
    g.addColorStop(0.45, `rgba(251, 146, 60, ${a * 0.36})`)
    g.addColorStop(1, 'rgba(120, 55, 20, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = prev
}
