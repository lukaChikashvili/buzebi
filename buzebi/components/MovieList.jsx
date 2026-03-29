import { useContext, useEffect, useRef } from "react"
import { posters } from "./Posters"
import { UserContext } from "../context/userContext"
import gsap from "gsap"

const MovieList = () => {
  const { setAllMovies } = useContext(UserContext);
  const itemsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
   
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

   
    gsap.fromTo(itemsRef.current,
      { opacity: 0, y: 40, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2
      }
    );
  }, []);


  const handleClose = () => {
  
    gsap.to([...itemsRef.current].reverse(), {
      opacity: 0,
      y: 40,
      scale: 0.85,
      duration: 0.4,
      ease: "power3.in",
      stagger: 0.06,
      onComplete: () => {
       
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => setAllMovies(false)
        });
      }
    });
  };

  return (
    <div ref={containerRef} className='absolute inset-0 z-10 bg-black/60 px-24'>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
        <span
          onClick={handleClose}
          className="bg-[#F7C85C] px-12 py-2 rounded-md shadow-lg font-extrabold text-white text-center cursor-pointer hover:text-gray-600 transition"
        >
          დახურვა
        </span>
      </div>

      <div className='grid grid-cols-5 place-items-center content-center gap-4 p-8 h-full'>
        {posters.map((poster, i) => (
       <div
       key={i}
       ref={(el) => (itemsRef.current[i] = el)}
       className='flex items-center justify-center cursor-pointer'
       style={{ perspective: "600px" }}
     >
       <img
         className='w-56 h-56 object-cover rounded-lg'
         src={poster.img}
         onMouseMove={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           const x = (e.clientX - rect.left) / rect.width - 0.5;
           const y = (e.clientY - rect.top) / rect.height - 0.5;
     
           gsap.to(e.currentTarget, {
             rotateY: x * 30,
             rotateX: -y * 30,
             scale: 1.08,
             duration: 0.3,
             ease: "power2.out",
             transformPerspective: 600,
           });
         }}
         onMouseLeave={(e) => {
           gsap.to(e.currentTarget, {
             rotateY: 0,
             rotateX: 0,
             scale: 1,
             duration: 0.5,
             ease: "power2.out",
           });
         }}
       />
     </div>
   
        ))}
      </div>

    </div>
  )
}

export default MovieList