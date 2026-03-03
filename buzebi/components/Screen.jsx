import React, { forwardRef } from "react";
import * as THREE from "three";

const Screen = forwardRef(({ position, size = [10, 6.2], movieTexture, onClick }, ref) => {
  return (
    <mesh
      ref={ref}
      position={position}
      onClick={onClick}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={movieTexture ? new THREE.VideoTexture(movieTexture) : null}
        color={movieTexture ? "white" : "#fff"}
        emissive="white"
        emissiveIntensity={1}
      />
    </mesh>
  );
});

export default Screen;