'use client'
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Balloons = ({ count = 20 }) => {
  const { scene } = useGLTF('./balloon.glb');

  const groupRef = useRef();

  
  const balloons = useMemo(() => {
    return new Array(count).fill().map(() => {
      const clone = scene.clone();

      return {
        object: clone,
        position: [
          (Math.random() - 0.5) * 200,
          Math.random() * 80 + 5,
          (Math.random() - 0.5) * 200
        ],
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2
      };
    });
  }, [scene, count]);

  // animate safely
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const { speed, offset } = balloons[i];

      child.position.y += Math.sin(time * speed + offset) * 0.02;
      child.position.x += Math.cos(time * speed + offset) * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {balloons.map((b, i) => (
        <primitive
          key={i}
          object={b.object}
          position={b.position}
          scale={5}
        />
      ))}
    </group>
  );
};

export default Balloons;