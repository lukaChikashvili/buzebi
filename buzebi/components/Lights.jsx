
const Lights = () => {
  return (
   <>
       <directionalLight
        castShadow
        position={[10, 1, -15]} 
        intensity={6}           
        color={"#ff4500"}      
        shadow-mapSize={[2048, 2048]}
      />

      <hemisphereLight
        skyColor={"#020205"}    
        groundColor={"#000000"}
        intensity={0.3}        
      />

     
      <ambientLight intensity={0.1} color="#ff4500" />

     
      <pointLight position={[2, 1, 2]} intensity={2.5} color="white" distance={10} />
   </>
  )
}

export default Lights
