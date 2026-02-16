import React from 'react'

const GraveStone = () => {
  return (
   <>
     <mesh scale = {0.4}  position={[10, 0, 0]}
        rotation={[ -Math.PI / 2, 0, -0.7]}>
        <boxGeometry args = {[10, 20]} />

     </mesh>
   
   </>
  )
}

export default GraveStone
