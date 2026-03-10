"use client"

import { Canvas, useThree } from "@react-three/fiber";
import Experience from "../components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../components/Lights";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/userContext";
import Info from "../components/Info";
import mount from '../public/mountImage.jpg'
import gsap from "gsap";
import Menu from "../components/Menu";
import { posters } from "../components/Posters";


export default function Home() {
  

  




const { info, showMenu, setShowMenu, posterIndex, cinemaStart  } = useContext(UserContext);


const audioRef = useRef(null);
  const titleRef = useRef();

  useEffect(() => {
    if (!audioRef.current) return;
  
    if (cinemaStart) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Audio blocked"));
    }
  }, [cinemaStart]);

 
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) {
        const firstMusic = new Audio(posters[posterIndex].music);
        firstMusic.loop = true;
        firstMusic.volume = 1;
        firstMusic.play().catch(() => console.log("Audio blocked"));
        audioRef.current = firstMusic;
      }
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);

    if(cinemaStart) {
      
    }
    return () => document.removeEventListener("click", unlockAudio);

  
  }, []); 

  
  useEffect(() => {
    if (!audioRef.current) return; 

    
    audioRef.current.pause();

   
    const newAudio = new Audio(posters[posterIndex].music);
    newAudio.loop = true;
    newAudio.volume = 1;
    newAudio.play().catch(() => console.log("Audio blocked"));

   
    audioRef.current = newAudio;

    return () => {
      newAudio.pause();
    };
  }, [posterIndex]);








  

  return (
    <>
     <div className="fixed inset-0 overflow-hidden">
       <div className="absolute top-4 right-8 z-10">
       <p
  onClick={() => {
    setShowMenu(!showMenu);
   
  }}
  className="w-10 h-10 text-white"
>
        ⦿⦿⦿
        
          </p> 
       </div>


      


       {info && (
  <div className="absolute inset-0 z-50 pointer-events-auto">
    <Info
      title={info.title}
      image={info.image}
      desc={info.desc}
    />
  </div>
)}


      <Canvas  camera={{ position: [

-5, 
14, 
150], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1)
        }}>
        
        <Physics gravity={[0, -9.81, 0]}>
       <Menu isOpen={showMenu} />
   
       <Experience />
       </Physics>
       <Lights />
      </Canvas>

      



  </div>
    </>
  );
}
