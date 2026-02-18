import { useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'

const Sign = ({image, scale, position = [0, 0, 0], rotation = [0, 0, 0]})=> {
    
    const signModel = useGLTF('./sign.glb');
    const texture = useTexture(image);

    texture.colorSpace = THREE.SRGBColorSpace

  return (
   <>
    <group position={position} rotation={rotation} scale={scale}>
      
      
      <primitive object={signModel.scene} />

     
      <mesh position={[-0.04, 2.2, 0.15]}>
        <planeGeometry args={[1.8, 0.7]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
        />
      </mesh>

    </group>
  
   </>
  )
}

export default Sign
