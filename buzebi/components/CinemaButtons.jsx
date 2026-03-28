import { useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import gsap from 'gsap'

const CinemaButton = ({ position, texture }) => {
  const meshRef = useRef();

  const handlePointerOver = () => {
    gsap.to(meshRef.current.position, {
      x: position[0] - 0.03,
      duration: 0.25,
      ease: 'power2.out'
    });
    gsap.to(meshRef.current.scale, {
      x: 1.1,
      y: 1.1,
      duration: 0.25,
      ease: 'power2.out'
    });
  };

  const handlePointerOut = () => {
    gsap.to(meshRef.current.position, {
      x: position[0],
      duration: 0.25,
      ease: 'power2.in'
    });
    gsap.to(meshRef.current.scale, {
      x: 1,
      y: 1,
      duration: 0.25,
      ease: 'power2.in'
    });
  };

  const handlePointerDown = () => {
    gsap.to(meshRef.current.position, {
      x: position[0] - 0.1,
      duration: 0.1,
      ease: 'power1.in'
    });
    gsap.to(meshRef.current.scale, {
      x: 0.95,
      y: 0.95,
      duration: 0.1,
    });
  };

  const handlePointerUp = () => {
    gsap.to(meshRef.current.position, {
      x: position[0] + 0.03,
      duration: 0.15,
      ease: 'power2.out'
    });
    gsap.to(meshRef.current.scale, {
      x: 1.1,
      y: 1.1,
      duration: 0.15,
    });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[1, 0.5, 0.8]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const CinemaButtons = () => {
  const backBtn = useTexture('./cinemaback.png');
  const list = useTexture('./list.png');
  const full = useTexture('./full.png');
  const rate = useTexture('./rate.png');

  const buttons = [
    { position: [6.39, 4.5, -2.96], texture: backBtn },
    { position: [6.39, 3.9, -2.96], texture: list },
    { position: [6.39, 3.3, -2.96], texture: full },
    { position: [6.39, 2.7, -2.96], texture: rate },
  ];

  return (
    <group position={[0, -0.1, 0]}>
      {buttons.map((btn, i) => (
        <CinemaButton key={i} position={btn.position} texture={btn.texture} />
      ))}
    </group>
  );
};

export default CinemaButtons;