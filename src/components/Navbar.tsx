import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { NAV_SECTION_IDS, NAV_SECTIONS } from '../lib/constants'
import { useActiveSection } from '../hooks/useActiveSection'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(NAV_SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onNavClick = useCallback((id: string) => {
    scrollToId(id)
    setOpen(false)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-lp-bg/85 shadow-lg shadow-black/25 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            onNavClick('hero')
          }}
          className="focus-ring group flex items-center gap-2.5 rounded-lg"
        >
          <img
            src="/favicon.svg"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            aria-hidden
          />
          <span className="hidden text-sm font-semibold text-[#fdba74] transition group-hover:text-white sm:inline">
            Mohsin Bashir
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeId === id
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavClick(id)
                }}
                className="focus-ring relative rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:text-lp-orange"
              >
                {label}
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1 bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-lp-orange to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </a>
            )
          })}
        </nav>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 transition hover:border-lp-orange/45 hover:bg-lp-orange/10 hover:text-[#fdba74] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/5 bg-lp-bg/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_SECTIONS.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavClick(id)
                  }}
                  className={`focus-ring rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    activeId === id
                      ? 'bg-lp-orange/10 text-[#fdba74]'
                      : 'text-zinc-300 hover:bg-lp-orange/10 hover:text-lp-orange'
                  }`}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
