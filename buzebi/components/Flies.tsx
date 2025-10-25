"use client"

import { useState } from "react"
import Fly from "./Fly";
import { useThree } from "@react-three/fiber";
import gsap from 'gsap'

const Flies = ({start}: {start: boolean}) => {

    const { camera } = useThree();


    const [flies, setFlies] = useState<Array<[number, number, number]>>([]);

   

  if (start && flies.length === 0) {
    const count = Math.floor(Math.random() * 30) + 100
    const newFlies: Array<[number, number, number]> = []

    
    const centerX = (Math.random() - 0.5) * 2
    const centerY = 1.0 
    const centerZ = (Math.random() - 0.5) * 2
    
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 0.1
      const offsetY = (Math.random() - 0.5) * 0.05 
      const offsetZ = (Math.random() - 0.5) * 0.1
      newFlies.push([centerX + offsetX, centerY + offsetY, centerZ + offsetZ])
    }

    setFlies(newFlies);

    

  }


  return (
  <>
   {flies.map((pos, idx) => (
        <Fly key={idx} position={pos} />
      ))}
  </>
  )
}

export default Flies
