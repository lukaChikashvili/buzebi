import { useFrame, useThree } from "@react-three/fiber";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import gsap from "gsap";
import { UserContext } from "../context/userContext";

const Screen = forwardRef(
  ({ position, size = [12, 6.2], movieSrc }, ref) => {
    const { camera } = useThree();
    const { stopMovie, stopTheMovie } = useContext(UserContext);

    const [isFullScreen, setIsFullScreen] = useState(false);

  
    const videoRef = useRef(null);
    const textureRef = useRef(null);

   
    useEffect(() => {
      if (!movieSrc) return;

      const vid = document.createElement("video");
      vid.src = movieSrc;
      vid.crossOrigin = "anonymous";
      vid.loop = true;
      vid.muted = false;
      vid.playsInline = true;
      vid.preload = "auto";

      const texture = new THREE.VideoTexture(vid);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBAFormat;
      texture.colorSpace = THREE.SRGBColorSpace;

      const handleLoaded = () => {
        vid.play().catch(() => {});
      };

      vid.addEventListener("loadeddata", handleLoaded);

      videoRef.current = vid;
      textureRef.current = texture;

  
      return () => {
        vid.pause();
        vid.removeEventListener("loadeddata", handleLoaded);
        vid.src = "";
        vid.load();

        texture.dispose();

        videoRef.current = null;
        textureRef.current = null;
      };
    }, [movieSrc]);

    const video = videoRef.current;
    const videoTexture = textureRef.current;

   
    useFrame(() => {
      if (videoTexture && video && !video.paused) {
        videoTexture.needsUpdate = true;
      }
    });

    useEffect(() => {
      if (!stopMovie || !stopTheMovie) return;
    
      stopMovie.current = () => {
        if (videoRef.current) videoRef.current.pause();
      };
    }, [stopMovie, stopTheMovie]);
   
    const fullScreen = () => {
      setIsFullScreen((prev) => !prev);

      gsap.to(camera.position, {
        z: isFullScreen ? 10 : -1,
        duration: 1,
        ease: "power2.out",
      });
    };

    const currentSize = isFullScreen ? [10.5, 5] : [10.7, 4.2];

    if (!videoTexture) return null;

    return (
      <mesh ref={ref} position={position} onClick={fullScreen}>
        <planeGeometry args={currentSize} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} />
      </mesh>
    );
  }
);

export default Screen;