export const grassFragment = `
varying vec2 vUv;
varying float vElevation;
uniform float uSeason;

void main() {
  vec3 color;
  

  if(uSeason < 0.5) {
      // Spring (Night/Dark)
      vec3 low = vec3(0.01, 0.02, 0.04); 
      vec3 high = vec3(0.05, 0.08, 0.15); 
      color = mix(low, high, smoothstep(0.0, 2.5, vElevation));
  } else if (uSeason < 1.5) {
     
      vec3 low  = vec3(0.02, 0.05, 0.02); 
     
      vec3 high = vec3(0.15, 0.22, 0.08); 
      color = mix(low, high, smoothstep(0.0, 2.5, vElevation));
      
     
      vec3 sunsetGlow = vec3(1.0, 0.4, 0.0); 
      float glowStrength = smoothstep(1.2, 2.8, vElevation);
      color = mix(color, sunsetGlow, glowStrength * 0.6);
      
  } else if (uSeason < 2.5) {
      // Autumn (Golden/Burnt)
      vec3 low = vec3(0.15, 0.08, 0.02);
      vec3 high = vec3(0.5, 0.25, 0.05);
      color = mix(low, high, smoothstep(0.0, 2.5, vElevation));
  } else {
      // Winter (Muted/Frost)
      vec3 low = vec3(0.1, 0.12, 0.15);
      vec3 high = vec3(0.4, 0.45, 0.5);
      color = mix(low, high, smoothstep(0.0, 5.5, vElevation));
  }

 
  float ao = smoothstep(0.0, 1.0, vElevation);
  color *= mix(0.1, 1.0, ao);

 
  gl_FragColor = vec4(color, 1.0);
}
`;