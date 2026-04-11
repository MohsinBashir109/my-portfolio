import { Float, PerspectiveCamera, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { type MutableRefObject, type ReactNode, useLayoutEffect, useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

export type ParallaxSample = { x: number; y: number }

export type HeroSceneProps = {
  parallaxRef: MutableRefObject<ParallaxSample>
  parallaxEnabled: boolean
  reducedMotion: boolean
}

/** Reference palette: beige / peach / deep orange / grey floor */
const P = {
  wall: '#F5F5DC',
  wallAccent: '#FFCCAB',
  wallAccentDeep: '#e8a882',
  floor: '#8a8580',
  floorEdge: '#6f6b67',
  desk: '#f0e8dc',
  deskLeg: '#ddd4c8',
  monitor: '#2c2c32',
  screen: '#1a1a22',
  screenGlow: '#ffb8d4',
  chair: '#f0a088',
  chairDeep: '#e88870',
  chairMetal: '#b8b0a8',
  shelf: '#ebe3d8',
  book1: '#7eb8e8',
  book2: '#ff9a56',
  book3: '#f5f5f0',
  book4: '#c9daf5',
  cactus: '#7cb87a',
  pot: '#c9a574',
  telescope: '#b5aa9c',
  telescopeTripod: '#9c9188',
  cpu: '#faf8f5',
} as const

function pastelMat(
  color: string,
  opts?: { emissive?: string; emissiveIntensity?: number; roughness?: number; metalness?: number; opacity?: number }
) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={opts?.roughness ?? 0.82}
      metalness={opts?.metalness ?? 0.02}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.emissiveIntensity ?? 0}
      transparent={opts?.opacity != null && opts.opacity < 1}
      opacity={opts?.opacity ?? 1}
    />
  )
}

function AimHeroCamera() {
  const camera = useThree((s) => s.camera)
  useLayoutEffect(() => {
    camera.lookAt(0, -0.28, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

/** Tiny isometric idle drift — keeps framing stable */
function SubtleCameraDrift({ reducedMotion }: { reducedMotion: boolean }) {
  const base = useRef({ x: 12.5, y: 10.5, z: 12.5 })

  useFrame((state) => {
    if (reducedMotion) return
    const cam = state.camera
    const t = state.clock.getElapsedTime()
    const amp = 0.045
    cam.position.x = base.current.x + Math.sin(t * 0.12) * amp
    cam.position.y = base.current.y + Math.sin(t * 0.18) * (amp * 0.55)
    cam.position.z = base.current.z + Math.cos(t * 0.11) * amp
    cam.lookAt(0, -0.28, 0)
  })

  return null
}

function Desk({ children }: { children?: ReactNode }) {
  return (
    <group position={[0.4, -0.45, 0]}>
      <RoundedBox args={[3.2, 0.18, 1.4]} radius={0.09} smoothness={5} castShadow receiveShadow>
        {pastelMat(P.desk, { roughness: 0.78 })}
      </RoundedBox>
      {(
        [
          [-1.35, -0.75, -0.5],
          [1.35, -0.75, -0.5],
          [-1.35, -0.75, 0.5],
          [1.35, -0.75, 0.5],
        ] as const
      ).map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <capsuleGeometry args={[0.045, 1.35, 8, 12]} />
          {pastelMat(P.deskLeg, { roughness: 0.88 })}
        </mesh>
      ))}
      {children}
    </group>
  )
}

function Monitor() {
  const screenRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const m = screenRef.current
    if (!m) return
    const mat = m.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.22 + Math.sin(t * 1.4) * 0.05
  })

  return (
    <group position={[0.65, 0.33, -0.08]} castShadow>
      <RoundedBox args={[1.08, 0.68, 0.055]} radius={0.055} smoothness={5}>
        {pastelMat(P.monitor, { roughness: 0.72 })}
      </RoundedBox>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.96, 0.56]} />
        {pastelMat('#f5f0eb', { roughness: 0.9 })}
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.038]}>
        <planeGeometry args={[0.88, 0.5]} />
        <meshStandardMaterial
          color={P.screen}
          emissive={P.screenGlow}
          emissiveIntensity={0.26}
          roughness={0.92}
        />
      </mesh>
      <mesh position={[0, -0.44, 0]}>
        <capsuleGeometry args={[0.035, 0.3, 8, 12]} />
        {pastelMat('#e8e4ea', { roughness: 0.8 })}
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.045, 32]} />
        {pastelMat('#ece8f0', { roughness: 0.78 })}
      </mesh>
    </group>
  )
}

