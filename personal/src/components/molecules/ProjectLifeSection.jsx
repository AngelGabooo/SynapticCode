import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

// Idiomas disponibles
const languages = ['es', 'en', 'ar', 'it'];

const ProjectLifeSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  const isRTL = languages[currentLanguage] === 'ar';

  // Contenido en 4 idiomas
  const content = {
    es: {
      title: "Doy vida a tus proyectos",
      language: "ES",
      services: [
        {
          title: "Desarrollo Webflow White Label",
          description: "Conversión pixel-perfect de tus diseños de Figma a sitios web responsivos en Webflow."
        },
        {
          title: "Desarrollo de Figma/XD a Webflow",
          description: "Conversión pixel-perfect de tus diseños de Figma a sitios web responsivos en Webflow."
        },
        {
          title: "Mantenimiento Webflow flexible",
          description: "Soporte dedicado y gestión prioritaria para proyectos y cronogramas de agencias."
        }
      ],
      cta: {
        title: "Estás a 5 pasos de tener un nuevo sitio web...",
        description: "Amplía sin problemas las capacidades de tu agencia con desarrollo Webflow experto."
      }
    },
    en: {
      title: "I bring projects to life",
      language: "EN",
      services: [
        {
          title: "White Label Webflow Development",
          description: "Pixel-perfect conversion of your Figma designs into responsive Webflow websites."
        },
        {
          title: "Figma/XD to Webflow development",
          description: "Pixel-perfect conversion of your Figma designs into responsive Webflow websites."
        },
        {
          title: "Pay-as-you-go Webflow maintenance",
          description: "Dedicated support and priority handling for agency projects and timelines."
        }
      ],
      cta: {
        title: "You're 5 steps away from a new website...",
        description: "Seamlessly extend your agency's capabilities with expert Webflow development."
      }
    },
    ar: {
      title: "أحقق المشاريع",
      language: "AR",
      services: [
        {
          title: "تطوير ويبفلوو بالعلامة البيضاء",
          description: "تحويل دقيق من تصاميم فيجما إلى مواقع ويبفلوو متجاوبة."
        },
        {
          title: "تطوير من فيجما/إكس دي إلى ويبفلوو",
          description: "تحويل دقيق من تصاميم فيجما إلى مواقع ويبفلوو متجاوبة."
        },
        {
          title: "صيانة ويبفلوو حسب الطلب",
          description: "دعم مخصص ومعالجة أولوية لمشاريع الوكالات وجداولها الزمنية."
        }
      ],
      cta: {
        title: "أنت على بعد 5 خطوات من موقع ويب جديد...",
        description: "وسع قدرات وكالتك بسلاسة مع تطوير ويبفلوو احترافي."
      }
    },
    it: {
      title: "Do vita ai progetti",
      language: "IT",
      services: [
        {
          title: "Sviluppo Webflow White Label",
          description: "Conversione pixel-perfect dei tuoi design Figma in siti Webflow responsive."
        },
        {
          title: "Sviluppo da Figma/XD a Webflow",
          description: "Conversione pixel-perfect dei tuoi design Figma in siti Webflow responsive."
        },
        {
          title: "Manutenzione Webflow pay-as-you-go",
          description: "Supporto dedicato e gestione prioritaria per progetti e tempistiche delle agenzie."
        }
      ],
      cta: {
        title: "Sei a 5 passi da un nuovo sito web...",
        description: "Estendi senza problemi le capacità della tua agenzia con lo sviluppo Webflow esperto."
      }
    }
  };

  // Efecto para manejar clics fuera del dropdown
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

  // Efecto para animación al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [currentLanguage]);

  // Configuración de opciones de idioma
  const languageOptions = [
    { value: 'es', label: '🇪🇸 Español', dir: 'ltr' },
    { value: 'en', label: '🇬🇧 English', dir: 'ltr' },
    { value: 'it', label: '🇮🇹 Italiano', dir: 'ltr' },
    { value: 'ar', label: '🇸🇦 العربية', dir: 'rtl' }
  ];

  // Función para cambiar el idioma
  const changeLanguage = (langValue) => {
    const index = languages.indexOf(langValue);
    if (index !== -1) {
      setCurrentLanguage(index);
      setShowLanguageDropdown(false);
      document.documentElement.dir = langValue === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const renderServiceIcon = (index) => {
    switch(index) {
      case 0:
        return (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2z"/>
            </svg>
          </div>
        );
      case 1:
        return (
          <div className="flex space-x-2">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2z"/>
              </svg>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2z"/>
              </svg>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg text-xs font-bold text-white flex items-center justify-center min-w-12 transform hover:scale-105 transition-all duration-300">
              GSAP
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Fondo animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black opacity-50"></div>
      
      {/* Barra superior con botón de idioma */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <div className="relative" ref={dropdownRef}>
          <motion.button
            className="flex items-center justify-center gap-2 text-white font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300 text-sm border border-white/20"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGlobe className="text-base" />
            <span>{content[languages[currentLanguage]].language}</span>
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
                  className={`w-full text-center px-4 py-2 hover:bg-white/10 transition-colors flex items-center justify-center ${languages[currentLanguage] === option.value ? 'bg-white/20' : ''}`}
                  onClick={() => changeLanguage(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Título principal */}
        <div 
          ref={el => elementsRef.current[0] = el}
          className="mb-20 opacity-0 translate-y-10 transition-all duration-700 w-full text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {content[languages[currentLanguage]].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Tarjetas de servicios */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 w-full max-w-5xl mx-auto">
          {content[languages[currentLanguage]].services.map((service, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="group text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 opacity-0 translate-y-10 transition-all duration-700 flex flex-col items-center"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="flex justify-center mb-6">
                {renderServiceIcon(index)}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Sección final con CTA */}
        <div 
          ref={el => elementsRef.current[4] = el}
          className="pt-16 opacity-0 translate-y-10 transition-all duration-700 w-full text-center"
          style={{ transitionDelay: '300ms' }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
            {content[languages[currentLanguage]].cta.title}
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            {content[languages[currentLanguage]].cta.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectLifeSection;