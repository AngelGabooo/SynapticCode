// src/components/organisms/Header/Header.jsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Símbolos que rotarán (puedes usar emojis o SVG)
  const logos = ["🌐", "🚀", "✨"];
  
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

  // Efecto para mostrar/ocultar header según scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        // Scroll hacia abajo, ocultar header
        setShowHeader(false);
      } else {
        // Scroll hacia arriba, mostrar header transparente
        setShowHeader(true);
        setTransparent(currentY > 20);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`
        fixed top-6 inset-x-0 mx-auto w-[95%] max-w-6xl
        rounded-2xl py-3 px-6 z-[1000] border border-white/10 shadow-lg
        transition-all duration-500
        ${showHeader ? 'pointer-events-auto' : 'pointer-events-none'}
        ${showHeader ? (transparent ? 'bg-black/30 backdrop-blur-xl opacity-80' : 'bg-black/70 backdrop-blur-xl opacity-100') : 'opacity-0 -translate-y-10'}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showHeader ? 0 : -100, opacity: showHeader ? (transparent ? 0.8 : 1) : 0 }}
      transition={{ duration: 0.5 }}
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

        {/* Menú hamburguesa para móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

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

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-black/90 rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="text-green-400 font-medium border border-green-400/30 rounded-full px-5 py-2 mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </motion.header>
  );
};

export default Header;