"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";


interface GameContextType {
  start: boolean;
  setStart: (value: boolean) => void;
  flyCount: number;
  setFlyCount: (value: number) => void;
}


const GameContext = createContext<GameContextType | undefined>(undefined);


interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [start, setStart] = useState(false);
  const [flyCount, setFlyCount] = useState(0);

  return (
    <GameContext.Provider value={{ start, setStart, flyCount, setFlyCount }}>
      {children}
    </GameContext.Provider>
  );
};


export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};