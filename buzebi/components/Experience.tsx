import { useGLTF } from "@react-three/drei"
import { useEffect } from "react";
import * as THREE from 'three'

const Experience = () => {
  
    //  room model
    const room = useGLTF('./old_room.glb');

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
    }, [room])


  return (
   <>
     <primitive object={room.scene} scale = {0.025} position = {[-0.8, -0.4, 0]} />
   </>
  )
}

export default Experience
