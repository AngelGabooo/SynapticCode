// src/components/atoms/Cursor.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      if (target.closest('a, button, .hover-effect, [data-cursor-effect]')) {
        setIsHoveringClickable(true);
        setIsHovering(true);
      } else {
        setIsHoveringClickable(false);
        // Efecto más sutil para elementos no clickables
        setIsHovering(target.closest('[data-cursor-hover]'));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor principal con efecto cyan/turquesa */}
      <motion.div 
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          left: position.x, 
          top: position.y,
          background: isHoveringClickable 
            ? 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(20,184,166,1) 100%)'
            : 'rgba(34, 211, 238, 0.8)'
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 1 : 0.8,
          backgroundSize: isHoveringClickable ? '200% 200%' : '100% 100%'
        }}
        transition={{ 
          type: 'spring', 
          damping: 20, 
          stiffness: 300,
          background: { duration: 0.3 }
        }}
      />
      
      {/* Aura luminosa alrededor del cursor */}
      <motion.div 
        className="fixed rounded-full pointer-events-none z-[9998]"
        style={{ 
          left: position.x, 
          top: position.y,
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(20,184,166,0) 70%)'
        }}
        animate={{
          width: isHovering ? 100 : 60,
          height: isHovering ? 100 : 60,
          x: '-50%',
          y: '-50%',
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      
      {/* Efecto de partículas/brillo (opcional) */}
      <motion.div 
        className="fixed rounded-full pointer-events-none z-[9997]"
        style={{ 
          left: position.x, 
          top: position.y,
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(20,184,166,0) 100%)',
          filter: 'blur(1px)'
        }}
        animate={{
          width: isHovering ? 150 : 80,
          height: isHovering ? 150 : 80,
          x: '-50%',
          y: '-50%',
          opacity: isHovering ? 0.6 : 0.2
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 150 }}
      />
    </>
  );
};

export default Cursor;