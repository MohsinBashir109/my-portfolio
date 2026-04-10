/** Ambient dust / ember field — warm, low contrast */

export type AmbientParticle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseA: number
  phase: number
}

export function ambientCountForMode(mode: 'full' | 'reduced' | 'mobile'): number {
  if (mode === 'mobile') return 18
  if (mode === 'reduced') return 32
  return 48
}

export function createAmbientParticles(width: number, height: number, count: number): AmbientParticle[] {
  const out: AmbientParticle[] = []
  for (let i = 0; i < count; i++) {
    out.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      r: 0.65 + Math.random() * 2,
      baseA: 0.055 + Math.random() * 0.065,
      phase: Math.random() * Math.PI * 2,
    })
  }
  return out
}

export function stepAmbient(
  particles: AmbientParticle[],
  width: number,
  height: number,
  t: number,
  driftScale: number,
  reducedMotion: boolean,
) {
  const wobble = reducedMotion ? 0 : 0.22
  for (const p of particles) {
    if (!reducedMotion) {
      p.vx += (Math.random() - 0.5) * 0.002 * driftScale
      p.vy += (Math.random() - 0.5) * 0.002 * driftScale
      p.vx *= 0.998
      p.vy *= 0.998
    }
    p.x += p.vx * driftScale
    p.y += p.vy * driftScale
    if (reducedMotion) {
      p.x += Math.sin(t * 0.0004 + p.phase) * 0.02
      p.y += Math.cos(t * 0.00035 + p.phase) * 0.02
    } else {
      p.x += Math.sin(t * 0.00025 + p.phase) * wobble * driftScale
      p.y += Math.cos(t * 0.00022 + p.phase) * wobble * driftScale
    }
    if (p.x < -4) p.x = width + 4
    if (p.x > width + 4) p.x = -4
    if (p.y < -4) p.y = height + 4
    if (p.y > height + 4) p.y = -4
  }
}

export function drawAmbient(
  ctx: CanvasRenderingContext2D,
  particles: AmbientParticle[],
  t: number,
  simpleGradient: boolean,
) {
  const prev = ctx.globalCompositeOperation
  ctx.globalCompositeOperation = 'lighter'
  for (const p of particles) {
    const tw = 0.82 + Math.sin(t * 0.0014 + p.phase) * 0.15
    const a = p.baseA * tw
    const rad = p.r * 4.2
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
    if (simpleGradient) {
      g.addColorStop(0, `rgba(255, 210, 170, ${a * 0.85})`)
      g.addColorStop(1, 'rgba(251, 146, 60, 0)')
    } else {
      g.addColorStop(0, `rgba(255, 218, 175, ${a * 0.95})`)
      g.addColorStop(0.35, `rgba(251, 146, 60, ${a * 0.52})`)
      g.addColorStop(1, 'rgba(251, 146, 60, 0)')
    }
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = prev
}
