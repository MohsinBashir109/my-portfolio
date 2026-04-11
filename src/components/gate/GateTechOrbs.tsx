import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  SiExpo,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTypescript,
} from 'react-icons/si'
import styles from './GatePage.module.css'

type OrbConfig = {
  Icon: IconType
  name: string
  style: CSSProperties
  /** Base loop duration (seconds) — varied per orb */
  duration: number
  delay: number
}

const ORBS: OrbConfig[] = [
  {
    Icon: SiReact,
    name: 'React Native',
    style: { top: '12%', left: '8%' },
    duration: 5.4,
    delay: 0,
  },
  {
    Icon: SiTypescript,
    name: 'TypeScript',
    style: { top: '18%', right: '10%' },
    duration: 4.9,
    delay: 0.2,
  },
  {
    Icon: SiNodedotjs,
    name: 'Node.js',
    style: { bottom: '22%', left: '6%' },
    duration: 5.8,
    delay: 0.35,
  },
  {
    Icon: SiJavascript,
    name: 'JavaScript',
    style: { bottom: '14%', right: '8%' },
    duration: 5.1,
    delay: 0.1,
  },
  {
    Icon: SiRedux,
    name: 'Redux',
    style: { top: '52%', left: '4%' },
    duration: 6.2,
    delay: 0.45,
  },
  {
    Icon: SiExpo,
    name: 'Expo',
    style: { top: '42%', right: '4%' },
    duration: 5.5,
    delay: 0.28,
  },
]

function TechOrb({ config, reducedMotion }: { config: OrbConfig; reducedMotion: boolean }) {
  const { Icon, name, style, duration, delay } = config

  return (
    <div className={styles.techOrb} style={style}>
      <motion.div
        className={styles.techOrbMotion}
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={
          reducedMotion
            ? { rotateY: 0, rotateX: 0, y: 0 }
            : {
                rotateY: [-16, 16, -16],
                rotateX: [-6, 8, -6],
                y: [0, -6, 0],
              }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }
        }
      >
        <div className={styles.techOrbFace} title={name}>
          <Icon className={styles.techOrbIcon} aria-hidden />
        </div>
      </motion.div>
    </div>
  )
}

export function GateTechOrbs() {
  const reducedMotion = useReducedMotion() === true

  return (
    <div className={styles.techOrbLayer} aria-hidden>
      {ORBS.map((config) => (
        <TechOrb key={config.name} config={config} reducedMotion={reducedMotion} />
      ))}
    </div>
  )
}
