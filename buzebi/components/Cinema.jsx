import React from "react";
import Screen from "./Screen";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three'


const Cinema = ({ screenProps }) => {
   
    const wood = useTexture('./wood2.jpg');
    const wall = useTexture('./wall1.jpg');
    const frame = useTexture('./frame.jpg');

    //  models
    const sofa = useGLTF('./sofa.glb');
    const plant = useGLTF('./plant.glb');


    wood.wrapS = wood.wrapT = THREE.RepeatWrapping;

    wood.repeat.set(5, 5);

    
    wall.wrapS = wood.wrapT = THREE.RepeatWrapping;

    wall.repeat.set(2.5, 2.5);

    frame.wrapS = wood.wrapT = THREE.RepeatWrapping;

    frame.repeat.set(10, 10);

  return (
    <group position={[-100, 8, 0]} scale={5}>

     <rectAreaLight
        width={10}
        height={5}
        intensity={2}
        color={"#ffffff"} 
        position={[0, 2.5, -3.9]}
        rotation={[0, Math.PI, 0]}
      />

<pointLight position={[-100, 8.8, 0]} intensity={10} color="#ffaa55" distance={10} />
 
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8, 500, 500]} />
        <meshBasicMaterial map = {wood} />
      </mesh>

     
      <mesh position={[0, 2.5, 4]}>
        <planeGeometry args={[12, 5]} />
        <meshBasicMaterial map = {wall} />
      </mesh>
      <mesh position={[0, 2.5, -4]}>
        <planeGeometry args={[12, 5]} />
        <meshBasicMaterial map = {frame}    />
      </mesh>
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial map = {wall}  />
      </mesh>
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial map = {wall}   />
      </mesh>
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial map = {wall}  />
      </mesh>

      <primitive object={sofa.scene} scale = {0.25} rotation = {[0, 1.6, 0]} />
      <primitive object={plant.scene} scale = {2} position = {[-5, 0, -3.3]} />

      
      <Screen  {...screenProps}  />
    </group>
  );
};

export default Cinema;
