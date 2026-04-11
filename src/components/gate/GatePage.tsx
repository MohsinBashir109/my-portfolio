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

    fillBurst(cx, cy, '#f97316', null, () => {
      onEnter()
    })
  }

  return (
    <div className={styles.gate}>
      <div className={styles.bgText}>MOHSIN</div>

      <GateTechOrbs />

      <div className={styles.logoWrap}>
        <svg viewBox="0 0 100 100" fill="none" className={styles.hexSvg} aria-hidden>
          <g className={styles.hexSpin} style={{ transformOrigin: '50px 50px' }}>
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="#f97316"
              strokeWidth="1"
              strokeDasharray="6 4"
              opacity="0.4"
            />
          </g>
          <polygon
            className={styles.hexPulse}
            points="50,12 82,30 82,70 50,88 18,70 18,30"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <polygon
            points="50,20 76,35 76,65 50,80 24,65 24,35"
            fill="rgba(249,115,22,0.1)"
            stroke="#f97316"
            strokeWidth="2"
          />
        </svg>
        <div className={styles.mbLabel}>MB</div>
      </div>

      <div className={styles.gateTitle}>PORTFOLIO · 2026</div>
      <div className={styles.gateName}>
        MOHSIN <span className={styles.orange}>BASHIR</span>
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