function KeyboardAndMouse() {
  return (
    <group position={[0.2, -0.05, 0.3]}>
      <RoundedBox args={[0.88, 0.035, 0.26]} radius={0.028} smoothness={4}>
        {pastelMat('#faf8f5', { roughness: 0.88 })}
      </RoundedBox>
      <mesh position={[0.68, 0.02, 0.08]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        {pastelMat('#faf8f5', { roughness: 0.88 })}
      </mesh>
    </group>
  )
}

function Chair() {
  return (
    <group position={[1.75, -0.45, 0.2]} rotation={[0, -0.42, 0]}>
      <RoundedBox args={[0.62, 0.09, 0.62]} radius={0.06} smoothness={4} position={[0, 0.15, 0]}>
        {pastelMat(P.chair, { roughness: 0.8 })}
      </RoundedBox>
      <RoundedBox args={[0.6, 0.95, 0.11]} radius={0.05} smoothness={4} position={[0, 0.74, -0.22]}>
        {pastelMat(P.chairDeep, { roughness: 0.82 })}
      </RoundedBox>
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 0.62, 20]} />
        {pastelMat(P.chairMetal, { roughness: 0.85 })}
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.42, 0.09, 0.055, 24]} />
        {pastelMat(P.chairMetal, { roughness: 0.85 })}
      </mesh>
    </group>
  )
}

function ShelfBooks() {
  const layouts = useMemo(
    () => [
      { x: -0.95, z: 0.06, rot: 0.08, c: P.book1, w: 0.14, h: 0.2, d: 0.38 },
      { x: -0.78, z: 0.04, rot: -0.05, c: P.book2, w: 0.13, h: 0.22, d: 0.36 },
      { x: -0.62, z: 0.05, rot: 0.04, c: P.book3, w: 0.15, h: 0.18, d: 0.34 },
      { x: -0.42, z: 0.03, rot: -0.07, c: P.book4, w: 0.12, h: 0.24, d: 0.35 },
      { x: 0.15, z: 0.05, rot: 0.06, c: P.book2, w: 0.14, h: 0.19, d: 0.37 },
      { x: 0.32, z: 0.04, rot: -0.04, c: P.book1, w: 0.13, h: 0.21, d: 0.33 },
      { x: 0.52, z: 0.06, rot: 0.1, c: P.book3, w: 0.15, h: 0.2, d: 0.36 },
    ],
    []
  )

  return (
    <group position={[0, 0.12, 0]}>
      {layouts.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 + 0.02, b.z]} rotation={[0, b.rot, 0]}>
          <RoundedBox args={[b.w, b.h, b.d]} radius={0.02} smoothness={2}>
            {pastelMat(b.c, { roughness: 0.55 })}
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}

function Bookshelf() {
  return (
    <group position={[-1.85, 0.42, -1.12]}>
      <RoundedBox args={[2.2, 0.1, 0.42]} radius={0.045} smoothness={4} position={[0, 0, 0]}>
        {pastelMat(P.shelf, { roughness: 0.84 })}
      </RoundedBox>
      <ShelfBooks />
      <mesh position={[0.82, 0.38, 0.02]}>
        <torusGeometry args={[0.14, 0.04, 14, 40]} />
        {pastelMat('#d4c4f5', { emissive: '#eee8ff', emissiveIntensity: 0.04, roughness: 0.78 })}
      </mesh>
    </group>
  )
}

