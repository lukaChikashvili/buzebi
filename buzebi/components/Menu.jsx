'use client'
import { useGLTF } from '@react-three/drei'
import { useContext, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { UserContext } from '../context/userContext';
import { useThree } from '@react-three/fiber';

const Menu = ({ isOpen }) => {
  const group = useRef();
  const chain = useGLTF('./chain.glb');

  const { showMenu } = useContext(UserContext);
  const { camera } = useThree();


  const chains = useMemo(() => {
    return [chain.scene.clone(), chain.scene.clone()]
  }, [chain]);

  useEffect(() => {
    if (!group.current) return;

    if (isOpen) {
      group.current.visible = true;

      gsap.to(group.current.position, {
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.to(group.current.rotation, {
        x: 0,
        duration: 1,
        ease: "power3.out"
      });

    } else {
      gsap.to(group.current.position, {
        y: -8,
        duration: 0.8,
        ease: "power3.in"
      });

      gsap.to(group.current.rotation, {
        x: -0.5,
        duration: 0.8,
        ease: "power3.in"
      });

      gsap.delayedCall(0.8, () => {
        group.current.visible = false
      });
    }

    if(showMenu) {
        gsap.to(camera.position, {
            x: 3, 
            y: 10, 

            z: 40,
            duration: 1,
            ease: 'circ.inOut',
            delay: 0.5
        })
    }
  }, [isOpen]);


  return (
    <group ref={group} position={[0, -8, 4]} rotation={[-0.5, 0, 0]} visible={false}>

    <primitive scale = {0.7} object={chains[0]} position={[-1, 7, 0]} />
 
    <primitive scale = {0.7} object={chains[1]} position={[5, 7, 0]} />
   
    <mesh position={[0, 10, 0]} rotation = {[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[10, 0.2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  </group>
  )
}

export default Menu
