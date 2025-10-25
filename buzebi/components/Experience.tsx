import { useGLTF } from "@react-three/drei"

const Experience = () => {
  
    //  room model
    const room = useGLTF('./old_room.glb');


  return (
   <>
     <primitive object={room.scene} />
   </>
  )
}

export default Experience
