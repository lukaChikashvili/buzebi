"use client"
import { useGame } from '@/context/GameContext'
import React from 'react'

const Header = () => {
    const { score } = useGame();
  return (
    <div className='w-full h-16 bg-transparent  fixed top-0 left-0 -z-20 flex items-center justify-between px-12 text-white font-bold '>
      <div>
         logo
      </div>

      <div>
        <h1 className='text-5xl'>{score}</h1>
      </div>
    </div>
  )
}

export default Header