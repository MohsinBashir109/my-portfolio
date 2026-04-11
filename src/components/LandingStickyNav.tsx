import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { LANDING_SLASH_NAV } from '../lib/landingNav'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const navEase = [0.22, 1, 0.36, 1] as const

/**
 * Fixed strip: same `// label` style as the hero desktop nav, with frosted blur.
 * Appears after the user scrolls past the hero fold.
 */
export function LandingStickyNav() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const threshold = () => Math.min(window.innerHeight * 0.42, 520)
    let raf = 0
    let last = false
    const apply = () => {
      raf = 0
      const next = window.scrollY > threshold()
      if (next !== last) {
        last = next
        setVisible(next)
      }
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const onNav = useCallback((e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToId(id)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.header
          key="landing-sticky-nav"
          aria-label="Section navigation"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: navEase }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] border-b border-white/[0.06] bg-bg-main/35 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg-main/[0.22]"
        >
          <nav
            className="pointer-events-auto mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-3 sm:gap-x-8 sm:px-6 sm:py-4 md:gap-x-10 lg:gap-x-12"
            aria-label="Primary"
          >
            {LANDING_SLASH_NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => onNav(e, id)}
                className="group font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-slate-200 transition hover:text-brand-primary sm:text-sm sm:tracking-[0.11em] lg:text-[0.9375rem] lg:tracking-[0.11em]"
              >
                <span className="text-brand-highlight/75 transition group-hover:text-brand-highlight">
                  //{' '}
                </span>
                {label}
              </a>
            ))}
          </nav>
        </motion.header>
      ) : null}
    </AnimatePresence>
  )
}
