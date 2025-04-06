import React from 'react';
import styled from 'styled-components';

// Styled components for fallbacks
const FallbackContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F5E6D3;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(139, 69, 19, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MapIndicator = styled.div<{ $isActive: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0.5rem;
  background-color: ${props => props.$isActive ? '#CFB53B' : '#8B4513'};
  display: inline-block;
  transition: transform 0.3s, background-color 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

// Fallback for Globe component
export const GlobeFallback: React.FC = () => {
  return (
    <FallbackContainer>
      <ImagePlaceholder>
        <div style={{ fontSize: '4rem', color: '#8B4513' }}>🌐</div>
        <p>Globe Visualization</p>
      </ImagePlaceholder>
      <p>
        The 3D globe visualization is currently unavailable.
        Please try refreshing the page or using a browser with better WebGL support.
      </p>
    </FallbackContainer>
  );
};

// Fallback for MapExplorer component
interface MapExplorerFallbackProps {
  location: string;
  onLocationSelect?: (location: string) => void;
}

export const MapExplorerFallback: React.FC<MapExplorerFallbackProps> = ({ 
  location, 
  onLocationSelect 
}) => {
  return (
    <FallbackContainer>
      <h3>Explore the Digital Map</h3>
      <p>Navigate between different locations in our digital world</p>
      
      <MapContainer>
        <MapIndicator 
          $isActive={location === 'harbor'} 
          onClick={() => onLocationSelect && onLocationSelect('harbor')}
          title="Digital Harbor"
        />
        <MapIndicator 
          $isActive={location === 'island'} 
          onClick={() => onLocationSelect && onLocationSelect('island')}
          title="Agent Island"
        />
        <MapIndicator 
          $isActive={location === 'sea'} 
          onClick={() => onLocationSelect && onLocationSelect('sea')}
          title="Data Ocean"
        />
      </MapContainer>
      
      <p style={{ fontStyle: 'italic' }}>
        The 3D map exploration is currently unavailable.
        This is a simplified view of the map interface.
      </p>
    </FallbackContainer>
  );
};