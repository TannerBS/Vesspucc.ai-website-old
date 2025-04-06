import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Component that globally handles wheel events properly for React Three Fiber
 * This component prevents the "non-passive wheel event" warnings
 */
const WheelEventManager = () => {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    
    // Capture all addEventListener calls to force non-passive for wheel events
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    // Override the addEventListener method for all event targets
    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      // Check if this is a wheel event on the canvas
      if (type === 'wheel' && (this === canvas || this === window || this === document)) {
        // For wheel events, ensure 'passive' is explicitly set to false
        const modifiedOptions = {
          passive: false,
          ...(typeof options === 'object' ? options : {})
        };
        return originalAddEventListener.call(this, type, listener, modifiedOptions);
      }
      
      // For all other events, use the original parameters
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Clean up function to restore the original addEventListener
    return () => {
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, [gl]);

  return null;
};

export default WheelEventManager;