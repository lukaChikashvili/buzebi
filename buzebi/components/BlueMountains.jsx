"use client"
import { Html, Text3D, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import React, { use, useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { UserContext } from '../context/userContext'
import Poster from './Poster'
import { posters } from './Posters'
import { RigidBody } from '@react-three/rapier'
import Sign from './Sign'
import Box from './Box'


const BlueMountains = ({ setActiveMovie }) => {
  const { camera} = useThree();



    const [matcapTexture] = useMatcapTexture('1A2461_3D70DB_2C3C8F_2C6CAC', 256);

    const cisferi = useTexture('./cisferi.jpg');

    const tvRef = useRef();
    const signRef = useRef();



    const { posterIndex, cameraReturn, info, cinemaCamera, setCinemaStart} = useContext(UserContext);

    const oldMan = useGLTF('./old_man.glb');

    const sign = useGLTF('./sign.glb');


    const handleRotate = () => {
      if (!signRef.current) return
    
      gsap.to(signRef.current.rotation, {
        y: signRef.current.rotation.y + 5.8,
        duration: 0.6,
        ease: "power3.out"
      })
    }

    const handleRotateBack = () => {
      if (!signRef.current) return
    
      gsap.to(signRef.current.rotation, {
        y: signRef.current.rotation.y - 5.8,
        duration: 0.6,
        ease: "power3.out"
      })
    }

  
  let shaderRef = useRef();
  let bookRef = useRef();
  const textRef = useRef()

  // text
  const [text, setText] = useState(false);
 const {setInfo, setCameraReturn } = useContext(UserContext);

 const table = useGLTF('./table.glb');
 const phone = useGLTF('./phone.glb');


 const handleTv = () => {

  setActiveMovie('https://res.cloudinary.com/ddkwnpzev/video/upload/v1772565957/%E1%83%A4%E1%83%98%E1%83%9A%E1%83%9B%E1%83%98_%E1%83%AA%E1%83%98%E1%83%A1%E1%83%A4%E1%83%94%E1%83%A0%E1%83%98_%E1%83%9B%E1%83%97%E1%83%94%E1%83%91%E1%83%98_%E1%83%90%E1%83%9C%E1%83%A3_%E1%83%93%E1%83%90%E1%83%A3%E1%83%AF%E1%83%94%E1%83%A0%E1%83%94%E1%83%91%E1%83%94%E1%83%9A%E1%83%98_%E1%83%90%E1%83%9B%E1%83%91%E1%83%90%E1%83%95%E1%83%98__gwlp2d.mp4');
  

  cinemaCamera(camera);

 
  setTimeout(() => {
    setCinemaStart(true);
  }, 1200);
}



    

      useFrame(({ clock }) => {
        if (shaderRef.current) {
          shaderRef.current.uniforms.uTime.value += 0.004;
        }
      })

      const deskModel = useGLTF('./desk.glb');

     //add wood texture
     const woodTexture = useTexture('./wood.jpg');
     const plane = useGLTF('./paper_plane.glb');


     useEffect(() => {

 

      
        
       deskModel.scene.traverse((child) => {
         if(child.isMesh) {
          if(child.name === "desk2_BlackWood_0") {
            child.material.map = woodTexture;
        
           child.material.needsUpdate = true;
          }

          if(child.name === "desk2_SeconadryColor_0") {
            child.material.color = new THREE.Color('white');
          }
        
         }
       })
      

     }, [deskModel, woodTexture]);










      const book = useGLTF('./book.glb');

      // text appear
      const appearText = () => {
         setText(true);

         requestAnimationFrame(() => {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
          )
        })
      }

      const hideText = () => {
      
        setText(false);

        gsap.to(textRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.8,
          duration: 0.4,
          ease: 'power2.in',
          
        })
      }

     

      
// show info
const showInfo = () => {
  setCameraReturn({
    x: 1.7,
    y: 8.66,
    z: 20.5
  });


  gsap.to(camera.position, {
    x: 1,
    y:9,
    z: 12,
    duration: 1,
    delay: 1,
    ease: "circ.inOut"
  });

  setInfo({
    title: "ცისფერი მთები ანუ დაუჯერებელი ამბავი",
    
    desc: `   
    „ცისფერი მთები ანუ დაუჯერებელი ამბავი“ — ქართული მხატვრული ფილმი. მისი რეჟისორია ელდარ შენგელაია. გამოვიდა 1984 წელს. ფილმი გადაღებულია რეზო ჭეიშვილის ამავე სახელწოდების მოთხრობის მიხედვით.
    ახალგაზრდა მწერალს რედაქციაში მოთხრობა მიაქვს. მისი განხილვის მოლოდინში გადის შემოდგომა, ზამთარი, გაზაფხული… მოთხრობას არათუ არავინ კითხულობს, მისი ყველა არსებული ეგზემპლარიც უკვალოდ ქრება. ამ დაწესებულებაში ყველა თავისი საქმით არის გართული: დირექტორი მუდამ გადარბენაზეა — თათბირიდან ბანკში, ბანკიდან შეხვედრაზე, შეხვედრიდან ბანკეტზე და ასე დაუსრულებლად, რედაქტორებიდან ზოგი ფრანგულს სწავლობს, ზოგი კერავს, ზოგი საუზმეს იმზადებს, ვიღაც შვებულებაშია, ვიღაც — მივლინებაში, სხვები ჭადრაკს თამაშობენ… ერთადერთი ადამიანი, ვინც ხელნაწერებს კითხულობს, მღებავია… ფილმი ალეგორიული კომედიაა. იგი ნიღაბს ხდის საბჭოთა ბიუროკრატიზმს და უპასუხისმგებლობას. რედაქციაში მუშაობენ თავიანთი ვიწრო, ობივატელური ინტერესების ჩარჩოში მომწყვდეული ადამიანები; ამ სისტემის არაეფექტურობა სრულდება პირდაპირ მნიშვნელობით დაწესებულების ნგრევით, გადატანით კი — საბჭოთა სისტემის ნგრევით.
    
    `
  });

}

// old tv model
const tv = useGLTF('./tv.glb');

useEffect(() => {
  if (info === null && cameraReturn) {
    gsap.to(camera.position, {
      x: cameraReturn.x,
      y: cameraReturn.y,
      z: cameraReturn.z,
      duration: 1,
      ease: "circ.inOut",
    });
  }
}, [info]);
    

  return (
    <>
    
    <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.8}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-12, 9, 15]}
        rotation={[0, 0.7, 0]}
      >
        {``}
        <meshMatcapMaterial color = "4E78A0" matcap={matcapTexture} />
      </Text3D>
      

      <Poster
  image={posters[posterIndex].img}
  position={[15, 12, -10]}
  rotation={[0, -0.9, 0]}
