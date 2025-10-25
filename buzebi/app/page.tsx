"use client"
import Experience from '@/components/Experience';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'

export default function Home() {
  return (
    <>
      <Canvas  camera={{
        position: [0, 0, 5],
        fov: 75, 
        near: 0.1,
        far: 1000,
      }}>
        <OrbitControls />
         <Experience />
      </Canvas>
    </>
  );
}
