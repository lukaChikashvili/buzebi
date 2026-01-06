"use client"
import { Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { posterVertex } from '../shaders/poster/vertex'
import { posterFragment } from '../shaders/poster/fragment'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

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

      const deskModel = useGLTF('./desk.glb');
      const book = useGLTF('./book.glb');


    

  return (
    <>
    
    <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.8}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-12, 9, 15]}
        rotation={[0, 0.7, 0]}
      >
        {`Blue\nMountains`}
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
      

        <mesh
        position={[8, 10, 5]}  
        rotation={[0, -0.5, 0]}    
      >
        <planeGeometry args={[18, 10, 50,50]} /> 
        <shaderMaterial   ref={shaderRef}
        uniforms={uniforms.current} vertexShader={posterVertex} fragmentShader={posterFragment}  />
      </mesh>

     <primitive object={deskModel.scene} rotation = {[0, -0.5, 0]} position = {[6, 6, 12]}  scale = {0.08} />
      <primitive object={book.scene} scale = {3.5} rotation = {[0, 0.7, 0]} position = {[3, 8, 10]} />
    </>
  )
}

export default BlueMountains
