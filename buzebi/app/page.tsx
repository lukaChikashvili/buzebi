"use client"
import Experience from '@/components/Experience';
import Header from '@/components/Header';
import Lights from '@/components/Lights';
import { useGame } from '@/context/GameContext';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { useContext, useState } from 'react';

export default function Home() {

   const {start, flies, setScore} = useGame();

   const [userAnswer, setUserAnswer] = useState("");

   const [text, setText] = useState("");
 
   
  // correct answer
   const calculateAnswer = () => {
    if(!userAnswer) {
      setText("ველი ცარიელია, გთხოვთ ჩაწეროთ რიცხვი ");
      return;
    }

    const actual = flies.length;
    const guess = Number(userAnswer);
    const difference = Math.abs(actual - guess);

    let gained = 0;

    if (difference === 0) {
      gained = 50;
      setText("თქვენ ზუსტად გამოიცანით! 50 ქულა!")
    } else if (difference <= 100) {
      gained = 20;
      setText(`თქვენ აცდით ${difference}-ით, 20 ქულა!`)
    } else {
      gained = 0;
      setText(`სამწუხაროდ, თქვენ აცდით ${difference}-ით, 0 ქულა!`)
    }

    
    setScore(prev => prev + gained);
   }


  return (
    <>
     <div className="relative w-full h-screen">
      <Header />

  <Canvas
    camera={{
      position: [-1, 1, 1.3],
      fov: 75,
      near: 0.1,
      far: 1000,
    }}
  >
    
    <Lights />
    <Experience />
  </Canvas>


  <div className="absolute bottom-40 w-full flex flex-col items-center text-white z-10 px-4">
  
  {start && (
  <div className="flex flex-col sm:flex-row gap-4 items-center">
    <div className="relative w-full sm:w-60 group">
      <span
        className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-linear-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100"
      ></span>
      <input
        type="text"
        id="input"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder=""
        className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md 
                   focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
      />
      <label
        htmlFor="input"
        className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                   peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text"
      >
        ჩაწერეთ რიცხვი
      </label>
    </div>

    <button
      onClick={calculateAnswer}
      className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base"
    >
      პასუხი
    </button>
  </div>
)}

<div className="mt-4 text-center">
  <h2 className="text-base sm:text-lg md:text-xl text-green-300 font-bold break-words max-w-xs sm:max-w-md">
    {text}
  </h2>
</div>
</div>
</div>
    </>
  );
}
