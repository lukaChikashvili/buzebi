
import { useGLTF } from '@react-three/drei'
import React, {  useMemo } from 'react'
import Poster from './Poster';
import { posters } from './Posters';


const Romani = () => {

    const deskModel = useGLTF('./desk.glb');
    const bookModel = useGLTF('./book.glb');
    const tv = useGLTF('./tv.glb');
    


    const deskClone = useMemo(() => {
        return deskModel.scene.clone()
    }, [deskModel]);

    const bookClone = useMemo(() => {
        return bookModel.scene.clone()
    }, [bookModel]);
    
    const tvClone = useMemo(() => {
        return tv.scene.clone()
    }, [tv]);


  return (
   <>
    <group position = {[62, 8.5, 11]}>
      <primitive
        object={deskClone}
        scale={0.1}
        position={[0, 0, 0]}
        rotation={[0, 1, 0]}
      />

       <primitive
        object={bookClone}
        scale = {3.5} rotation = {[0, 1.5, 0]} position = {[-3, 2.9, 4]}
      />

      <primitive
        object={tvClone}
        scale = {0.06} rotation = {[0, 2.5, 0]} position = {[-1, 2.2, 2]}
      />

      <Poster  image={posters[2].img}
  position={[11, 4, -13]}
  rotation={[0, -0.4, 0]} />


      
      </group>
   </>
  )
}

export default Romani
