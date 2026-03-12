import { useGLTF, useTexture } from '@react-three/drei'
import React from 'react'

const Box = ({ position, rotation, scale }) => {

    const img = useTexture('./box.png');

    const boxModel = useGLTF('./box.glb');

  return (
   <>
     <primitive object={boxModel.scene.clone()} position = {position} rotation = {rotation} scale = {scale} />
   </>
  )
}

export default Box
