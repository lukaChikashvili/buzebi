import { grassVertex } from "../shaders/vertex"
import { grassFragment } from "../shaders/fragment"
import * as THREE from 'three'
import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sky, Stars, useGLTF } from "@react-three/drei"
import BlueMountains from "./BlueMountains"
import Wall from "./Wall"
import { RigidBody } from "@react-three/rapier"

const Experience = () => {

  const houses = useMemo(() => [
    { position: [-150, 0, -120], scale: 0.8 },
    { position: [-120, 0, -140], scale: 0.85 },
    { position: [-70, 0, -130], scale: 0.75 },
    { position: [-20, 0, -110], scale: 0.9 },
    { position: [90, 0, -120], scale: 0.8 },
    { position: [120, 0, -170], scale: 0.85 },
    { position: [0, 0, -130], scale: 0.75 },
    { position: [130, 0, -110], scale: 0.9 },
  ], []);




const uniforms = useRef({
  uTime: { value: 0 },
  uSeason: { value: 2.0 }
});

useFrame((state) => {
  const elapsed = state.clock.getElapsedTime();

  uniforms.current.uTime.value += 0.025;
 

});

const house = useGLTF('./house.glb');

const { camera } = useThree();

useEffect(() => {
  console.log(camera.position)
}, [camera.position])


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
<RigidBody type="fixed">
    <mesh rotation={[-Math.PI / 2, 0, 0]} position = {[0, -3, 0]}>
      <planeGeometry args={[400, 200, 400, 400]} />
      <shaderMaterial
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
         uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>
    </RigidBody>
    <BlueMountains />
    <Wall />

    {houses.map((item, i) => {
        const clonedHouse = house.scene.clone(true);

        return(
            <group
            key={i}
            position={item.position}
           
          >
            <primitive object={clonedHouse} scale={5} />
           
          </group>
        )
       })}
   </>
  )
}

export default Experience
