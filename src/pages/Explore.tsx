import React, { useState } from 'react'
import styled from 'styled-components'
import WorldMap2D from '../components/explore/WorldMap2D'
import ExploreControls from '../components/explore/ExploreControls'

const ExploreContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // For navbar space
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  border: 8px solid #8B4513;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background-color: #F5E6D3;
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
      <MapContainer>
        <WorldMap2D />
      </MapContainer>
      
      <ContentContainer>
        <GlassPanel>
          <Title>Explore the Digital Frontier</Title>
          <p>Navigate through our interactive map to discover AI agents and digital treasures.</p>
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