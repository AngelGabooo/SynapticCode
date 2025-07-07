import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase, FaGlobe } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiRuby, SiWebflow, SiTailwindcss, SiFramer, SiPostgresql, SiMongodb, SiGraphql, SiExpress } from 'react-icons/si';
import { TbBrandThreejs, TbApi } from 'react-icons/tb';

const translations = {
  es: {
    title: "Experto en desarrollo de Paginas Web",
    subtitle: "Creo sitios Web perfectos sin necesidad de un equipo interno.",
    workButton: "Trabaja conmigo →",
    premiumButton: "Contacto",
    technologies: "Tecnologías que uso:",
    projects: "548 proyectos exitosos.",
    cases: "Ver casos →",
    language: "Idioma"
  },
  en: {
    title: "Webflow Development Expert",
    subtitle: "I create perfect Webflow sites without needing an in-house team.",
    workButton: "Work with me →",
    premiumButton: "Premium Partner",
    technologies: "Technologies I use:",
    projects: "548 successful projects.",
    cases: "View cases →",
    language: "Language"
  },
  it: {
    title: "Esperto in sviluppo Webflow",
    subtitle: "Creo siti Webflow perfetti senza bisogno di un team interno.",
    workButton: "Lavora con me →",
    premiumButton: "Partner Premium",
    technologies: "Tecnologie che uso:",
    projects: "548 progetti completati.",
    cases: "Vedi casi →",
    language: "Lingua"
  },
  ar: {
    title: "خبير تطوير ويب فلو",
    subtitle: "أقوم بإنشاء مواقع ويب فلو مثالية دون الحاجة إلى فريق داخلي.",
    workButton: "اعمل معي →",
    premiumButton: "شريك مميز",
    technologies: "التقنيات التي أستخدمها:",
    projects: "548 مشروعًا ناجحًا.",
    cases: "عرض الحالات →",
    language: "اللغة"
  }
};

