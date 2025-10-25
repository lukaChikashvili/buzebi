"use client"

import { useEffect, useState } from "react"
import Fly from "./Fly";
import { useThree } from "@react-three/fiber";
import gsap from 'gsap'

const Flies = ({start}: {start: boolean}) => {

    const { camera } = useThree();


    const [flies, setFlies] = useState<Array<[number, number, number]>>([]);

   

  if (start && flies.length === 0) {
    const count = Math.floor(Math.random() * 950) + 50;
    const newFlies: Array<[number, number, number]> = []

    const centerX = 0
    const centerY = 0.5
    const centerZ = 0
    
    for (let i = 0; i < count; i++) {
       
        const offsetX = (Math.random() - 0.5) * 0.4  
        const offsetY = (Math.random() - 0.5) * 0.2  
        const offsetZ = (Math.random() - 0.5) * 0.4  
        newFlies.push([centerX + offsetX, centerY + offsetY, centerZ + offsetZ])
      }

      setFlies(newFlies)

      

  }

  useEffect(() => {
    console.log(flies)
  })


  return (
  <>
   {flies.map((pos, idx) => (
        <Fly key={idx} position={pos} />
      ))}
  </>
  )
}

export default Flies
