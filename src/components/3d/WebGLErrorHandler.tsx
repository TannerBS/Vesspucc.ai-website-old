import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 230, 211, 0.8);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  color: #8B4513;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
`;

interface WebGLErrorHandlerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const WebGLErrorHandler: React.FC<WebGLErrorHandlerProps> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setIsWebGLSupported(false);
      setHasError(true);
    }

    // Listen for context lost events
    const handleContextLost = () => {
      console.log("WebGL context lost detected");
      setHasError(true);
    };

    window.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, []);

  if (hasError) {
    if (fallback) return <>{fallback}</>;
    
    return (
      <ErrorContainer>
        <ErrorTitle>3D Visualization Unavailable</ErrorTitle>
        <ErrorMessage>
          {!isWebGLSupported 
            ? "Your browser doesn't support WebGL, which is required for 3D visualizations."
            : "The 3D visualization couldn't be loaded due to a WebGL context error."}
        </ErrorMessage>
        <ErrorMessage>
          Try refreshing the page or using a different browser.
        </ErrorMessage>
      </ErrorContainer>
    );
  }

  return <>{children}</>;
};

export default WebGLErrorHandler;