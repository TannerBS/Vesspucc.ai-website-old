import React from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Globe from '../components/3d/Globe'
import WebGLErrorHandler from '../components/3d/WebGLErrorHandler'
import { GlobeFallback } from '../components/3d/Fallbacks'
import CustomOrbitControls from '../components/3d/CustomOrbitControls'
import WebGLContextMonitor from '../components/3d/WebGLContextMonitor'

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
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
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <CanvasContainer>
        <WebGLErrorHandler fallback={<GlobeFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
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
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Globe />
            <CustomOrbitControls enableZoom={false} enablePan={false} />
            <WebGLContextMonitor />
          </Canvas>
        </WebGLErrorHandler>
      </CanvasContainer>
      <ContentContainer>
        <Hero />
        <Features />
      </ContentContainer>
    </HomeContainer>
  )
}

export default Home