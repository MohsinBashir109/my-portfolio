export const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)'

export function countUp(element: HTMLElement | null, target: number, suffix = '', duration = 900) {
  if (!element) return
  let start = 0
  const step = target / (duration / 16)
  const timer = window.setInterval(() => {
    start += step
    if (start >= target) {
      start = target
      window.clearInterval(timer)
    }
    element.textContent = `${Math.floor(start)}${suffix}`
  }, 16)
}

export function staggerReveal(ids: string[], baseDelay = 0, step = 150) {
  ids.forEach((id, i) => {
    window.setTimeout(() => {
      document.getElementById(id)?.classList.add('visible')
    }, baseDelay + i * step)
  })
}

/** Gate → landing: circle expand duration (must match CSS transition on `#fill-circle`). */
export const GATE_FILL_EXPAND_MS = 680

export function fillBurst(
  originX: number,
  originY: number,
  color = '#0b1020',
  onMidpoint?: (() => void) | null,
  onComplete?: (() => void) | null,
) {
  const fill = document.getElementById('fill-layer')
  const circle = document.getElementById('fill-circle')
  if (!fill || !circle || !(circle instanceof HTMLElement)) {
    onComplete?.()
    return
  }

  let reduceMotion = false
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    /* ignore */
  }

  const expandMs = reduceMotion ? 1 : GATE_FILL_EXPAND_MS

  const maxR =
    Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    ) * 2.45

  fill.style.opacity = '1'
  circle.style.left = `${originX}px`
  circle.style.top = `${originY}px`
  circle.style.width = '0px'
  circle.style.height = '0px'
  circle.style.background = color
  circle.style.transition = `width ${expandMs}ms ${EASE_IN_OUT}, height ${expandMs}ms ${EASE_IN_OUT}`

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.style.width = `${maxR}px`
      circle.style.height = `${maxR}px`
    })
  })

  window.setTimeout(() => {
    onMidpoint?.()
  }, Math.round(expandMs * 0.52))

  /** Full-screen brand fill is the handoff frame — unmount gate here (no extra fade) so landing overlay can continue. */
  window.setTimeout(() => {
    onComplete?.()
  }, expandMs)
}