/** Sits on desk surface (local to Desk group) */
function CactusOnDesk() {
  return (
    <group position={[-0.95, 0.14, -0.15]} castShadow>
      <RoundedBox args={[0.2, 0.1, 0.2]} radius={0.04} smoothness={3} position={[0, 0, 0]}>
        {pastelMat(P.pot, { roughness: 0.86 })}
      </RoundedBox>
      <mesh position={[0, 0.16, 0]}>
        <capsuleGeometry args={[0.048, 0.24, 8, 12]} />
        {pastelMat(P.cactus, { roughness: 0.8 })}
      </mesh>
      <mesh position={[0.06, 0.24, 0]} rotation={[0, 0, 0.55]}>
        <capsuleGeometry args={[0.032, 0.12, 6, 10]} />
        {pastelMat(P.cactus, { roughness: 0.8 })}
      </mesh>
      <mesh position={[-0.055, 0.3, 0]} rotation={[0, 0, -0.48]}>
        <capsuleGeometry args={[0.028, 0.1, 6, 10]} />
        {pastelMat(P.cactus, { roughness: 0.8 })}
      </mesh>
    </group>
  )
}

function Telescope() {
  return (
    <group position={[2.05, -0.35, -0.92]} rotation={[0.12, -0.5, 0]}>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.035, 0.042, 0.65, 14]} />
        {pastelMat(P.telescopeTripod, { roughness: 0.84 })}
      </mesh>
      <mesh position={[0.12, 0.3, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.028, 0.034, 0.55, 10]} />
        {pastelMat(P.telescopeTripod, { roughness: 0.86 })}
      </mesh>
      <mesh position={[-0.12, 0.3, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.028, 0.034, 0.55, 10]} />
        {pastelMat(P.telescopeTripod, { roughness: 0.86 })}
      </mesh>
      <mesh position={[0, 0.74, 0.1]} rotation={[1.05, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.065, 0.42, 20]} />
        {pastelMat(P.telescope, { roughness: 0.8, metalness: 0.04 })}
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.05, 6]} />
        {pastelMat(P.telescopeTripod, { roughness: 0.82 })}
      </mesh>
    </group>
  )
}

function CpuTower() {
  return (
    <group position={[-1.35, -0.82, 0.48]}>
      <RoundedBox args={[0.4, 0.92, 0.48]} radius={0.035} smoothness={4}>
        {pastelMat(P.cpu, { roughness: 0.88 })}
      </RoundedBox>
      <mesh position={[0.205, 0.12, 0]}>
        <planeGeometry args={[0.018, 0.5]} />
        {pastelMat('#dfe8f5', { emissive: '#eef4ff', emissiveIntensity: 0.04, roughness: 0.9 })}
      </mesh>
      <mesh position={[0.205, -0.22, 0]}>
        <planeGeometry args={[0.018, 0.18]} />
        {pastelMat('#e8f0ff', { emissive: '#f5f9ff', emissiveIntensity: 0.03, roughness: 0.9 })}
      </mesh>
    </group>
  )
}

