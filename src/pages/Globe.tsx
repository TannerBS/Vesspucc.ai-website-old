import React from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import MapExplorer from '../components/explore/MapExplorer'
import WebGLErrorHandler from '../components/3d/WebGLErrorHandler'
import { MapExplorerFallback } from '../components/3d/Fallbacks'
import CustomOrbitControls from '../components/3d/CustomOrbitControls'
import WebGLContextMonitor from '../components/3d/WebGLContextMonitor'
import WheelEventManager from '../components/3d/WheelEventManager'

const GlobeContainer = styled.div`
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

const Globe: React.FC = () => {
  return (
    <GlobeContainer>
      <CanvasContainer>
        <WebGLErrorHandler 
          fallback={
            <MapExplorerFallback 
              location={'sea'} 
              onLocationSelect={() => {}} 
            />
          }
        >
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ 
              antialias: true,
              stencil: false,
              depth: true,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: true,
              precision: 'mediump',
              logarithmicDepthBuffer: false
            }}
          >
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <MapExplorer location={'sea'} />
            <CustomOrbitControls enableZoom={true} enablePan={true} />
            <WheelEventManager />
            <WebGLContextMonitor />
          </Canvas>
        </WebGLErrorHandler>
      </CanvasContainer>
    </GlobeContainer>
  );
};

export default Globe;