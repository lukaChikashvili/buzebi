import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three'

const Fly = ({position}: {position: [number, number, number]}) => {
    
    const ref = useRef<THREE.Mesh>(null!);

    const random = Math.random() * 1000;

    useFrame((state) => {
    if(!ref.current) return;

    ref.current.position.x += Math.sin(state.clock.elapsedTime * 2 + random) * 0.01
    ref.current.position.y += Math.cos(state.clock.elapsedTime * 3 + random) * 0.01
    ref.current.position.z += Math.sin(state.clock.elapsedTime * 1.5 + random) * 0.01
    ref.current.rotation.y += 0.05

    })

  return (
   <>
   <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="black" />
    </mesh>
   </>
  )
}

export default Fly
