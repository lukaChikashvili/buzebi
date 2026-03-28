import { grassVertex } from "../shaders/vertex"
import { grassFragment } from "../shaders/fragment"
import * as THREE from 'three'
import { useContext, useEffect, useMemo, useRef, useState } from "react"
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
import Cinema from "./Cinema"
import Natvris from "./Natvris"
import Gate from "./Gate"


const Experience = () => {

  const { camera, viewport } = useThree();

  useEffect(() => {
   
    if (viewport.width < 250 && camera.position.z > 140) {
      gsap.to(camera.rotation, {
        y: Math.PI / 6, 
        duration: 0.5,
        ease: "power2.inOut"
      });
    } 
  
    else if (camera.position.z > 130) {
      gsap.to(camera.rotation, {
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
    

  }, [viewport.width, camera.position.z]);






  const [activeMovie, setActiveMovie] = useState(null);

  

 
  const steps = [0.3, 1.5, 5, 10, 20, 30, 0.3, -0.5]; 

const index = useRef(0);
const progress = useRef(0);

useFrame((state, delta) => {

  progress.current += delta * 0.05;

  if (progress.current >= 1) {
    progress.current = 0
    index.current = (index.current + 1) % steps.length;
  }

  const start = steps[index.current];
  const end = steps[(index.current + 1) % steps.length];

  const value = start + (end - start) * progress.current;

  setSun(value);
})

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

  const { info, setSun, sun, season , homeCamera} = useContext(UserContext);

  // return to home inital position
  useEffect(() => {
      if(homeCamera) {
        gsap.to(camera.position, {
          x: -5,
          y: 12,
          z: 150,
          duration: 1,
          delay: 0.2,
          ease: "power2.inOut"
        });

      }
  }, [homeCamera]);


const uniforms = useRef({
  uTime: { value: 0 },
  uSeason: { value: season }
});


// change seasons
useEffect(() => {
  const seasonMap = {
    summer: 1.4,
    winter: 2.8,
    spring: 0.3,
    autumn: 2.3,
  };

  uniforms.current.uSeason.value = seasonMap[season];
}, [season]);




useFrame((state) => {
  const elapsed = state.clock.getElapsedTime();

  uniforms.current.uTime.value += 0.025;
 

});

const house = useGLTF('./house.glb');




useEffect(() => {
  if(info === false) {
   gsap.to(camera.position, {
     x: 1.70,
     y: 9.66,
     z: 22,
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
  rayleigh={sun}                   
  mieCoefficient={0.01}          
  mieDirectionalG={0.10}         
  elevation={-5}                
  azimuth={0.25} 
  
/>

 <Stars radius={100} depth={50} count={13000} factor={4} saturation={0} fade  />
 
<RigidBody type="fixed">
    <mesh rotation={[-Math.PI / 2, 0, 0]} position = {[0, -3, 0]}>
      <planeGeometry args={[400, 700, 400, 400]} />
      <shaderMaterial
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
         uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>
    </RigidBody>
    <BlueMountains setActiveMovie = {setActiveMovie} />
    <Wall />

    <Sherekilebi setActiveMovie = {setActiveMovie} />
    <Romani />
    <Natvris />
    <Gate />

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
  

  <Cinema screenProps={{position: [0, 2.5, -3.6],  
                        size: [10.5, 4], 
                        movieSrc: activeMovie}} />


   </>
  )
}

export default Experience
