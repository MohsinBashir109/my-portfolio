import { useEffect, useState } from 'react'
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
import { LandingStackStrip } from './components/LandingStackStrip'
import { LandingStickyNav } from './components/LandingStickyNav'
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

  useEffect(() => {
    if (prefersReducedMotion) setPortfolioGateActive(false)
  }, [prefersReducedMotion])

  return (
    <div className="noise-bg relative min-h-svh">
      {portfolioGateActive ? (
        <PortfolioGate onComplete={() => setPortfolioGateActive(false)} />
      ) : null}
      <ScrollProgressBar />
      <SiteAtmosphere />
      <LandingStickyNav />
      <main className="relative z-10">
        <LandingOrangeReveal gateBlocking={portfolioGateActive}>
          <>
            <LandingHero />
            <LandingStackStrip />
          </>
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
