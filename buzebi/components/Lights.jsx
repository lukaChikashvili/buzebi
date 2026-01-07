
const Lights = () => {
  return (
   <>
         <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.1}
        color={"#FFE2B8"}   
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

<hemisphereLight
        skyColor={"#C9D8FF"}
        groundColor={"#6E7A3C"}
        intensity={0.45}
        
      />

<ambientLight intensity={2} color = "orange" />
   </>
  )
}

export default Lights
