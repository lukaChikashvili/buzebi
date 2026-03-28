import { useTexture } from '@react-three/drei'
import React from 'react'

const CinemaButtons = () => {
   
    const backBtn = useTexture('./cinemaback.png');
    const list = useTexture('./list.png');
    const full = useTexture('./full.png');
    const rate = useTexture('./rate.png');



  return (
    <>
    
      <group  position={[0, -0.1, 0]}>
         <mesh position = {[6.39, 4.5, -2.96]} >
             <boxGeometry args = {[1, 0.5,  0.8]} />
             <meshBasicMaterial map = {backBtn} />
         </mesh>

         <mesh position = {[6.39, 3.9, -2.96]}>
             <boxGeometry args = {[1, 0.5,  0.8]} />
             <meshBasicMaterial map = {list} />
         </mesh>

         <mesh position = {[6.39, 3.3, -2.96]}>
             <boxGeometry args = {[1, 0.5,  0.8]} />
             <meshBasicMaterial map = {full} />
         </mesh>

         <mesh position = {[6.39, 2.7, -2.96]}>
             <boxGeometry args = {[1, 0.5,  0.8]} />
             <meshBasicMaterial map = {rate} />
         </mesh>
      </group>
    </>
  )
}

export default CinemaButtons
