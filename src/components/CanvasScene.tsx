import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

const colors = ['#7cf0ff', '#8c7bff', '#f7b733']

function Bubble({ color, position, size }: { color: string; position: [number, number, number]; size: number }) {
  return (
    <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.3} position={position}>
      <mesh scale={size}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.35} roughness={0.25} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </Float>
  )
}

function Ring({ color, position, size }: { color: string; position: [number, number, number]; size: number }) {
  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={0.6} position={position}>
      <mesh scale={size} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.35} wireframe />
      </mesh>
    </Float>
  )
}

const CanvasScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
      <color attach="background" args={['#02040a']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <Suspense fallback={null}>
        <Bubble color={colors[0]} position={[-1.6, 0.2, 0]} size={1.4} />
        <Bubble color={colors[1]} position={[1.5, -0.4, -0.6]} size={1.1} />
        <Bubble color={colors[2]} position={[0.5, 1.2, 0.4]} size={0.9} />
        <Ring color={colors[1]} position={[0, -1.1, -0.2]} size={1.4} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  )
}

export default CanvasScene

