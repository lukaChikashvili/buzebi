
const Lights = () => {
  return (
   <>
       <directionalLight
        castShadow
        position={[10, 1, -15]} 
        intensity={10}           
        color={"#ff4500"}      
        shadow-mapSize={[2048, 2048]}
      />

      <hemisphereLight
        skyColor={"#020205"}    
        groundColor={"#000000"}
        intensity={1}        
      />

     
      <ambientLight intensity={2} color="#ff4500" />

     
      <pointLight position={[2, 1, 2]} intensity={2.5} color="orange" distance={10} />
   </>
  )
}

export default Lights
