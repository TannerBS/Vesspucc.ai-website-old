import React from 'react'
import styled from 'styled-components'
import WorldMap2D from '../components/explore/WorldMap2D'

const GlobeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // For navbar space
`;

const MapContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  border: 12px solid #5D2E0C;
  border-radius: 8px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  background-color: #F5E6D3;
  position: relative;
`;

const Globe: React.FC = () => {
  return (
    <GlobeContainer>
      <MapContainer>
        <WorldMap2D />
      </MapContainer>
    </GlobeContainer>
  );
};

export default Globe;