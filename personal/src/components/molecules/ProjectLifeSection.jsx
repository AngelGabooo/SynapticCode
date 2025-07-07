import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaSearch, FaPalette, FaCode, FaTools } from 'react-icons/fa';

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
      title: "¿Por qué elegirnos para tu proyecto web?",
      language: "ES",
      services: [
        {
          title: "1. Información y Estrategia",
          description: "Analizamos tu negocio, competencia y audiencia para crear una estrategia digital que realmente funcione. Definimos objetivos claros y medibles.",
          icon: "search"
        },
        {
          title: "2. Diseño Profesional",
          description: "Creamos diseños únicos y atractivos que reflejan la personalidad de tu marca. Priorizamos la experiencia del usuario y la conversión.",
          icon: "design"
        },
        {
          title: "3. Desarrollo Web",
          description: "Transformamos el diseño en una página web funcional, rápida y optimizada. Utilizamos las mejores tecnologías del mercado.",
          icon: "code"
        },
        {
          title: "4. Mantenimiento Continuo",
          description: "Ofrecemos soporte técnico, actualizaciones de seguridad y mejoras continuas para mantener tu sitio web siempre al día.",
          icon: "maintenance"
        }
      ],
      cta: {
        title: "Estás a 4 pasos de transformar tu negocio online",
        description: "Nuestro proceso probado ha ayudado a cientos de empresas a aumentar sus ventas y posicionarse como líderes en su industria."
      }
    },
    en: {
      title: "Why choose us for your web project?",
      language: "EN",
      services: [
        {
          title: "1. Information & Strategy",
          description: "We analyze your business, competition and audience to create a digital strategy that really works. We define clear and measurable objectives.",
          icon: "search"
        },
        {
          title: "2. Professional Design",
          description: "We create unique and attractive designs that reflect your brand's personality. We prioritize user experience and conversion.",
          icon: "design"
        },
        {
          title: "3. Web Development",
          description: "We transform design into a functional, fast and optimized website. We use the best technologies on the market.",
          icon: "code"
        },
        {
          title: "4. Continuous Maintenance",
          description: "We offer technical support, security updates and continuous improvements to keep your website always up to date.",
          icon: "maintenance"
        }
      ],
      cta: {
        title: "You're 4 steps away from transforming your online business",
        description: "Our proven process has helped hundreds of companies increase their sales and position themselves as leaders in their industry."
      }
    },
    ar: {
      title: "لماذا تختارنا لمشروعك على الويب؟",
      language: "AR",
      services: [
        {
          title: "1. المعلومات والاستراتيجية",
          description: "نحلل عملك والمنافسة والجمهور لإنشاء استراتيجية رقمية تعمل حقاً. نحدد أهدافاً واضحة وقابلة للقياس.",
          icon: "search"
        },
        {
          title: "2. التصميم الاحترافي",
          description: "نصنع تصاميم فريدة وجذابة تعكس شخصية علامتك التجارية. نعطي الأولوية لتجربة المستخدم والتحويل.",
          icon: "design"
        },
        {
          title: "3. تطوير الموقع",
          description: "نحول التصميم إلى موقع ويب وظيفي وسريع ومحسّن. نستخدم أفضل التقنيات في السوق.",
          icon: "code"
        },
        {
          title: "4. الصيانة المستمرة",
          description: "نقدم الدعم الفني وتحديثات الأمان والتحسينات المستمرة للحفاظ على موقعك محدثاً دائماً.",
          icon: "maintenance"
        }
      ],
      cta: {
        title: "أنت على بعد 4 خطوات من تحويل عملك الرقمي",
        description: "عمليتنا المثبتة ساعدت المئات من الشركات على زيادة مبيعاتها وتموضعها كقادة في صناعتها."
      }
    },
    it: {
      title: "Perché sceglierci per il tuo progetto web?",
      language: "IT",
      services: [
        {
          title: "1. Informazioni e Strategia",
          description: "Analizziamo il tuo business, la concorrenza e il pubblico per creare una strategia digitale che funzioni davvero. Definiamo obiettivi chiari e misurabili.",
          icon: "search"
        },
        {
          title: "2. Design Professionale",
          description: "Creiamo design unici e accattivanti che riflettono la personalità del tuo brand. Priorizziamo l'esperienza utente e la conversione.",
          icon: "design"
        },
        {
          title: "3. Sviluppo Web",
          description: "Trasformiamo il design in un sito web funzionale, veloce e ottimizzato. Utilizziamo le migliori tecnologie sul mercato.",
          icon: "code"
        },
        {
          title: "4. Manutenzione Continua",
          description: "Offriamo supporto tecnico, aggiornamenti di sicurezza e miglioramenti continui per mantenere il tuo sito sempre aggiornato.",
          icon: "maintenance"
        }
      ],
      cta: {
        title: "Sei a 4 passi dal trasformare il tuo business online",
        description: "Il nostro processo comprovato ha aiutato centinaia di aziende ad aumentare le vendite e posizionarsi come leader nel loro settore."
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

  const renderServiceIcon = (iconType) => {
    switch(iconType) {
      case 'search':
        return (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaSearch className="w-8 h-8 text-white" />
          </div>
        );
      case 'design':
        return (
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaPalette className="w-8 h-8 text-white" />
          </div>
        );
      case 'code':
        return (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaCode className="w-8 h-8 text-white" />
          </div>
        );
      case 'maintenance':
        return (
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaTools className="w-8 h-8 text-white" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 w-full max-w-7xl mx-auto">
          {content[languages[currentLanguage]].services.map((service, index) => (
            <div 
              key={index}
              ref={el => elementsRef.current[index + 1] = el}
              className="group text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 opacity-0 translate-y-10 transition-all duration-700 flex flex-col items-center min-h-[350px]"
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="flex justify-center mb-6">
                {renderServiceIcon(service.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Sección final con CTA */}
        <div 
          ref={el => elementsRef.current[5] = el}
          className="pt-16 opacity-0 translate-y-10 transition-all duration-700 w-full text-center"
          style={{ transitionDelay: '600ms' }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
            {content[languages[currentLanguage]].cta.title}
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            {content[languages[currentLanguage]].cta.description}
          </p>
          
          {/* Botón CTA opcional */}
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {languages[currentLanguage] === 'es' ? 'Comenzar Ahora' : 
             languages[currentLanguage] === 'en' ? 'Get Started Now' :
             languages[currentLanguage] === 'ar' ? 'ابدأ الآن' : 'Inizia Ora'}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProjectLifeSection;