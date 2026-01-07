"use client"

import { Canvas, useThree } from "@react-three/fiber";
import Experience from "../components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../components/Lights";


export default function Home() {


  

  return (
    <>
     

      <Canvas  camera={{ position: [
2.74, 
12.12, 
24.025], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true }}>
        
        <Physics>
       <Experience />
       </Physics>
       <Lights />
      </Canvas>
    </>
  );
}
