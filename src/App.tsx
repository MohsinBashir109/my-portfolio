import { useState } from 'react'
import { Book } from './components/Book'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Estimate } from './components/Estimate'
import { Hero } from './components/Hero'
import { Log } from './components/Log'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { Reviews } from './components/Reviews'
import { Work } from './components/Work'

export default function App() {
  const [slotKey, setSlotKey] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[1280px] border-x border-line">
        <Nav />
        <main>
          <Hero />
          <Capabilities />
          <Work />
          <Estimate />
          <Process />
          <Log />
          <Reviews />
          <Book slotKey={slotKey} setSlotKey={setSlotKey} />
          <Contact slotKey={slotKey} clearSlot={() => setSlotKey(null)} />
        </main>
      </div>
    </div>
  )
}
