"use client"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface FlyProps {
  position: [number, number, number]
}

const Fly = ({ position }: FlyProps) => {
  const ref = useRef<THREE.Mesh>(null!)

  
  const center = useMemo(() => new THREE.Vector3(...position), [position])

  
  const { radius, speedX, speedY, speedZ, seed } = useMemo(() => ({
    radius: 0.05 + Math.random() * 0.1,  
    speedX: 2 + Math.random() * 1.5,        
    speedY: 2 + Math.random() * 1.5,
  speedZ: 2 + Math.random() * 1.5,
    seed: Math.random() * 1000,
  
  }), [])

  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.elapsedTime + seed

    
    ref.current.position.x = center.x + Math.sin(t * speedX) * radius + (Math.random() - 0.5) * 0.002
    ref.current.position.y = center.y + Math.cos(t * speedY) * radius + (Math.random() - 0.5) * 0.002
    ref.current.position.z = center.z + Math.sin(t * speedZ) * radius + (Math.random() - 0.5) * 0.002

   
    ref.current.rotation.x += 0.1 + Math.random() * 0.1
    ref.current.rotation.y += 0.1 + Math.random() * 0.1
  })

  return (
    <mesh ref={ref}>
     <sphereGeometry args={[0.010, 8, 8]} />  
      <meshStandardMaterial color="yellow" />
    </mesh>
  )
}

export default Fly
