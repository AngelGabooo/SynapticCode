// components/organisms/PartnersSlider.jsx
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const PartnersSlider = () => {
  const logos = [
    { name: 'Google', src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
    { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Platzi', src: 'https://static.platzi.com/media/branding/logo-dark.png' },
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'IBM', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/IBM_logo.svg' },
    { name: 'Netflix', src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg' },
    { name: 'Adobe', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg' }
  ];

  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const speed = 0.2;
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.5 });

  // Efectos de scroll
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
        transition: { duration: 0.5, ease: "easeIn" }
      });
    }
  }, [isInView]);

  // Carrusel automático
  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;

    const logosHTML = logos.map((logo, index) => (
      `<div key="original-${index}" class="inline-flex items-center justify-center min-w-[180px] px-8">
        <img src="${logo.src}" alt="${logo.name}" 
             class="h-12 md:h-16 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
      </div>`
    )).join('');

    container.innerHTML = logosHTML + logosHTML + logosHTML;

    let position = 0;
    const totalWidth = container.scrollWidth / 3;

    const animate = () => {
      position += speed;
      
      if (position >= totalWidth) {
        position = 0;
      }
      
      container.scrollLeft = position;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Solo animar cuando está en vista
    if (isInView) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView]);

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="py-20 bg-black/50 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Trusted by Industry Leaders
        </h2>
        
        <div 
          ref={containerRef}
          className="w-full overflow-x-hidden whitespace-nowrap"
        />
        
        {/* Efecto de fade en los bordes */}
        <div className="absolute inset-0 pointer-events-none flex justify-between">
          <div className="w-32 h-full bg-gradient-to-r from-black to-transparent" />
          <div className="w-32 h-full bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </motion.section>
  );
};

export default PartnersSlider;