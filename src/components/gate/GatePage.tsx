import { useRef, useState } from 'react'
import { fillBurst } from '../../utils/animationUtils'
import { GateTechOrbs } from './GateTechOrbs'
import styles from './GatePage.module.css'

type GatePageProps = {
  onEnter: () => void
}

export function GatePage({ onEnter }: GatePageProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [clicked, setClicked] = useState(false)

  const handleEnter = () => {
    if (clicked) return
    setClicked(true)

    const rect = btnRef.current?.getBoundingClientRect()
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    fillBurst(cx, cy, '#0b1020', null, () => {
      onEnter()
    })
  }

  return (
    <div className={styles.gate}>
      <div className={styles.bgText}>MOHSIN</div>

      <GateTechOrbs />

      <div className={styles.gateName}>
        MOHSIN <span className={styles.accent}>BASHIR</span>
      </div>

      <button
        ref={btnRef}
        type="button"
        className={`${styles.enterBtn} ${clicked ? styles.clicked : ''}`}
        onClick={handleEnter}
        aria-label="Enter portfolio"
      >
        <div className={styles.btnOuter}>
          <div
            className={styles.btnDot}
            style={{ top: '6px', left: '50%', marginLeft: '-3px' }}
          />
          <div
            className={styles.btnDot}
            style={{ bottom: '6px', left: '50%', marginLeft: '-3px' }}
          />
        </div>
        <div className={styles.btnMid} />
        <div className={styles.btnInner}>
          <div className={styles.btnIcon}>{clicked ? '✓' : 'ENTER'}</div>
          <div className={styles.btnSub}>{clicked ? 'LOADING...' : 'CLICK TO EXPLORE'}</div>
        </div>
      </button>

      <div className={styles.gateHint}>MOVE YOUR CURSOR · EXPLORE THE GRID</div>
    </div>
  )
}
