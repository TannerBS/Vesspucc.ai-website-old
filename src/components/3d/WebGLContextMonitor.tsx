import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * A component that monitors WebGL context and attempts to recover from context loss
 */
const WebGLContextMonitor = () => {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    // Count context lost events to prevent infinite recovery loops
    let contextLostCount = 0;
    const MAX_RECOVERY_ATTEMPTS = 3;
    let recoveryTimeout: number | null = null;

    const handleContextLost = (event: WebGLContextEvent) => {
      event.preventDefault();
      contextLostCount++;
      console.log(`WebGL context lost (${contextLostCount}/${MAX_RECOVERY_ATTEMPTS})`);
      
      if (contextLostCount <= MAX_RECOVERY_ATTEMPTS) {
        // Attempt recovery after a delay
        recoveryTimeout = window.setTimeout(() => {
          try {
            console.log('Attempting to restore WebGL context...');
            
            // Create a type to extend the WebGLRenderer with the method we need
            type ExtendedRenderer = typeof gl & {
              forceContextRestore?: () => void;
            };
            
            const extendedGl = gl as ExtendedRenderer;
            
            if (extendedGl.forceContextRestore) {
              extendedGl.forceContextRestore();
            }
            
            invalidate();
            console.log('WebGL context restored successfully.');
          } catch (e) {
            console.error('Failed to restore WebGL context:', e);
          }
        }, 1000);
      } else {
        console.error('Maximum WebGL context recovery attempts reached.');
      }
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored by browser');
      contextLostCount = 0;
      invalidate();
    };

    // Add event listeners
    gl.domElement.addEventListener('webglcontextlost', handleContextLost as EventListener, { passive: false });
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored as EventListener, { passive: false });

    // Also add global error handler to catch WebGL errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('GPU')) {
        console.error('WebGL error detected:', event.message);
      }
    };
    window.addEventListener('error', handleError);

    // Set renderer parameters if possible - note these should ideally be set during renderer creation
    // These are information-only console logs to show current renderer state
    console.debug('WebGL Renderer Info:', {
      powerPreference: gl.capabilities?.getMaxPrecision?.('highp') || 'unknown',
      antialias: gl.getContext().getContextAttributes()?.antialias || false,
      stencil: gl.getContext().getContextAttributes()?.stencil || false,
      depth: gl.getContext().getContextAttributes()?.depth || false
      // logarithmicDepthBuffer is not accessible as a property on the renderer
    });

    // Clean up on unmount
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost as EventListener);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored as EventListener);
      window.removeEventListener('error', handleError);
      
      if (recoveryTimeout !== null) {
        clearTimeout(recoveryTimeout);
      }
    };
  }, [gl, invalidate]);

  return null;
};

export default WebGLContextMonitor;