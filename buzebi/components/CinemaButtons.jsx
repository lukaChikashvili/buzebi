import { useTexture } from '@react-three/drei'
import React, { useContext, useRef } from 'react'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber';
import { UserContext } from '../context/userContext';

const CinemaButton = ({ position, texture, onClick }) => {
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
      onClick={onClick}
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

  const { camera  } = useThree();
  const { setStopTheMovie, setAllMovies, allMovies } = useContext(UserContext);

  const goBack = () => {
    setStopTheMovie(true);

     gsap.to(camera.position, {
        x: 1.70,
        y: 9.66,
        z: 22,
        duration: 1,
        delay: 0.6,
        ease: "power2.inOut"
     });


  }

  const buttons = [
    { position: [6.39, 4.5, -2.96], texture: backBtn, onClick: goBack  },
    { position: [6.39, 3.9, -2.96], texture: list , onClick: () => setAllMovies(!allMovies)},
    { position: [6.39, 3.3, -2.96], texture: full },
    { position: [6.39, 2.7, -2.96], texture: rate },
  ];

  

  return (
    <group position={[0, -0.1, 0]}>
      {buttons.map((btn, i) => (
        <CinemaButton key={i} position={btn.position} texture={btn.texture} onClick={btn.onClick} />
      ))}
    </group>
  );
};

export default CinemaButtons;