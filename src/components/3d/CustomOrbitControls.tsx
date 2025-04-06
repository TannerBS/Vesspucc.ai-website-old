import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';

interface CustomOrbitControlsProps {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  zoomSpeed?: number;
  panSpeed?: number;
  rotateSpeed?: number;
  dampingFactor?: number;
  enableDamping?: boolean;
  minDistance?: number;
  maxDistance?: number;
  target?: [number, number, number];
}

const CustomOrbitControls: React.FC<CustomOrbitControlsProps> = ({
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  zoomSpeed = 1,
  panSpeed = 1,
  rotateSpeed = 1,
  dampingFactor = 0.05,
  enableDamping = true,
  minDistance = 1,
  maxDistance = 1000,
  target = [0, 0, 0],
}) => {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    // Instead of overriding addEventListener, we'll create a function to intercept wheel events
    const canvas = gl.domElement;
    
    // Store original addEventListener function
    const originalAddEventListener = canvas.addEventListener.bind(canvas);
    
    // Create a wrapper around all wheel events to make them non-passive
    // This approach avoids the 'this' context issues
    const addEventListenerWrapper = (
      type: string, 
      listener: EventListenerOrEventListenerObject, 
      options?: boolean | AddEventListenerOptions
    ) => {
      if (type === 'wheel') {
        // For wheel events, ensure passive is false
        const modifiedOptions = {
          passive: false,
          ...(typeof options === 'object' ? options : {})
        };
        originalAddEventListener(type, listener, modifiedOptions);
      } else {
        // For all other events, use the original options
        originalAddEventListener(type, listener, options);
      }
    };
    
    // Apply the wrapper
    canvas.addEventListener = addEventListenerWrapper as typeof canvas.addEventListener;

    // Handle WebGL context loss
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost, attempting recovery...');
      
      // Try to restore context after a short delay
      setTimeout(() => {
        try {
          // Create a type to extend the WebGLRenderer with the method we need
          type ExtendedRenderer = typeof gl & {
            forceContextRestore?: () => void;
          };
          
          const extendedGl = gl as ExtendedRenderer;
          
          if (extendedGl.forceContextRestore) {
            extendedGl.forceContextRestore();
          }
          invalidate();
        } catch (e) {
          console.error('Failed to restore WebGL context:', e);
        }
      }, 500);
    };
    
    // Add the event listener using our wrapper
    canvas.addEventListener('webglcontextlost', handleContextLost, { passive: false });
    
    // Store the current canvas reference for cleanup
    const currentCanvas = canvas;
    
    return () => {
      // Remove the context loss handler
      currentCanvas.removeEventListener('webglcontextlost', handleContextLost);
      
      // Restore original addEventListener
      // We need to cast to 'any' here to avoid TypeScript errors with property assignment
      (currentCanvas as any).addEventListener = originalAddEventListener;
    };
  }, [gl, invalidate]);

  return (
    <DreiOrbitControls
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
      zoomSpeed={zoomSpeed}
      panSpeed={panSpeed}
      rotateSpeed={rotateSpeed}
      dampingFactor={dampingFactor}
      enableDamping={enableDamping}
      minDistance={minDistance}
      maxDistance={maxDistance}
      target={target as any}
      makeDefault
    />
  );
};

export default CustomOrbitControls;