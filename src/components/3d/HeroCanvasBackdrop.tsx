import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import { HeroScene, type HeroSceneProps } from './HeroScene'

type HeroCanvasBackdropProps = HeroSceneProps & {
  /** When false, skip WebGL entirely (mobile / perf) */
  active: boolean
}

export function HeroCanvasBackdrop({ active, ...sceneProps }: HeroCanvasBackdropProps) {
  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 1.65)] as [number, number], [])

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        dpr={dpr}
        shadows
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        onCreated={({ gl, scene }) => {
          scene.background = null
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <HeroScene {...sceneProps} />
        </Suspense>
      </Canvas>
    </div>
  )
}