const HeroSection = () => {
  const [language, setLanguage] = useState('es');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const dropdownRef = useRef(null);

  const techIcons = [
    { icon: <FaReact className="text-3xl md:text-4xl" />, name: 'React', color: 'text-blue-400' },
    { icon: <SiNextdotjs className="text-3xl md:text-4xl" />, name: 'Next.js', color: 'text-white' },
    { icon: <FaNodeJs className="text-3xl md:text-4xl" />, name: 'Node.js', color: 'text-green-500' },
    { icon: <SiExpress className="text-3xl md:text-4xl" />, name: 'Express', color: 'text-gray-300' },
    { icon: <FaPython className="text-3xl md:text-4xl" />, name: 'Python', color: 'text-yellow-400' },
    { icon: <FaHtml5 className="text-3xl md:text-4xl" />, name: 'HTML5', color: 'text-orange-500' },
    { icon: <FaCss3Alt className="text-3xl md:text-4xl" />, name: 'CSS3', color: 'text-blue-500' },
    { icon: <FaJs className="text-3xl md:text-4xl" />, name: 'JS', color: 'text-yellow-300' },
    { icon: <SiTypescript className="text-3xl md:text-4xl" />, name: 'TS', color: 'text-blue-600' },
    { icon: <SiRuby className="text-3xl md:text-4xl" />, name: 'Ruby', color: 'text-red-500' },
    { icon: <TbBrandThreejs className="text-3xl md:text-4xl" />, name: 'Three.js', color: 'text-white' },
    { icon: <FaGitAlt className="text-3xl md:text-4xl" />, name: 'Git', color: 'text-orange-600' },
    { icon: <SiWebflow className="text-3xl md:text-4xl" />, name: 'Webflow', color: 'text-blue-300' },
    { icon: <SiTailwindcss className="text-3xl md:text-4xl" />, name: 'Tailwind', color: 'text-cyan-400' },
    { icon: <SiFramer className="text-3xl md:text-4xl" />, name: 'Framer', color: 'text-purple-500' },
    { icon: <FaDatabase className="text-3xl md:text-4xl" />, name: 'SQL', color: 'text-blue-400' },
    { icon: <SiPostgresql className="text-3xl md:text-4xl" />, name: 'PostgreSQL', color: 'text-blue-500' },
    { icon: <SiMongodb className="text-3xl md:text-4xl" />, name: 'MongoDB', color: 'text-green-500' },
    { icon: <TbApi className="text-3xl md:text-4xl" />, name: 'API', color: 'text-red-400' },
    { icon: <SiGraphql className="text-3xl md:text-4xl" />, name: 'GraphQL', color: 'text-pink-500' },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 30,
        transition: { duration: 0.4, ease: "easeIn" }
      });
    }
  }, [isInView, controls]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = translations[language];

  const languageOptions = [
    { value: 'es', label: '🇪🇸 Español', dir: 'ltr' },
    { value: 'en', label: '🇬🇧 English', dir: 'ltr' },
    { value: 'it', label: '🇮🇹 Italiano', dir: 'ltr' },
    { value: 'ar', label: '🇸🇦 العربية', dir: 'rtl' }
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-4 pt-16 pb-8 overflow-hidden ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Barra superior con botón de idioma */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
        <div className="relative" ref={dropdownRef}>
          <motion.button
            className="flex items-center gap-2 text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300 text-sm border border-white/20"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGlobe className="text-base" />
            <span>{t.language}</span>
          </motion.button>
          
          {showLanguageDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 overflow-hidden"
            >
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center ${language === option.value ? 'bg-white/20' : ''}`}
                  onClick={() => {
                    setLanguage(option.value);
                    setShowLanguageDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-2 w-full">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {t.title}
        </motion.h1>
        
        <motion.p
          className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          {t.subtitle}
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full">
          <motion.a
            href="#"
            className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 text-base w-full sm:w-auto text-center sm:px-8 sm:py-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.workButton}
          </motion.a>
          
          <motion.a
            href="#"
            className="text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300 text-base border border-white/20 w-full sm:w-auto text-center sm:px-8 sm:py-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.premiumButton}
          </motion.a>
        </div>

        <motion.div 
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="w-full overflow-hidden relative py-6 sm:py-8"
        >
          <h3 className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5">{t.technologies}</h3>
          
          <TechCarouselResponsive techIcons={techIcons} />
          
          <div className="absolute inset-0 top-0 pointer-events-none flex justify-between">
            <div className="w-16 sm:w-20 h-full bg-gradient-to-r from-black to-transparent" />
            <div className="w-16 sm:w-20 h-full bg-gradient-to-l from-black to-transparent" />
          </div>
        </motion.div>
        
        <motion.div
          className="text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          <span>{t.projects}</span>
          <a href="#" className="underline hover:text-white transition-colors">{t.cases}</a>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-0"></div>
      </div>
    </section>
  );
};

const TechCarouselResponsive = ({ techIcons }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const speed = useRef(0.3);
  const itemWidth = useRef(90);

  useEffect(() => {
    const animate = () => {
      setOffset(prev => {
        const newOffset = prev + speed.current;
        const maxOffset = techIcons.length * itemWidth.current;
        return newOffset >= maxOffset ? 0 : newOffset;
      });
    };
    
    const recursiveAnimate = () => {
      animate();
      animationRef.current = requestAnimationFrame(recursiveAnimate);
    };

    animationRef.current = requestAnimationFrame(recursiveAnimate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [techIcons.length]);

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="flex"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {[...techIcons, ...techIcons, ...techIcons].map((tech, i) => (
          <div 
            key={`${tech.name}-${i}`} 
            className={`flex-shrink-0 w-[90px] sm:w-[100px] flex flex-col items-center justify-center px-2 ${tech.color} opacity-80 hover:opacity-100 transition-all duration-200`}
          >
            <div className="icon-container hover:scale-110 sm:hover:scale-125 transition-transform duration-200">
              {tech.icon}
            </div>
            <span className="text-xs sm:text-sm mt-2 text-gray-300 text-center">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;