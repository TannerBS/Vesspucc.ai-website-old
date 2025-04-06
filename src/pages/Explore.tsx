import React, { useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MapExplorer from '../components/explore/MapExplorer'
import ExploreControls from '../components/explore/ExploreControls'

const ExploreContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // For navbar space
`;

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

type LocationType = 'harbor' | 'island' | 'sea';

const Explore: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationType>('harbor');

  return (
    <ExploreContainer>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <MapExplorer location={currentLocation} />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </CanvasContainer>
      
      <ContentContainer>
        <GlassPanel>
          <Title>Explore the Digital Frontier</Title>
          <p>Navigate through our 3D map to discover AI agents and digital treasures.</p>
          <ExploreControls 
            currentLocation={currentLocation} 
            setCurrentLocation={setCurrentLocation} 
          />
        </GlassPanel>
      </ContentContainer>
    </ExploreContainer>
  );
};

export default Explore;