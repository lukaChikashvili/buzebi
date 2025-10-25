"use client"
import Experience from '@/components/Experience';
import Lights from '@/components/Lights';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'

export default function Home() {

  
  return (
    <>
       
      <Canvas  camera={{
        position: [-1, 1, 1.3],
        fov: 75, 
        near: 0.1,
        far: 1000,
      }}>
        
        <OrbitControls />
        <Lights />
         <Experience />
      </Canvas>
    </>
  );
}
