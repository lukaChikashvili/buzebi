"use client"
import Experience from '@/components/Experience';
import Lights from '@/components/Lights';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'

export default function Home() {

  
  return (
    <>
     <div className="relative w-full h-screen">

  <Canvas
    camera={{
      position: [-1, 1, 1.3],
      fov: 75,
      near: 0.1,
      far: 1000,
    }}
  >
    <OrbitControls />
    <Lights />
    <Experience />
  </Canvas>


  <div className="absolute top-5 left-5 text-white z-10">
    
  </div>

 
 
</div>
    </>
  );
}
