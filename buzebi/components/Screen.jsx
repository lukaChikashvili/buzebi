import { useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import gsap from 'gsap'
import { UserContext } from "../context/userContext";

const Screen = forwardRef(({ position, size = [12, 6.2], movieSrc }, ref) => {

  const { camera } = useThree();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const { stopMovie } = useContext(UserContext);

  

  // full screen
  const fullScreen = () => {
    setIsFullScreen(!isFullScreen);

    gsap.to(camera.position, {
      z: isFullScreen ? 10 : -1, 
      duration: 1,
      ease: "power2.out"
    });
  }

  const currentSize = isFullScreen ? [10.5, 5] : [10.7, 4.2];

  const { video, videoTexture } = useMemo(() => {
    if (!movieSrc) return { video: null, videoTexture: null };

    const vid = document.createElement("video");
    vid.src = movieSrc;
    vid.crossOrigin = "anonymous";
    vid.loop = true;
    vid.muted = false;
    vid.playsInline = true;
    vid.load();

    const texture = new THREE.VideoTexture(vid);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.colorSpace = THREE.SRGBColorSpace;

    vid.addEventListener('loadeddata', () => {
      vid.play();
    });

    return { video: vid, videoTexture: texture };
  }, [movieSrc]);

  useFrame(() => {
    if (videoTexture && video && !video.paused) {
      videoTexture.needsUpdate = true;
    }
  });

  useEffect(() => {
    if (stopMovie && video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [stopMovie, video]);

  useEffect(() => {
    return () => {
      video?.pause();
      videoTexture?.dispose();
    };
  }, [video, videoTexture]);

  if (!videoTexture) return null;

  

  return (
    <mesh ref={ref} position={position} onClick = {fullScreen}>
      <planeGeometry key={isFullScreen.toString()} args={currentSize} />
      <meshBasicMaterial map={videoTexture} toneMapped={false} />
    </mesh>
  );
});

export default Screen;