"use client"
import { useThree } from "@react-three/fiber";
import { createContext, useRef, useState } from "react";
import { posters } from "../components/Posters";
import gsap from 'gsap'

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
     const [info, setInfo] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [posterIndex, setPosterIndex] = useState(0);
    const [cameraReturn, setCameraReturn] = useState(null);
   const [cinemaStart, setCinemaStart] = useState(false);
   const [season, setSeason] = useState('summer');
   const [showSeasonModal, setShowSeasonModal] = useState(false);
   const [homeCamera, setHomeCamera] = useState(false);
   const stopMovie = useRef(null);
   const [stopTheMovie, setStopTheMovie] = useState(false);

    const [allMovies, setAllMovies] = useState(false);
    
    const [sun, setSun] = useState(0);


    const cinemaCamera = (camera) => {
   
        gsap.to(camera.position, {
          x: -100.40,
          y: 20.88,
          z: 10.88,
          
          duration: 1,
          ease: "power2.inOut"
         });
      
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0
      })

    }

 




  return (
    <UserContext.Provider value={{allMovies, setAllMovies, stopTheMovie, setStopTheMovie, stopMovie, homeCamera, setHomeCamera, showSeasonModal, setShowSeasonModal, season, setSeason, sun, setSun, cinemaStart, setCinemaStart, cinemaCamera, cameraReturn, setCameraReturn, info, setInfo , showMenu, setShowMenu, posterIndex,setPosterIndex}}>
      {children}
    </UserContext.Provider>
  );
};