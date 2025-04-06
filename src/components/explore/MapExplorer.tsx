import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Mesh, Vector3Tuple } from 'three'

type LocationType = 'harbor' | 'island' | 'sea'

interface MapExplorerProps {
  location: LocationType;
}

const MapExplorer: React.FC<MapExplorerProps> = ({ location }) => {
  const mapRef = useRef<Mesh>(null);
  
  // Rotate map slowly
  useFrame(() => {
    if (mapRef.current) {
      mapRef.current.rotation.y += 0.001;
    }
  });
  
  // Change position based on current location
  const getPosition = (): Vector3Tuple => {
    switch (location) {
      case 'harbor':
        return [0, 0, 0];
      case 'island':
        return [3, 0, 0];
      case 'sea':
        return [-3, 0, 0];
      default:
        return [0, 0, 0];
    }
  };
  
  return (
    <group position={getPosition()}>
      {/* Main map plane */}
      <mesh ref={mapRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#F5E6D3"
          metalness={0.1}
          roughness={0.8}
          // We'll add texture maps later
          // map={mapTexture}
        />
      </mesh>
      
      {/* Location indicators */}
      <mesh position={[0, 0, 0.1]} scale={location === 'harbor' ? 1.2 : 1}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color={location === 'harbor' ? '#CFB53B' : '#8B4513'} />
      </mesh>
      
      <mesh position={[3, 0, 0.1]} scale={location === 'island' ? 1.2 : 1}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color={location === 'island' ? '#CFB53B' : '#8B4513'} />
      </mesh>
      
      <mesh position={[-3, 0, 0.1]} scale={location === 'sea' ? 1.2 : 1}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color={location === 'sea' ? '#CFB53B' : '#8B4513'} />
      </mesh>
    </group>
  );
};

export default MapExplorer;