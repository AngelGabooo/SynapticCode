import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeIndex, setActiveIndex }) => {
  const [currentLogo, setCurrentLogo] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const lastScrollY = useRef(0);
  const isMobile = useRef(false);
  const navigate = useNavigate();

  const logos = ["🌐", "🚀", "✨"];
  
  const navItems = [
    { name: 'Work', path: '/#work' },
    { name: 'Capabilities', path: '/maintenance' },
    { name: 'Process', path: '/maintenance' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
      setShowCompanyName(!isMobile.current);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      if (!isMobile.current) {
        setShowCompanyName(false);
        setTimeout(() => {
          setCurrentLogo((prev) => (prev + 1) % logos.length);
          setShowCompanyName(true);
        }, 500);
      }
    }, 3000);
    
    return () => clearInterval(logoInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
        setTransparent(currentY > 20);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path, index) => {
    if (path === '/maintenance') {
      navigate('/maintenance');
    } else if (path.startsWith('/#')) {
      // Manejar anclas en la página de inicio
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path.substring(1));
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(path.substring(1));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setActiveIndex(index);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`
        fixed top-4 inset-x-0 mx-auto w-[95%] max-w-6xl
        rounded-2xl py-2 px-4 md:py-3 md:px-6 z-[1000] border border-white/10 shadow-lg
        transition-all duration-500
        ${showHeader ? 'pointer-events-auto' : 'pointer-events-none'}
        ${showHeader ? (transparent ? 'bg-black/30 backdrop-blur-xl opacity-80' : 'bg-black/70 backdrop-blur-xl opacity-100') : 'opacity-0 -translate-y-10'}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showHeader ? 0 : -100, opacity: showHeader ? (transparent ? 0.8 : 1) : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('/', -1)}
        >
          <motion.div 
            className="text-xl md:text-2xl text-white"
            key={currentLogo}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            {logos[currentLogo]}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {(!isMobile.current && showCompanyName) && (
              <motion.span
                className="text-white font-medium hidden md:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.2)',
                    '0 0 15px rgba(255,255,255,0.4)',
                    '0 0 5px rgba(255,255,255,0.2)'
                  ]
                }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ 
                  duration: 0.5,
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                NombreEmpresa
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Menú hamburguesa */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`block w-5 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Navegación central */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-4 md:gap-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.button 
                  onClick={() => handleNavigation(item.path, index)}
                  className={`text-sm md:text-base font-medium transition-colors duration-300 relative group ${
                    activeIndex === index ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  {item.path === '/maintenance' && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  )}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-px bg-white"
                    initial={{ scaleX: activeIndex === index ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Botones de acción */}
        <div className="hidden md:flex items-center gap-3 md:gap-4">
          <motion.button
            onClick={() => handleNavigation('/planes', 3)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs md:text-sm text-white">Planes</span>
          </motion.button>

          <motion.button
            onClick={() => handleNavigation('/#contact', 4)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs md:text-sm text-white">Contacto</span>
          </motion.button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-3 bg-black/95 rounded-xl shadow-lg p-4 flex flex-col items-center space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavigation(item.path, index)}
                className={`text-base w-full text-center py-2 border-b border-white/10 ${
                  activeIndex === index ? 'text-white' : 'text-white/80'
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                {item.path === '/maintenance' && (
                  <span className="ml-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>
                )}
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => handleNavigation('/planes', 3)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mt-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-white">Planes</span>
            </motion.button>
            
            <motion.button
              onClick={() => handleNavigation('/#contact', 4)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (navItems.length * 0.1) + 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-white">Contacto</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;