"use client"
import { useThree } from "@react-three/fiber";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [info, setInfo] = useState(false);

  


  return (
    <UserContext.Provider value={{ info, setInfo }}>
      {children}
    </UserContext.Provider>
  );
};