import { useEffect, useState } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import {
  PORTFOLIO_GATE_SESSION_KEY,
  PortfolioGate,
} from './components/gate/PortfolioGate'
import { ScrollProgressBar } from './components/motion'
import { SiteAtmosphere } from './components/hero-atmosphere'
import { LandingOrangeReveal } from './components/LandingOrangeReveal'
import { LandingHero } from './components/LandingHero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { SectionDivider } from './components/SectionDivider'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

function readPortfolioGateActive() {
  try {
    if (sessionStorage.getItem(PORTFOLIO_GATE_SESSION_KEY) === '1') return false
  } catch {
    /* ignore */
  }
  return true
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [portfolioGateActive, setPortfolioGateActive] = useState(readPortfolioGateActive)
  const [showStickyNav, setShowStickyNav] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) setPortfolioGateActive(false)
  }, [prefersReducedMotion])

  useEffect(() => {
    const threshold = () => Math.min(window.innerHeight * 0.42, 520)
    const onScroll = () => setShowStickyNav(window.scrollY > threshold())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="noise-bg relative min-h-svh">
      {portfolioGateActive ? (
        <PortfolioGate onComplete={() => setPortfolioGateActive(false)} />
      ) : null}
      <ScrollProgressBar />
      <SiteAtmosphere />
      {showStickyNav ? <BackgroundDecor /> : null}
      {showStickyNav ? <Navbar /> : null}
      <main className="relative z-10">
        <LandingOrangeReveal gateBlocking={portfolioGateActive}>
          <LandingHero />
        </LandingOrangeReveal>
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
