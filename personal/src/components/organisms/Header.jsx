// src/components/organisms/Header/Header.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  
  // Símbolos que rotarán (puedes usar emojis o SVG)
  const logos = ["⚭", "⚯"];
  
  // Elementos de navegación central
  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Process', href: '#process' }
  ];

  // Rotación automática de logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      className="fixed top-6 inset-x-0 mx-auto w-[95%] max-w-6xl bg-black/70 backdrop-blur-xl rounded-2xl py-3 px-6 z-[1000] border border-white/10 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo + Nombre de empresa (izquierda) */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="text-2xl text-white"
            key={currentLogo}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            {logos[currentLogo]}
          </motion.div>
          <span className="text-white font-medium">NombreEmpresa</span>
        </div>

        {/* Navegación central (centro) */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.a 
                  href={item.href}
                  className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Botón de contacto con efecto neon (derecha) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="relative px-5 py-2 rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Texto con brillo */}
            <span className="relative z-10 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.7)]">
              Contacto
            </span>
            
            {/* Fondo con efecto neon - Solo Tailwind */}
            <span className="absolute inset-0 bg-green-500/10 rounded-full border border-green-400/30"></span>
            <span className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></span>
            
            {/* Brillo externo - Solo Tailwind */}
            <span className="absolute -inset-1 rounded-full bg-green-500/10 blur-md"></span>
          </motion.a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;