"use client"
import { Html, Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { posterVertex } from '../shaders/poster/vertex'
import { posterFragment } from '../shaders/poster/fragment'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { UserContext } from '../context/userContext'

const BlueMountains = () => {
    const [matcapTexture] = useMatcapTexture('1A2461_3D70DB_2C3C8F_2C6CAC', 256);

    const texture = useTexture('./blue.jpg');
  let shaderRef = useRef();
  let bookRef = useRef();
  const textRef = useRef()

  // text
  const [text, setText] = useState(false);
 const {setInfo } = useContext(UserContext);

 const table = useGLTF('./table.glb');
 const phone = useGLTF('./phone.glb');






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

     //add wood texture
     const woodTexture = useTexture('./wood.jpg');

     useEffect(() => {

 

      
        
       deskModel.scene.traverse((child) => {
         if(child.isMesh) {
          if(child.name === "desk2_BlackWood_0") {
            child.material.map = woodTexture;
        
           child.material.needsUpdate = true;
          }

          if(child.name === "desk2_SeconadryColor_0") {
            child.material.color = new THREE.Color('white');
          }
          console.log(child.name)
         }
       })
      

     }, [deskModel, woodTexture]);










      const book = useGLTF('./book.glb');

      // text appear
      const appearText = () => {
         setText(true);

         requestAnimationFrame(() => {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
          )
        })
      }

      const hideText = () => {
      
        setText(false);

        gsap.to(textRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.8,
          duration: 0.4,
          ease: 'power2.in',
          
        })
      }

      const { camera} = useThree();

      
// show info
const showInfo = () => {
  gsap.to(camera.position, {
    x: 1,
    y:9,
    z: 12,
    duration: 1,
    delay: 1,
    ease: "circ.inOut"
  });

  setInfo(true);

}

// old tv model
const tv = useGLTF('./tv.glb');

    

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
        {``}
        <meshMatcapMaterial color = "4E78A0" matcap={matcapTexture} />
      </Text3D>
      

        <mesh
        position={[15, 12, -10]}  
        rotation={[0, -0.9, 0]}    
      >
        <planeGeometry args={[30, 10, 10, 10]} /> 
        <shaderMaterial   ref={shaderRef}
        uniforms={uniforms.current} vertexShader={posterVertex} fragmentShader={posterFragment}  />
      </mesh>

     

     <primitive object={deskModel.scene}  rotation = {[0, -0.5, 0]} position = {[6, 5.5, 12]}  scale = {0.10} />
      <primitive onClick = {showInfo} onPointerOver = {appearText} onPointerOut = {hideText}  ref = {bookRef} object={book.scene} scale = {3.5} rotation = {[0, 0.7, 0]} position = {[3, 8, 10]} />

     <primitive object={tv.scene} scale = {0.06} rotation = {[0, 0.8, 0]} position = {[6.5, 7.5, 12]} />

     
     <primitive object={table.scene} scale = {0.07} position = {[-7, 0.7, 7]} />
     <primitive object={phone.scene} scale = {11} position = {[-7, 6.7, 7]} />
    

      {text && <Html className='text'>
           <h1  style={{ opacity: 0, transform: 'translateY(30px) scale(0.8)' }} ref = {textRef} className='-mt-48  -ml-4 w-48 text-center border-2  border-white bg-purple-300 rounded-md shadow-lg px-2 py-2'>
              ფილმის შესახებ
           </h1>
        </Html>}


    </>
  )
}

export default BlueMountains
