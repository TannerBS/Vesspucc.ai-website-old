import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface WorldMap2DProps {
  onWonderSelect?: (wonderName: string) => void;
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #F5E6D3;
`;

const MapSvg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const CompassRose = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  opacity: 0.8;
  pointer-events: none;
`;

const MapControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background-color: rgba(139, 69, 19, 0.7);
  color: #F5E6D3;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-family: 'serif';
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(139, 69, 19, 0.9);
  }
`;

const WonderInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #8B4513;
  border-radius: 8px;
  padding: 15px;
  max-width: 250px;
  font-family: 'serif';
  display: none;
  
  &.visible {
    display: block;
  }
`;

const WonderTitle = styled.h3`
  color: #8B4513;
  margin-top: 0;
  margin-bottom: 10px;
  font-family: 'Cinzel', serif;
`;

const WorldMap2D: React.FC<WorldMap2DProps> = ({ onWonderSelect }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedWonder, setSelectedWonder] = useState<string | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Wonder information
  const wonders = {
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
  
  // Handle map zooming
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };
  
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Handle map dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && mapRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Limit dragging to prevent map from being dragged too far
      const maxDragX = mapRef.current.clientWidth * (scale - 1);
      const maxDragY = mapRef.current.clientHeight * (scale - 1);
      
      const limitedX = Math.max(Math.min(newX, maxDragX / 2), -maxDragX / 2);
      const limitedY = Math.max(Math.min(newY, maxDragY / 2), -maxDragY / 2);
      
      setPosition({ x: limitedX, y: limitedY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle wonder selection
  const handleWonderClick = (wonderName: string) => {
    setSelectedWonder(wonderName);
    if (onWonderSelect) {
      onWonderSelect(wonderName);
    }
  };
  
  // Add event listeners for map interaction
  useEffect(() => {
    const mapElement = mapRef.current;
    
    if (mapElement) {
      // Handle mouse events outside of the component
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };
      
      // Handle mouse wheel for zooming
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          setScale(prevScale => Math.min(prevScale + 0.1, 3));
        } else {
          setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
        }
      };
      
      document.addEventListener('mouseup', handleGlobalMouseUp);
      mapElement.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        mapElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);
  
  return (
    <MapContainer 
      ref={mapRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <MapSvg 
        src="/world-map.svg" 
        alt="World Map" 
        style={{ 
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transformOrigin: 'center center'
        }} 
      />
      
      <CompassRose src="/compass-rose.svg" alt="Compass Rose" />
      
      <MapControls>
        <ControlButton onClick={handleZoomIn}>+</ControlButton>
        <ControlButton onClick={handleZoomOut}>−</ControlButton>
        <ControlButton onClick={handleReset}>Reset</ControlButton>
      </MapControls>
      
      <WonderInfo className={selectedWonder ? 'visible' : ''}>
        {selectedWonder && (
          <>
            <WonderTitle>{wonders[selectedWonder as keyof typeof wonders].name}</WonderTitle>
            <p><strong>Location:</strong> {wonders[selectedWonder as keyof typeof wonders].location}</p>
            <p>{wonders[selectedWonder as keyof typeof wonders].description}</p>
          </>
        )}
      </WonderInfo>
    </MapContainer>
  );
};

export default WorldMap2D;