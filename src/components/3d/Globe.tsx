import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, SphereGeometry, MeshStandardMaterial } from 'three'

const Globe: React.FC = () => {
  const meshRef = useRef<Mesh>(null)
  
  // Create geometry with reduced resolution for better performance
  // Reduced from 64,64 segments to 24,24 segments
  const geometry = useMemo(() => new SphereGeometry(2, 24, 24), [])
  
  // Create optimized material
  const material = useMemo(() => new MeshStandardMaterial({
    color: "#E6D0B1",
    metalness: 0.2,
    roughness: 0.8,
    // Add performance optimizations
    flatShading: true,
    dithering: false,
  }), [])
  
  // Use a more efficient animation method - rotate only every 3rd frame
  let frameCount = 0;
  useFrame(() => {
    frameCount++;
    if (frameCount % 3 === 0 && meshRef.current) {
      meshRef.current.rotation.y += 0.0003
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
      frustumCulled={true} // Enable frustum culling
    />
  )
}

export default Globe