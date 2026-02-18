import { grassVertex } from "../shaders/vertex"
import { grassFragment } from "../shaders/fragment"
import * as THREE from 'three'
import { useContext, useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Sky, Stars, useGLTF } from "@react-three/drei"
import BlueMountains from "./BlueMountains"
import Wall from "./Wall"
import { RigidBody } from "@react-three/rapier"
import gsap from 'gsap'
import { UserContext } from "../context/userContext"
import Menu from "./Menu"
import Sherekilebi from "./Sherekilebi"
import Romani from "./Romani"

const Experience = () => {

  const lamps = useMemo(() => [
    { position: [-30, 0, -15], rotation: [0, Math.PI / 2, 0], scale: 0.4 },
    { position: [-5, 0, 1], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
    { position: [5, 0, -4], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
    { position: [30, 0, 10], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
    { position: [40, 0, 10], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
    { position: [46, 0, -10], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
    { position: [-30, 0, -30], rotation: [0, Math.PI / 2, 0], scale: 0.3 },
  ], []);



  const lamp = useGLTF('./street_lamp.glb');


  

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
  uSeason: { value: 1.0 }
});

useFrame((state) => {
  const elapsed = state.clock.getElapsedTime();

  uniforms.current.uTime.value += 0.025;
 

});

const house = useGLTF('./house.glb');

const { camera } = useThree();
const { info, showMenu } = useContext(UserContext);

useEffect(() => {
  if(info === false) {
   gsap.to(camera.position, {
     x: 2.74,
     y: 10.12,
     z: 24.025,
     duration: 1.2,
     ease: "power3.inOut"
   })
  }
}, [info]);


useEffect(() => {
  console.log(camera.position)
}, [camera.position])


  return (
   <>
   <Environment preset="sunset" />
   
   <Sky 
  distance={450000} 
  sunPosition={[1, 0, 2]}                
  turbidity={10}                  
  rayleigh={10}                   
  mieCoefficient={0.01}          
  mieDirectionalG={0.10}         
  elevation={0}                
  azimuth={0.25} 
  
/>

 <Stars radius={100} depth={50} count={13000} factor={4} saturation={0} fade  />
 
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

    <Sherekilebi />
    <Romani />

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


{lamps.map((item, i) => {
  const clonedLamp = lamp.scene.clone(true);

  return (
    <group
      key={i}
      position={item.position}
      rotation={item.rotation}
      scale={item.scale}
    >
      <primitive object={clonedLamp} />
    </group>
  );
})}
  
   </>
  )
}

export default Experience
