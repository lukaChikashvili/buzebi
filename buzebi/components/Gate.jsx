import { useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'
import { UserContext } from '../context/userContext'



const Gate = () => {

    // matcam gold
    const [matcap] = useMatcapTexture('714C30_EAD7C5_CC9265_E2B48F', 256);
   

  
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

     const winter = useTexture('./winter.png');
     const spring = useTexture('./spring.png');
     const summer = useTexture('./summer.png');
     const autumn = useTexture('./autumn.png');

     const snowButton = useTexture('./snowButton.png');
     const sunButton = useTexture('./sun.png');
     const leaf = useTexture('./leaf.png');
     const leafff = useTexture('./leafff.png');

     const [currentSeasonTexture, setCurrentSeasonTexture] = useState(winter);



     winter.colorSpace = THREE.SRGBColorSpace;
     summer.colorSpace = THREE.SRGBColorSpace;
     autumn.colorSpace = THREE.SRGBColorSpace;
     spring.colorSpace = THREE.SRGBColorSpace;

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
        if (showSeasonModal) return;

        gsap.to(ref.current.position, {
            x: initialX - 0.2, 
            duration: 0.2,
            ease: "power2.out"
        });
    }

    const handleLeave = (ref) => {
        if (showSeasonModal) return;

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

const frontRef = useRef();
const [nextTexture, setNextTexture] = useState(null);

useEffect(() => {
  if (!currentSeasonTexture || !frontRef.current) return;

  
  if (nextTexture) {

    const tempMat = frontRef.current.material.clone();
    tempMat.map = nextTexture;
    tempMat.transparent = true;
    tempMat.opacity = 0;

    const tempMesh = new THREE.Mesh(frontRef.current.geometry, tempMat);
    tempMesh.position.copy(frontRef.current.position);
    tempMesh.rotation.copy(frontRef.current.rotation);
    frontRef.current.parent.add(tempMesh);


    gsap.to(tempMat, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        frontRef.current.material.map = nextTexture;
        frontRef.current.material.needsUpdate = true;
        frontRef.current.parent.remove(tempMesh);
        setNextTexture(null); 
      }
    });
  }
}, [nextTexture]);

let btnRef = useRef();
let btn2Ref = useRef();
let btn3Ref = useRef();
let btn4Ref = useRef();

const initialPositions = useRef({
  btnRef: null,
  btn2Ref: null,
  btn3Ref: null,
  btn4Ref: null,
});

useEffect(() => {
  if (
    !btnRef.current ||
    !btn2Ref.current ||
    !btn3Ref.current ||
    !btn4Ref.current
  ) return;

  initialPositions.current = {
    btnRef: btnRef.current.position.clone(),
    btn2Ref: btn2Ref.current.position.clone(),
    btn3Ref: btn3Ref.current.position.clone(),
    btn4Ref: btn4Ref.current.position.clone(),
  };
}, [showSeasonModal]); 

// button hover effect
const buttonHover = (ref, key) => {
  if (!ref.current) return;

  gsap.to(ref.current.position, {
    x: initialPositions.current[key].x + 0.03,
    y: initialPositions.current[key].y,
    z: initialPositions.current[key].z,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(ref.current.scale, {
    x: 1.1,
    y: 1.1,
    z: 1.1,
    duration: 0.3,
    ease: "power2.out",
  });
};

const buttonLeave = (ref, key) => {
  if (!ref.current) return;

  gsap.to(ref.current.position, {
    x: initialPositions.current[key].x,
    y: initialPositions.current[key].y,
    z: initialPositions.current[key].z,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(ref.current.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

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

  {showSeasonModal && <>
  
    <mesh position={[-19.8, 13, 134.9]} rotation={[0, 1.5, 0]}>
  <boxGeometry args={[8.5, 10.5, 2.25]} /> 
  <meshMatcapMaterial matcap={matcap} />
</mesh>


  <mesh   ref={frontRef} position={[-19.7, 13, 135]} rotation={[0, 1.5, 0]} >
      <boxGeometry args = {[8, 10, 2.2]} />
      <meshBasicMaterial map = {currentSeasonTexture}  />
     </mesh>

     <group>
     <mesh
  ref={btnRef} 
  position={[-19.4, 6, 138]} 
  rotation={[0, 1.5, 0]}
  onPointerOver={() => setNextTexture(winter)}
  onPointerEnter={() => buttonHover(btnRef, 'btnRef')}
  onPointerLeave={() => buttonLeave(btnRef, 'btnRef')}
>
  <boxGeometry args={[1.7, 2]} />
  <meshBasicMaterial map={snowButton} />
</mesh>

<mesh
  ref={btn2Ref} 
  position={[-19.3, 6, 136]} 
  rotation={[0, 1.5, 0]}
  onPointerOver={() => setNextTexture(summer)}
  onPointerEnter={() => buttonHover(btn2Ref, 'btn2Ref')}
  onPointerLeave={() => buttonLeave(btn2Ref, 'btn2Ref')}
>
  <boxGeometry args={[1.7, 2]} />
  <meshBasicMaterial map={sunButton} />
</mesh>

<mesh
  ref={btn3Ref} 
  position={[-19.2, 6, 134]} 
  rotation={[0, 1.5, 0]}
  onPointerOver={() => setNextTexture(spring)}
  onPointerEnter={() => buttonHover(btn3Ref, 'btn3Ref')}
  onPointerLeave={() => buttonLeave(btn3Ref, 'btn3Ref')}
>
  <boxGeometry args={[1.7, 2]} />
  <meshBasicMaterial map={leaf} />
</mesh>

<mesh
  ref={btn4Ref} 
  position={[-19, 6, 132]} 
  rotation={[0, 1.5, 0]}
  onPointerOver={() => setNextTexture(autumn)}
  onPointerEnter={() => buttonHover(btn4Ref, 'btn4Ref')}
  onPointerLeave={() => buttonLeave(btn4Ref, 'btn4Ref')}
>
  <boxGeometry args={[1.7, 2]} />
  <meshBasicMaterial map={leafff} />
</mesh>
</group>
     
     </>

     }



 </>
  )
}

export default Gate