/** Polaroid-style cards on peach accent wall only */
function WallCards() {
  const cards = useMemo(
    () => [
      { pos: [3.22, 1.05, -1.86] as const, rot: [0, -0.42, 0.05] as const, inner: '#cfe8ff' },
      { pos: [3.28, 0.35, -1.82] as const, rot: [0, -0.38, -0.04] as const, inner: '#f0f6ff' },
      { pos: [3.18, -0.25, -1.88] as const, rot: [0, -0.33, 0.06] as const, inner: '#d4e9ff' },
    ],
    []
  )

  return (
    <group>
      {cards.map((card, i) => (
        <group key={i} position={card.pos} rotation={card.rot}>
          <RoundedBox args={[0.48, 0.58, 0.035]} radius={0.025} smoothness={4}>
            {pastelMat('#fffcf8', { roughness: 0.88 })}
          </RoundedBox>
          <mesh position={[0, 0.04, 0.025]}>
            <planeGeometry args={[0.38, 0.38]} />
            <meshStandardMaterial color={card.inner} roughness={0.9} emissive={card.inner} emissiveIntensity={0.02} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      {pastelMat(P.floor, { roughness: 0.94, metalness: 0.01 })}
    </mesh>
  )
}

function RoomShell() {
  return (
    <group>
      <RoundedBox args={[8.6, 4.65, 0.14]} radius={0.06} smoothness={3} position={[0, 0.85, -2.08]} receiveShadow>
        {pastelMat(P.wall, { roughness: 0.9 })}
      </RoundedBox>
      <RoundedBox args={[1.65, 4.45, 0.1]} radius={0.05} smoothness={3} position={[3.28, 0.85, -1.94]}>
        {pastelMat(P.wallAccent, { roughness: 0.82, emissive: P.wallAccentDeep, emissiveIntensity: 0.06 })}
      </RoundedBox>
      <WallCards />
    </group>
  )
}

function PastelWorkspace({ parallaxRef, parallaxEnabled, reducedMotion }: HeroSceneProps) {
  const root = useRef<Group>(null)
  const smooth = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const g = root.current
    if (!g) return

    if (reducedMotion) {
      g.rotation.y *= 0.96
      g.rotation.x *= 0.96
      return
    }

    const t = parallaxRef.current
    const l = Math.min(1, delta * 3)
    if (parallaxEnabled) {
      smooth.current.x += (t.x * 0.22 - smooth.current.x) * l
      smooth.current.y += (t.y * 0.18 - smooth.current.y) * l
    } else {
      smooth.current.x *= 0.93
      smooth.current.y *= 0.93
    }

    g.rotation.y = 0.48 + smooth.current.x * 0.035
    g.rotation.x = -0.34 + smooth.current.y * -0.028
    const bob = Math.sin(performance.now() * 0.00018) * 0.008
    g.position.y = -0.35 + bob
  })

  return (
    <group ref={root} position={[0.15, -0.35, 0]} scale={1.02}>
      <RoomShell />
      <Floor />
      <Bookshelf />
      <Desk>
        <CactusOnDesk />
      </Desk>
      <Monitor />
      <KeyboardAndMouse />
      <Chair />
      <Telescope />
      <CpuTower />

      <Float speed={0.65} rotationIntensity={0.06} floatIntensity={0.12}>
        <mesh position={[2.15, 1.55, 0.35]} castShadow>
          <torusGeometry args={[0.11, 0.022, 12, 36]} />
          <meshStandardMaterial color="#f5ebe0" emissive="#FF8C00" emissiveIntensity={0.04} roughness={0.85} />
        </mesh>
      </Float>
    </group>
  )
}

export function HeroScene(props: HeroSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[12.5, 10.5, 12.5]} fov={32} near={0.35} far={160} />
      <AimHeroCamera />
      <SubtleCameraDrift reducedMotion={props.reducedMotion} />

      <color attach="background" args={['#e6e2dc']} />
      <fog attach="fog" args={['#dcd6ce', 14, 52]} />

      <ambientLight intensity={0.72} color="#fff8f0" />
      <hemisphereLight intensity={0.48} color="#faf6f0" groundColor={P.floorEdge} position={[0, 16, 0]} />
      <directionalLight
        position={[7.5, 13, 9]}
        intensity={0.72}
        color="#fff4e6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-near={4}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.00025}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-4.5, 5.5, -5]} intensity={0.22} color="#e8eef8" />
      <pointLight position={[2.8, 2.8, 1.8]} intensity={0.2} color="#ffe8d4" distance={22} decay={2} />

      <PastelWorkspace {...props} />
    </>
  )
}
