import { useEffect, useState } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { ScrollProgressBar } from './components/motion'
import { SiteAtmosphere } from './components/hero-atmosphere'
import { LandingHero } from './components/LandingHero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { SectionDivider } from './components/SectionDivider'

export default function App() {
  const [showStickyNav, setShowStickyNav] = useState(false)

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
      <ScrollProgressBar />
      <SiteAtmosphere />
      {showStickyNav ? <BackgroundDecor /> : null}
      {showStickyNav ? <Navbar /> : null}
      <main className="relative z-10">
        <LandingHero />
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
