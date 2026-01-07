"use client"

import { Canvas, useThree } from "@react-three/fiber";
import Experience from "../components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../components/Lights";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Info from "../components/Info";


export default function Home() {

const { info } = useContext(UserContext);

  

  return (
    <>
     <div className="relative w-screen h-screen overflow-hidden">

     {info && (
    <div className="absolute inset-0 z-50 pointer-events-auto">
      <Info title="ცისფერი მთები" />
    </div>
  )}


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




  </div>
    </>
  );
}
