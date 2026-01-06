"use client"

import { Canvas } from "@react-three/fiber";
import Experience from "../components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../components/Lights";


export default function Home() {

 
  

  return (
    <>
     

      <Canvas  camera={{ position: [2, 14, 25], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true }}>
        <OrbitControls />
        <Physics>
       <Experience />
       </Physics>
       <Lights />
      </Canvas>
    </>
  );
}
