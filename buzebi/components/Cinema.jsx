import React from 'react'

const Cinema = () => {
  return (
   <>
         <group position={[-100, 5, 0]} scale = {5}>
      

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

   
      <mesh position={[0, 2.5, 4]}>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#1c1c1c" />
      </mesh>

      
      <mesh position={[0, 2.5, -4]}>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#141414" />
      </mesh>

    
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

    
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#0d0d0d" />
      </mesh>

   
      <mesh position={[0, 2.5, -3.95]}>
        <planeGeometry args={[6, 3.2]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
   </>
  )
}

export default Cinema
