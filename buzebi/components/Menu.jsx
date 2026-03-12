'use client'
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { posters } from "./Posters";
import { UserContext } from "../context/userContext";

const MenuChainGroup = forwardRef(({ position, posterTexture, onClick }, ref) => {
  const chain = useGLTF("./chain.glb");
  

  return (
    <group ref={ref} position={position}>
      <primitive object={chain.scene.clone()} scale={0.4} position={[-4, 4, -0.6]} />
      <primitive object={chain.scene.clone()} scale={0.4} position={[4, 4, -2]} />
      <mesh position={[0, 4.3, 0]} rotation={[-1.6, 0, 0.3]} onClick={onClick}>
        <boxGeometry args={[15, 0.5, 6]} />
        <meshStandardMaterial map={posterTexture} />
      </mesh>
    </group>
  );
});

const Menu = ({ isOpen }) => {

  const posterCameraPositions = [
   


    { x: 1.70, y:  9.66, z: 20.5 },
    { x: -11.97, y: 9.51, z: -7.37 },
    { x: 64.54, y: 12.54, z: 21 },
    {x: 85, y: 8, z: 40 }
  ];

  const focusPoster = (index) => {
    const target = posterCameraPositions[index];
    if (!target) return;
  
    
    
  
  
    gsap.to(camera.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1.5,
      delay: 1, 
      ease: "power2.out"
    });
  };



  const group = useRef();
  const { camera } = useThree();
  const chainRefs = useRef([]);
  const { showMenu, setPosterIndex } = useContext(UserContext);


  const posterTextures = posters.map(p => useTexture(p.img));

  const arrowModel = useGLTF('./arrow.glb');

  useEffect(() => {
    if (!group.current) return;

    if (isOpen) {
      group.current.visible = true;
      gsap.to(group.current.position, { y: 1, duration: 1, ease: "power3.out" });
      gsap.to(group.current.rotation, { x: 0, duration: 1, ease: "power3.out" });
    } else {
      gsap.to(group.current.position, { y: -5, duration: 0.8, ease: "power3.in" });
      gsap.to(group.current.rotation, { x: -0.5, duration: 0.8, ease: "power3.in" });
      gsap.delayedCall(0.8, () => {
        group.current.visible = false;
      });
    }

    if (showMenu) {
      gsap.to(camera.position, 
        { x: 0.093, y: 9.58, z: 
          40.333, duration: 1, ease: "circ.inOut", delay: 0.5 });

         
    }
  }, [isOpen, showMenu, camera]);

  const moveChains = (xOffset) => {
    chainRefs.current.forEach(ref => {
      if (ref) {
        gsap.to(ref.position, { x: ref.position.x + xOffset, duration: 1, ease: "power2.inOut" });
      }
    });
  };

  const handleNext = () => {
    moveChains(15);
  
  
  };
  
  const handlePrev = () => {
    moveChains(-15);
  
   
  };
  return (
    <group ref={group} position={[15, 5, 31]} rotation={[-0.5, 0, 0]} visible={false}>

{posterTextures.map((texture, i) => (
  <MenuChainGroup
    key={i}
    ref={(el) => (chainRefs.current[i] = el)}
    position={[i * 17 - ((posterTextures.length - 1) * 13) / 2, 0, 0]}
    posterTexture={texture}
    onClick={() => {
      focusPoster(i);      
      setPosterIndex(i);    
    }}
  />
))}

     
<group position={[-15, -3, 3]}>

  <group
    position={[2, 5, 3]}
    rotation={[0,0, 0]}
    scale={0.5}
    onClick={handlePrev}       
    onPointerOver={(e) => e.stopPropagation()} 
  >
    {arrowModel.scene.clone().children.map((child, i) => (
      <primitive key={i} object={child} />
    ))}
  </group>

  <group
    position={[-2, 5, 3]}
    rotation={[0,  Math.PI, 0]} 
    scale={0.5}
    onClick={handleNext}   
    onPointerOver={(e) => e.stopPropagation()}
  >
    {arrowModel.scene.clone().children.map((child, i) => (
      <primitive key={i} object={child} />
    ))}
  </group>
</group>




    </group>
  );
};

export default Menu;