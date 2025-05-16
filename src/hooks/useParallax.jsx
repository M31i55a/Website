import { useEffect, useState } from 'react';

function useParallax(depth = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate mouse position relative to viewport center
      const x = (event.clientX / window.innerWidth - 0.5) * 2; // Normalized: -1 to 1
      const y = (event.clientY / window.innerHeight - 0.5) * 2; // Normalized: -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate translation based on depth (higher depth = more movement)
  const x = mousePosition.x * 20 * depth; // Max 20px horizontal movement
  const y = mousePosition.y * 20 * depth; // Max 20px vertical movement

  return { x, y };
}

export default useParallax;