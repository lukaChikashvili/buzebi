import { Clone, useGLTF, useTexture } from '@react-three/drei'
import React, { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

const Sign = forwardRef(({image, scale, position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut}, ref)=> {
    
    const signModel = useGLTF('./sign.glb');
    const texture = useTexture(image);

    texture.colorSpace = THREE.SRGBColorSpace;

    const signScene = useMemo(() => {
      return clone(signModel.scene)
    }, [signModel])

  return (
   <>
    <group ref = {ref} position={position} rotation={rotation} scale={scale} onPointerOut = {onPointerOut} onPointerOver={onPointerOver}>
      
      
      <primitive object={signScene} />

     
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
})

export default Sign
