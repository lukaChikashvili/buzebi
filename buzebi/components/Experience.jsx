import { grassVertex } from "../shaders/vertex"
import { grassFragment } from "../shaders/fragment"
import * as THREE from 'three'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sky, Stars } from "@react-three/drei"
import BlueMountains from "./BlueMountains"

const Experience = () => {

const uniforms = useRef({
  uTime: { value: 0 },
  uSeason: { value: 2.0 }
});

useFrame((state) => {
  const elapsed = state.clock.getElapsedTime();

  uniforms.current.uTime.value += 0.025;
 

});



  return (
   <>
   
   <Sky
      distance={450000}        
      sunPosition={[0, 5, 0]} 
      inclination={0}          
      azimuth={0.25}           
      turbidity={2}            
      rayleigh={0.1}           
      mieCoefficient={0.005}   
      mieDirectionalG={0.8}    
      elevation={-10}          
    
    />

 <Stars radius={100} depth={50} count={1300} factor={4} saturation={0} fade  />

    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 200, 400, 400]} />
      <shaderMaterial
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
         uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>

    <BlueMountains />
   </>
  )
}

export default Experience