/>

     

     <primitive object={deskModel.scene}  rotation = {[0, -0.5, 0]} position = {[6, 5.5, 12]}  scale = {0.10} />
      <primitive onClick = {showInfo} onPointerOver = {appearText} onPointerOut = {hideText}  ref = {bookRef} object={book.scene} scale = {3.5} rotation = {[0, 0.7, 0]} position = {[3, 8, 10]} />

     <primitive ref = {tvRef} onClick = {handleTv} object={tv.scene} scale = {0.06} rotation = {[0, 0.8, 0]} position = {[6.5, 7.5, 12]}  />

     
      <primitive object={table.scene} scale = {0.07} position = {[-7, 0.7, 7]} />
     <primitive object={phone.scene} scale = {11} position = {[-7, 6.7, 7]} /> 

     
    

      {text && <Html className='text'>
           <h1  style={{ opacity: 0, transform: 'translateY(30px) scale(0.8)' }} ref = {textRef} className='-mt-48  -ml-4 w-48 text-center border-2  border-white bg-purple-300 rounded-md shadow-lg px-2 py-2'>
              ფილმის შესახებ
           </h1>
        </Html>}


 <RigidBody colliders = "trimesh"
  mass={5}
  type="dynamic"
  enabledRotations={[true, true, true]}>
   <primitive object={oldMan.scene} scale = {6.5} position = {[-10, 0, 10]} rotation = {[0, 1, 0]} />
   </RigidBody>



 <RigidBody mass = {0.5} colliders = "hull"  angularDamping={0.1}  linearDamping={0}>
   <mesh position = {[-11, 50, 8]} rotation = {[0, 0, 0]}>
     <boxGeometry args = {[7, 7, 0.5]} />
     <meshBasicMaterial map = {cisferi} />
   </mesh>
   </RigidBody>

    


  <Sign ref = {signRef} scale = {2} position = {[-5, 0, 14]} 
  rotation={[0, 1, 0]} image = "/cisferi.png" onPointerOver = {handleRotate}
  onPointerOut = {handleRotateBack}
         /> 

         <Box rotation = {[0, -1.2, 0]} position = {[10, 7.6, 13]} scale = {0.024} />
    </>
  )
}

export default BlueMountains
