import { useGLTF } from '@react-three/drei'
import React from 'react'

const Gate = () => {
      const gate = useGLTF('./gate.glb');

  return (
 <>
    
 <primitive object={gate.scene} />
 
 </>
  )
}

export default Gate
