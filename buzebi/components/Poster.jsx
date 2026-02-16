"use client"
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { posterVertex} from '../shaders/poster/vertex'
import { posterFragment} from '../shaders/poster/fragment'


const Poster = ({
  image,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1],
  speed = 3,
  amplitude = 0.3
}) => {
  const shaderRef = useRef();
  const texture = useTexture(image);

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uFrequency: { value: new THREE.Vector2(1.55, 2.0) },
    uSpeed: { value: speed },
    uTexture: { value: texture }
  });


  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    uniforms.current.uTexture.value = texture
  }, [texture]);


  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += 0.004
    }
  });


  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[25, 10, 10, 10]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={posterVertex}
        fragmentShader={posterFragment}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  )
}

export default Poster
