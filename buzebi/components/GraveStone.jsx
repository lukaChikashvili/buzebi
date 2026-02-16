import { useTexture } from '@react-three/drei'
import React from 'react'

const GraveStone = () => {
     
    const graveTexture = useTexture('./grave.jpg');

     
  return (
   <>
     <mesh scale = {0.6}  position={[10, 0, 3]}
        rotation={[ -Math.PI / 2, 0, -0.7]}>
        <boxGeometry args = {[10, 20]} />
        <meshBasicMaterial map = {graveTexture} color = "gray" />

     </mesh>
   
   </>
  )
}

export default GraveStone
