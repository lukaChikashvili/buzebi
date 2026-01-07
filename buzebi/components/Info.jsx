import React from 'react'

const Info = ({title, desc, year}) => {
  return (
    <div className="fixed inset-0 z-50">

   
    <div className="absolute inset-0 bg-black opacity-60"></div>

 
    <div className="relative z-10 px-24 py-12 h-full flex flex-col gap-8">
      <h1 className="text-white text-4xl font-bold">{title}</h1>
      <div className='w-full h-0.5 bg-white'></div>
    </div>

  </div>
  )
}

export default Info
