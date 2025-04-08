import React, { useState } from 'react'
import styled from 'styled-components'
import WorldMap2D from '../components/explore/WorldMap2D'

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  background-size: cover;
  position: relative;
`

const MapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  position: relative;
  z-index: 1;
`

const MapTitle = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const MapDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const MapViewContainer = styled.div`
  width: 100%;
  height: 70vh; /* Increased height for better map viewing */
  max-width: 1200px;
  margin: 0 auto;
  border: 8px solid #8B4513;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  background-color: #F5E6D3;
`

const WonderInfoPanel = styled.div`
  margin-top: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #8B4513;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 800px;
  width: 100%;
`

const WonderTitle = styled.h3`
  color: #8B4513;
  margin-top: 0;
  margin-bottom: 1rem;
  font-family: 'Cinzel', serif;
  text-align: center;
`

const Map: React.FC = () => {
  const [selectedWonder, setSelectedWonder] = useState<string | null>(null);
  
  // Wonder information
  const wonders: Record<string, { name: string; description: string; location: string }> = {
    'Great Wall': {
      name: 'Great Wall of China',
      description: 'Built across the historical northern borders of China to protect against invasions, it is the world\'s longest wall and biggest ancient architecture.',
      location: 'China'
    },
    'Petra': {
      name: 'Petra',
      description: 'A historical and archaeological city famous for its rock-cut architecture and water conduit system, established around 312 BC.',
      location: 'Jordan'
    },
    'Christ the Redeemer': {
      name: 'Christ the Redeemer',
      description: 'A statue of Jesus Christ created between 1922 and 1931, standing 30 meters tall, excluding its 8-meter pedestal.',
      location: 'Rio de Janeiro, Brazil'
    },
    'Machu Picchu': {
      name: 'Machu Picchu',
      description: 'A 15th-century Inca citadel situated on a mountain ridge above the Sacred Valley, known for its sophisticated dry-stone walls.',
      location: 'Peru'
    },
    'Chichen Itza': {
      name: 'Chichen Itza',
      description: 'A large pre-Columbian city built by the Maya civilization, known for its stepped pyramids, temples, and stone carvings.',
      location: 'Yucatán, Mexico'
    },
    'Colosseum': {
      name: 'Colosseum',
      description: 'An oval amphitheatre in the centre of Rome, built of travertine limestone, tuff, and brick-faced concrete, completed in 80 AD.',
      location: 'Rome, Italy'
    },
    'Taj Mahal': {
      name: 'Taj Mahal',
      description: 'An ivory-white marble mausoleum commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife.',
      location: 'Agra, India'
    }
  };

  const handleWonderSelect = (wonderName: string) => {
    setSelectedWonder(wonderName);
  };

  return (
    <MapContainer>
      <MapContent>
        <MapTitle>Vespucci's World Map</MapTitle>
        <MapDescription>
          Explore our 2D world map showing continents, oceans, and the Seven Wonders of the World.
          Navigate through the ancient seas, discover new lands, and learn about the wonders
          just as explorers did in the Age of Discovery.
        </MapDescription>
        
        <MapViewContainer>
          <WorldMap2D onWonderSelect={handleWonderSelect} />
        </MapViewContainer>
        
        {selectedWonder && (
          <WonderInfoPanel>
            <WonderTitle>{wonders[selectedWonder].name}</WonderTitle>
            <p><strong>Location:</strong> {wonders[selectedWonder].location}</p>
            <p>{wonders[selectedWonder].description}</p>
          </WonderInfoPanel>
        )}
      </MapContent>
    </MapContainer>
  )
}

export default Map