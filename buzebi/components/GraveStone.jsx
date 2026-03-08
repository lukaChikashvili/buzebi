import { useGLTF, useTexture } from '@react-three/drei'
import React, { useContext } from 'react'
import { RigidBody } from '@react-three/rapier'
import { UserContext } from '../context/userContext';

const GraveStone = () => {
     
    const graveTexture = useTexture('./grave.jpg');
    const { posterIndex } = useContext(UserContext);




    const rose = useGLTF('./chinese_rose.glb');
  return (
   <>
    <RigidBody type = "fixed" colliders="cuboid">
     <mesh scale = {0.6}  position={[10, 0, 3]}
        rotation={[ -Math.PI / 2, 0, -0.7]}>
        <boxGeometry args={[10, 20, 1]} />
        <meshBasicMaterial map = {graveTexture} color = "gray" />

     </mesh>
     </RigidBody>

{posterIndex && (
  <RigidBody mass = {1} type = "dynamic" colliders = "hull" >
  <primitive
   object={rose.scene}
   position={[9, 30, 3]}
   scale = {1}
 />
 </RigidBody>
)}
   


   </>
  )
}

export default GraveStone
