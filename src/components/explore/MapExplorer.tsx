import React, { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3Tuple, PlaneGeometry, CircleGeometry, MeshStandardMaterial } from 'three'

type LocationType = 'harbor' | 'island' | 'sea'

interface MapExplorerProps {
  location: LocationType;
}

// Memoize the position calculations to prevent unnecessary calculations
const getPositionForLocation = (location: LocationType): Vector3Tuple => {
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

const MapExplorer: React.FC<MapExplorerProps> = ({ location }) => {
  const mapRef = useRef<Mesh>(null);
  
  // Create geometries once - using lower resolution for better performance
  const planeGeometry = useMemo(() => new PlaneGeometry(10, 10, 1, 1), []);
  const circleGeometry = useMemo(() => new CircleGeometry(0.3, 12), []); // Reduced segments from 32 to 12
  
  // Create materials once
  const planeMaterial = useMemo(() => new MeshStandardMaterial({
    color: "#F5E6D3",
    metalness: 0.1,
    roughness: 0.8,
    // Optimize material for performance
    flatShading: true,
    dithering: false
  }), []);
  
  const goldMaterial = useMemo(() => new MeshStandardMaterial({ 
    color: '#CFB53B',
    flatShading: true 
  }), []);
  const brownMaterial = useMemo(() => new MeshStandardMaterial({ 
    color: '#8B4513',
    flatShading: true 
  }), []);
  
  // Use a more efficient animation method - rotate only every 2nd frame
  let frameCount = 0;
  useFrame(() => {
    frameCount++;
    if (frameCount % 2 === 0 && mapRef.current) {
      mapRef.current.rotation.y += 0.0003; // Reduced rotation speed
    }
  });
  
  // Memoize position
  const position = useMemo(() => getPositionForLocation(location), [location]);
  
  // Memoize the scale of each location indicator
  const harborScale = useMemo(() => location === 'harbor' ? 1.2 : 1, [location]);
  const islandScale = useMemo(() => location === 'island' ? 1.2 : 1, [location]);
  const seaScale = useMemo(() => location === 'sea' ? 1.2 : 1, [location]);
  
  // Memoize which material to use for each location
  const harborMaterial = useMemo(() => location === 'harbor' ? goldMaterial : brownMaterial, [location, goldMaterial, brownMaterial]);
  const islandMaterial = useMemo(() => location === 'island' ? goldMaterial : brownMaterial, [location, goldMaterial, brownMaterial]);
  const seaMaterial = useMemo(() => location === 'sea' ? goldMaterial : brownMaterial, [location, goldMaterial, brownMaterial]);
  
  return (
    <group position={position}>
      {/* Main map plane */}
      <mesh 
        ref={mapRef} 
        rotation={[0, 0, 0]} 
        position={[0, 0, 0]} 
        geometry={planeGeometry} 
        material={planeMaterial} 
        matrixAutoUpdate={true}
        frustumCulled={true}
      />
      
      {/* Location indicators */}
      <mesh 
        position={[0, 0, 0.1]} 
        scale={harborScale} 
        geometry={circleGeometry} 
        material={harborMaterial}
        matrixAutoUpdate={false} // No need for matrix updates on static objects
      />
      
      <mesh 
        position={[3, 0, 0.1]} 
        scale={islandScale} 
        geometry={circleGeometry} 
        material={islandMaterial}
        matrixAutoUpdate={false}
      />
      
      <mesh 
        position={[-3, 0, 0.1]} 
        scale={seaScale} 
        geometry={circleGeometry} 
        material={seaMaterial}
        matrixAutoUpdate={false}
      />
    </group>
  );
};

export default MapExplorer;