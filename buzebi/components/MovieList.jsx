import { useContext } from "react"
import { posters } from "./Posters"
import { UserContext } from "../context/userContext"

const MovieList = () => {
    const { setAllMovies } = useContext(UserContext);

  return (
    <div className='absolute inset-0 z-10 bg-black/60 px-24'>
      
  
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
        <span onClick={() => setAllMovies(false)} className="bg-[#F7C85C] px-12 py-2 rounded-md shadow-lg font-extrabold  text-white text-center cursor-pointer hover:text-gray-600 transition">
          დახურვა
        </span>
      </div>

      <div className='grid grid-cols-5 place-items-center content-center gap-4 p-8 h-full'>
        {posters.map((poster, i) => (
          <div key={i} className='flex items-center justify-center'>
            <img className='w-56 h-56 object-cover rounded-lg' src={poster.img} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default MovieList