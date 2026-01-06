import { grassVertex } from "../shaders/vertex"
import { grassFragment } from "../shaders/fragment"
import * as THREE from 'three'
import { useRef } from "react"

const Experience = () => {

const uniforms = useRef({
  uTime: { value: 0 },
  uSeason: { value: 2.0 }
});



  return (
   <>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 200, 400, 400]} />
      <shaderMaterial
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
         uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>
   </>
  )
}

export default Experience
