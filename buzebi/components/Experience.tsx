import { useGLTF, useTexture } from "@react-three/drei"
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import gsap from 'gsap'
import Flies from "./Flies";
import { useGame } from "@/context/GameContext";

const Experience = () => {

    const {start, setStart} = useGame();
  
    //  room model
    const room = useGLTF('./old_room.glb');

    const startTexture = useTexture('./start.png');

    let btnRef = useRef<THREE.Mesh>(null!);


    useEffect(() => {
       room.scene.traverse((child) => {
            if((child as THREE.Mesh).isMesh) {
                if(child.name === "Cylinder001_01_-_Default_0") {
                    child.visible = false;
                }else if(child.name === "Cylinder002_01_-_Default_0") {
                    child.visible = false;
                }else if(child.name === "Sphere001__0") {
                    child.visible = false;
                }
              
            }
       })
    }, [room]);

    

    const clickEffect = () => {
        
      
            setStart(true)
          
            gsap.to(btnRef.current.position, {
              y: -10,
              duration: 1,
              ease: 'back.out'
            })
          
    }


  return (
   <>
     <primitive object={room.scene} scale = {0.025} position = {[-0.8, -0.8, 0]} />

     <mesh ref={btnRef} scale = {0.5}  position = {[-0.3, 0.01, 0.3]} onClick={clickEffect}>
        <boxGeometry args = {[2.5,  0.05]}  />
        <meshBasicMaterial map = {startTexture} />
     </mesh>

     <Flies start = {start} />
   </>
  )
}

export default Experience
