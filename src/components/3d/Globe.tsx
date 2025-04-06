import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Mesh } from 'three'

const Globe: React.FC = () => {
  const meshRef = useRef<Mesh>(null)
  
  // For now we'll use placeholder for textures
  // const globeTexture = useTexture('/src/assets/images/parchment-map.jpg')
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        color="#F5E6D3"
        // map={globeTexture} 
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  )
}

export default Globe