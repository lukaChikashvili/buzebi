"use client"
import { Text3D, useMatcapTexture } from '@react-three/drei'
import React from 'react'

const BlueMountains = () => {
    const [matcapTexture] = useMatcapTexture('1A2461_3D70DB_2C3C8F_2C6CAC', 256)

  return (
    <>
    
        <Text3D font="./fonts/helvetiker_regular.typeface.json" 
         size={ 2.75 }
         height={ 0.2 }
         curveSegments={ 12 }
         bevelEnabled
         bevelThickness={ 0.8 }
         bevelSize={ 0.02 }
         bevelOffset={ 0 }
         bevelSegments={ 5 } position={[-12, 10, 15]} rotation = {[0, 0.7, 0]}>
              {`Blue
  Mountains`}
 <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      
    </>
  )
}

export default BlueMountains
