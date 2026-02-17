
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { UserContext } from '../context/userContext'
import { useThree } from '@react-three/fiber';

const Info = ({ title, desc,  }) => {

  const { setInfo, cameraReturn } = useContext(UserContext);




  const container = useRef()
  const overlay = useRef()
  const titleRef = useRef()
  const lineRef = useRef()
  const descRef = useRef()

  const tl = useRef()




  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
  
      tl.current = gsap.timeline()
  
      tl.current.fromTo(overlay.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.6, ease: "power2.out" }
      )
      .from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.2")
      .from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.2")
  
    })
  
    return () => ctx.revert()
  }, []);

  const handleClose = () => {
    tl.current.reverse();
  
    tl.current.eventCallback("onReverseComplete", () => {
      setInfo(null); 
    });
  };
  



  
  

  return (
    <div ref={container} className="fixed inset-0 z-50">

      <div ref={overlay} className="absolute inset-0 bg-black"></div>

      <div
        className="text-white text-xl absolute z-20 cursor-pointer right-12 top-6"
        onClick={handleClose}
      >
        ✕
      </div>

      <div className="relative z-10 px-24 py-12 h-full flex flex-col gap-8">
        <h1 ref={titleRef} className="text-[#FFC300] text-4xl font-bold">
          {title}
        </h1>

        <div ref={lineRef} className="w-full h-0.5 bg-white"></div>

        <p ref={descRef} className="w-1/2 text-white text-xl">
          {desc}
        </p>
      </div>

    </div>
  )
}

export default Info

