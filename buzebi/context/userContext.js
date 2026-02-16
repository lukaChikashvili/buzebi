"use client"
import { useThree } from "@react-three/fiber";
import { createContext, useState } from "react";
import { posters } from "../components/Posters";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [info, setInfo] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [posterIndex, setPosterIndex] = useState(0);


 


  return (
    <UserContext.Provider value={{  info, setInfo , showMenu, setShowMenu, posterIndex,setPosterIndex}}>
      {children}
    </UserContext.Provider>
  );
};