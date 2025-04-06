import React from 'react'
import styled from 'styled-components'
import { Theme } from '../../styles/theme'

type LocationType = 'harbor' | 'island' | 'sea';

interface ExploreControlsProps {
  currentLocation: LocationType;
  setCurrentLocation: (location: LocationType) => void;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const LocationButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface LocationButtonProps {
  $active: boolean;  // Changed from active to $active
  theme?: Theme;
}

const LocationButton = styled.button<LocationButtonProps>`
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.accent : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const LocationInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const LocationTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LocationDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

interface LocationInfo {
  title: string;
  description: string;
}

interface LocationsMap {
  [key: string]: LocationInfo;
}

const ExploreControls: React.FC<ExploreControlsProps> = ({ currentLocation, setCurrentLocation }) => {
  // Location descriptions
  const locations: LocationsMap = {
    harbor: {
      title: 'Digital Harbor',
      description: 'The main port of entry to the Vespucc.ai world. Here you can find basic AI assistants and information about the platform.',
    },
    island: {
      title: 'Agent Island',
      description: 'A treasure trove of specialized AI agents, each with unique capabilities to help you navigate the digital seas.',
    },
    sea: {
      title: 'Data Ocean',
      description: 'Vast expanses of information and data sources that our agents can access and process for you.',
    },
  };
  
  return (
    <ControlsContainer>
      <LocationButtons>
        <LocationButton 
          $active={currentLocation === 'harbor'}
          onClick={() => setCurrentLocation('harbor')}
        >
          Digital Harbor
        </LocationButton>
        <LocationButton 
          $active={currentLocation === 'island'}
          onClick={() => setCurrentLocation('island')}
        >
          Agent Island
        </LocationButton>
        <LocationButton 
          $active={currentLocation === 'sea'}
          onClick={() => setCurrentLocation('sea')}
        >
          Data Ocean
        </LocationButton>
      </LocationButtons>
      
      <LocationInfo>
        <LocationTitle>{locations[currentLocation].title}</LocationTitle>
        <LocationDescription>{locations[currentLocation].description}</LocationDescription>
      </LocationInfo>
    </ControlsContainer>
  );
};

export default ExploreControls;