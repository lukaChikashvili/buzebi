"use client"
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface GameContextType {
  start: boolean;
  setStart: (value: boolean) => void;
  flies: Array<[number, number, number]>;
  setFlies: (flies: Array<[number, number, number]>) => void;
  score: number, 
  setScore: Dispatch<SetStateAction<number>>;
}


const GameContext = createContext<GameContextType | undefined>(undefined);


interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [start, setStart] = useState(false);
  const [flies, setFlies] = useState<Array<[number, number, number]>>([]);
  const [score, setScore] = useState(0); 

  return (
    <GameContext.Provider value={{ start, setStart, flies, setFlies, score, setScore}}>
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