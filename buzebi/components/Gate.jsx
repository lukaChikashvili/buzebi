import { useGLTF } from '@react-three/drei'
import React from 'react'

const Gate = () => {
      const gate = useGLTF('./gate.glb');
      const lamp = useGLTF('./lamp.glb');


  return (
 <>
    
 <primitive object={gate.scene} scale = {0.4} rotation = {[0, 1.5, 0]} position = {[-2, -5, 120]} />
 
 <mesh position={[-22, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 20, 5]} />
        <meshStandardMaterial color="#b8b5b0" />
      </mesh>

      <mesh position={[11.5, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 20, 5]} />
        <meshStandardMaterial color="#b8b5b0" />
      </mesh>

      <primitive position = {[-22, 17, 121.5]} object={lamp.scene} scale = {0.01} />
      <primitive position = {[12, 17, 124]} object={lamp.scene.clone()} scale = {0.01} />


 </>
  )
}

export default Gate
