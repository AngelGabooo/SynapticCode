import React, { useState, useEffect, useRef } from 'react';

const ProjectLifeSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTime = useRef(0);
  
  // Idiomas disponibles
  const languages = ['es', 'en', 'ar', 'it'];
  const isRTL = languages[currentLanguage] === 'ar';
  
  // Contenido en 4 idiomas
  const content = {
    es: {
      title: "Doy vida a tus proyectos",
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
      },
      scrollHint: "Desplázate para continuar"
    },
    en: {
      title: "I bring projects to life",
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
      },
      scrollHint: "Scroll to continue"
    },
    ar: {
      title: "أحقق المشاريع",
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
      },
      scrollHint: "قم بالتمرير للمتابعة"
    },
    it: {
      title: "Do vita ai progetti",
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
      },
      scrollHint: "Scorri per continuare"
    }
  };

  // Función para cambiar idioma con animación suave
  const changeLanguage = () => {
    if (isTransitioning || currentLanguage >= languages.length - 1) return;
    
    setIsTransitioning(true);
    
    // Después de la animación, cambiar el idioma
    setTimeout(() => {
      setCurrentLanguage(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  // Mejorado manejo del scroll con throttling
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = (e) => {
      const currentTime = Date.now();
      
      // Throttle scroll events
      if (currentTime - lastScrollTime.current < 100) {
        return;
      }
      
      const sectionRect = section.getBoundingClientRect();
      const isSectionInView = (
        sectionRect.top <= window.innerHeight / 2 && 
        sectionRect.bottom >= window.innerHeight / 2
      );
      
      if (!isSectionInView || isTransitioning) return;
      
      const isScrollingDown = e.deltaY > 0;
      if (!isScrollingDown) return;
      
      e.preventDefault();
      lastScrollTime.current = currentTime;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce scroll to prevent rapid changes
      scrollTimeoutRef.current = setTimeout(() => {
        changeLanguage();
      }, 50);
    };

    const handleTouchMove = (e) => {
      // Similar logic for touch events
      if (isTransitioning) {
        e.preventDefault();
        return;
      }
      
      const sectionRect = section.getBoundingClientRect();
      const isSectionInView = (
        sectionRect.top <= window.innerHeight / 2 && 
        sectionRect.bottom >= window.innerHeight / 2
      );
      
      if (!isSectionInView) return;
      
      // Simple touch handling for now
      const touch = e.touches[0];
      if (touch && touch.clientY < window.innerHeight / 2) {
        changeLanguage();
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentLanguage, isTransitioning]);

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
      className="py-20 px-4 max-w-6xl mx-auto text-center bg-black text-white min-h-screen flex flex-col justify-center relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Fondo animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black opacity-50"></div>
      
      <div 
        ref={contentRef} 
        className={`relative z-10 transition-all duration-500 ease-out ${
          isTransitioning 
            ? 'opacity-0 transform translate-y-8 scale-95' 
            : 'opacity-100 transform translate-y-0 scale-100'
        }`}
      >
        {/* Título principal */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {content[languages[currentLanguage]].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Tarjetas de servicios */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          {content[languages[currentLanguage]].services.map((service, index) => (
            <div 
              key={index} 
              className="group text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{
                animationDelay: `${index * 100}ms`
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
        <div className="pt-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
            {content[languages[currentLanguage]].cta.title}
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            {content[languages[currentLanguage]].cta.description}
          </p>
          
          {/* Indicador de scroll mejorado */}
          {currentLanguage < languages.length - 1 && (
            <div className="mt-12 flex flex-col items-center space-y-4">
              <div className="flex space-x-2 mb-2">
                {languages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentLanguage
                        ? 'bg-blue-500 w-8'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                {content[languages[currentLanguage]].scrollHint}
              </p>
              <div className="animate-bounce">
                <svg 
                  className="w-6 h-6 text-blue-400 animate-pulse"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectLifeSection;