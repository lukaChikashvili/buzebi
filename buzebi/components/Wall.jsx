import { useMatcapTexture, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Wall = () => {
  const ballRef = useRef(null);
  const wallTexture = useTexture('./block.jpg');

  const [matcap] = useMatcapTexture('E6BF3C_5A4719_977726_FCFC82', 256);

 
  const rotationY = -Math.PI / 4; 
  const size = 2;
  const spacing = 2.2;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ballRef.current) {
        
        ballRef.current.setLinvel({ x: -50, y: 0, z: 0 }, true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      <RigidBody 
        ref={ballRef} 
        position={[40, 20, 0]} 
        colliders="ball" 
        mass={150} 
      >
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial map = {matcap} metalness={0.8} />
        </mesh>
      </RigidBody>

      
      {Array.from({ length: 10 }).map((_, y) =>
        Array.from({ length: 10 }).map((_, x) => {
        
          const localX = x * spacing - 8;
          const localZ = 0;

        
          const rotatedX = localX * Math.cos(rotationY) - localZ * Math.sin(rotationY);
          const rotatedZ = localX * Math.sin(rotationY) + localZ * Math.cos(rotationY);

          return (
            <RigidBody
              key={`${x}-${y}`}
              position={[rotatedX, y * spacing + 2, rotatedZ]}
              rotation={[0, rotationY, 0]} 
              colliders="cuboid"
            >
              <mesh position={[-10, 0, 15]}> 
                <boxGeometry args={[size, size, size]} />
                <meshBasicMaterial 
                  map={wallTexture}
                  color="#FF6C0C" 
                />
              </mesh>
            </RigidBody>
          );
        })
      )}
    </>
  )
}

export default Wall