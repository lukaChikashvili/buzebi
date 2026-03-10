import { useGLTF } from '@react-three/drei'
import React from 'react'

const Gate = () => {
      const gate = useGLTF('./gate.glb');

  return (
 <>
    
 <primitive object={gate.scene} scale = {0.4} rotation = {[0, 1.5, 0]} position = {[-2, -5, 120]} />
 
 <mesh position={[-20, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 16, 5]} />
        <meshStandardMaterial color="#b8b5b0" />
      </mesh>

      <mesh position={[8.5, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 16, 5]} />
        <meshStandardMaterial color="#b8b5b0" />
      </mesh>


 </>
  )
}

export default Gate
