import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

const colors = ['#ff7ce5', '#8c7bff', '#7cf0ff']

function Orb({ color, position, size, speed }: { color: string; position: [number, number, number]; size: number; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.9} position={position}>
      <mesh scale={size}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.2} roughness={0.35} />
      </mesh>
    </Float>
  )
}

const Starfield = () => {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01
    }
  })
  return (
    <group ref={ref}>
      <Stars radius={120} depth={80} count={6000} factor={2.5} saturation={0} fade speed={0.5} />
    </group>
  )
}

const BackgroundScene = () => (
  <Canvas className="bg-canvas" camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 2]}>
    <color attach="background" args={[0x000000]} />
    <ambientLight intensity={0.25} />
    <directionalLight position={[2, 3, 4]} intensity={0.8} />
    <Starfield />
    <Orb color={colors[0]} position={[-4, 2, -4]} size={2.2} speed={1.4} />
    <Orb color={colors[1]} position={[3, -1, -6]} size={2.0} speed={0.9} />
    <Orb color={colors[2]} position={[0.5, 3, -7]} size={1.6} speed={1.1} />
  </Canvas>
)

export default BackgroundScene
