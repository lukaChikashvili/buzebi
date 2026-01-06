"use client"
import { Text3D, useMatcapTexture, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { posterVertex } from '../shaders/poster/vertex'
import { posterFragment } from '../shaders/poster/fragment'
import { useFrame } from '@react-three/fiber'

const BlueMountains = () => {
    const [matcapTexture] = useMatcapTexture('1A2461_3D70DB_2C3C8F_2C6CAC', 256);

    const texture = useTexture('./blue.jpg');
  let shaderRef = useRef();

    const uniforms = useRef({
        uTime: { value: 0 },
        uAmplitude: { value: 0.3 },
        uFrequency: { value: new THREE.Vector2(1.55, 2.0) },
        uSpeed: { value: 3.0 },
        uTexture: { value: texture },
      });

      useFrame(({ clock }) => {
        if (shaderRef.current) {
          shaderRef.current.uniforms.uTime.value += 0.004;
        }
      })
    

  return (
    <>
    
      

        <mesh
        position={[8, 10, 5]}  
        rotation={[0, -0.5, 0]}    
      >
        <planeGeometry args={[18, 10, 50,50]} /> 
        <shaderMaterial   ref={shaderRef}
        uniforms={uniforms.current} vertexShader={posterVertex} fragmentShader={posterFragment}  />
      </mesh>
      
    </>
  )
}

export default BlueMountains
