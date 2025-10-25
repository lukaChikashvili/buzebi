"use client"
import Experience from '@/components/Experience';
import Lights from '@/components/Lights';
import { useGame } from '@/context/GameContext';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { useContext, useState } from 'react';

export default function Home() {

   const {start} = useGame();

   const [userAnswer, setUserAnswer] = useState("");
   
  // correct answer
   const calculateAnswer = () => {
    
   }


  return (
    <>
     <div className="relative w-full h-screen">

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


  <div className="absolute bottom-56 left-[650px] text-white z-10">
     {start && <div className='flex gap-4 '>
      <div className="relative w-60 group ">
  <span
    className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-linear-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100"
  ></span>
  <input
    type="text"
    id="input"
    value={userAnswer}
    onChange={(e) => setUserAnswer(e.target.value)}
    placeholder=""
    className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
  />
  <label
    htmlFor="input"
    className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text"
  >
    ჩაწერეთ რიცხვი
  </label>

</div>
<button className='cursor-pointer' onClick={calculateAnswer}>პასუხი</button>

      </div>}
  </div>


 
</div>
    </>
  );
}
