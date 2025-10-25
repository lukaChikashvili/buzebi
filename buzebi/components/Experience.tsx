import { useGLTF } from "@react-three/drei"

const Experience = () => {
  
    //  room model
    const room = useGLTF('./old_room.glb');


  return (
   <>
     <primitive object={room.scene} scale = {0.025} position = {[-0.8, -0.4, 0]} />
   </>
  )
}

export default Experience
