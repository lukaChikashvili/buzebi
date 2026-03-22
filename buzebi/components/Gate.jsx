import { useGLTF, useTexture } from '@react-three/drei'
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'
import { UserContext } from '../context/userContext'

const Gate = () => {

    const { setShowSeasonModal, showSeasonModal } = useContext(UserContext);
    
      const gate = useGLTF('./gate.glb');
      const lamp = useGLTF('./lamp.glb');

      const green = useTexture('./green.jpg');
      const marble = useTexture('./marble.jpg');
      const whiteMarble = useTexture('./gold.jpg');

      const { camera } = useThree();
      const gallery = useTexture('./gallery.png');
      const rules = useTexture('./rules.png');

     const buttonRef = useRef();
     const seasonRef = useRef();
     const galleryRef = useRef();
     const rulesRef = useRef();
     const tl = useRef();

     const initialX = -19.6;

     useLayoutEffect(() => {
        const buttons = [
          buttonRef.current.position,
          seasonRef.current.position,
          galleryRef.current.position,
          rulesRef.current.position
        ];
      
        const ctx = gsap.context(() => {
          tl.current = gsap.timeline({ paused: true });
      
          tl.current.from(buttons, {
            x: -25,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2
          });
      
         
          tl.current.play();
        });
      
        return () => ctx.revert();
      }, []);

      useEffect(() => {
        if (!tl.current) return;
      
        if (showSeasonModal) {
          tl.current.reverse(); 
        } else {
          tl.current.play(); 
        }
      }, [showSeasonModal]);
   

    green.wrapS = green.wrapT = THREE.RepeatWrapping;

    green.repeat.set(5, 5);

    whiteMarble.wrapS = whiteMarble.wrapT = THREE.RepeatWrapping;

    whiteMarble.repeat.set(1, 1);

    const movies = useTexture('./movie.png');
    const season = useTexture('./season.png');

    useEffect(() => {
        gate.scene.traverse((child) => {
            if(child.isMesh) {
                console.log(child.name);
                if(child.name === "Sphere001__0") {
                    child.material = child.material.clone();
                    child.material.map = marble;
                    child.material.color.set('#8F0177')
                    child.material.needsUpdate = true
                }

                if(child.name === "Sphere016__0") {
                    child.material = child.material.clone();
                    child.material.map = marble;
                    child.material.color.set('#8F0177')
                    child.material.needsUpdate = true
                }

                if(child.name === "Box001__0") {
                    child.material = child.material.clone();
                    child.material.map = whiteMarble;
                    child.material.color.set('#25343F')
                    child.material.needsUpdate = true;
                }
               
                if(child.name === "Box008__0") {
                    child.material = child.material.clone();
                    child.material.map = whiteMarble;
                    child.material.color.set('#25343F')
                    child.material.needsUpdate = true;
                    
                }
            }
        })

    }, [gate]);

    const initialZ = useRef();

    useEffect(() => {
        if(buttonRef.current){
          initialZ.current = buttonRef.current.position.x;
        }
      }, []);

      const handleHover = (ref) => {
        gsap.to(ref.current.position, {
            x: initialX - 0.2, 
            duration: 0.2,
            ease: "power2.out"
        });
    }

    const handleLeave = (ref) => {
        gsap.to(ref.current.position, {
            x: initialX,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    const startGame = () => {
        gsap.to(camera.position, {
            x: 1.70,
            y: 9.66,
            z: 22,
            duration: 1.5,
            delay: 1, 
            ease: "power2.inOut"
        })
    }

    

const showModal = () => {
   setShowSeasonModal(!showSeasonModal);

   
}

  return (
 <>
    
 <primitive object={gate.scene} scale = {0.4} rotation = {[0, 1.5, 0]} position = {[-2, -5, 120]} />
 
 <mesh position={[-22, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 20, 5]} />
        <meshBasicMaterial map = {green} color = 'gray'  />
      </mesh>

      <mesh position={[11.5, 10, 145]} rotation={[0, 1.5, 0]}>
        <boxGeometry args={[30, 20, 5]} />
        <meshBasicMaterial map = {green} color = 'gray' />
      </mesh>

      <primitive position = {[-22, 17, 121.5]} object={lamp.scene} scale = {0.01} />
      <primitive position = {[12, 17, 124]} object={lamp.scene.clone()} scale = {0.01} />

  <mesh ref = {buttonRef} position={[-19.6, 16, 135]} rotation={[0, 1.5, 0]} 
  onPointerEnter={() => handleHover(buttonRef)} 
  onPointerLeave={() => handleLeave(buttonRef)} onClick={startGame}>
     <boxGeometry args = {[6, 2, 2.5]} />
     <meshBasicMaterial map = {movies} />
  </mesh>

  <mesh ref = {seasonRef} position={[-19.6, 13, 135]} rotation={[0, 1.5, 0]} 
  onPointerEnter={() => handleHover(seasonRef)} 
  onPointerLeave={() => handleLeave(seasonRef)} onClick={showModal} >
     <boxGeometry args = {[6, 2, 2.5]} />
     <meshBasicMaterial map = {season} />
  </mesh>

  <mesh ref = {galleryRef} position={[-19.6, 10, 135]} rotation={[0, 1.5, 0]} 
  onPointerEnter={() => handleHover(galleryRef)} 
  onPointerLeave={() => handleLeave(galleryRef)} >
     <boxGeometry args = {[6, 2, 2.5]} />
     <meshBasicMaterial map = {gallery} />
  </mesh>

  <mesh ref = {rulesRef} position={[-19.6, 7, 135]} rotation={[0, 1.5, 0]} 
  onPointerEnter={() => handleHover(rulesRef)} 
  onPointerLeave={() => handleLeave(rulesRef)} >
     <boxGeometry args = {[6, 2, 2.5]} />
     <meshBasicMaterial map = {rules} />
  </mesh>



 </>
  )
}

export default Gate
