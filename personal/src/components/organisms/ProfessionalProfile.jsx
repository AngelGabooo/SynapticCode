import React, { useRef, useEffect, useState } from 'react';

const translations = {
  es: {
    title: {
      line1: "Tu desarrollador",
      line2: "web de confianza",
      line3: "y profesional"
    },
    name: "Angel Gabriel",
    available: "Desarrollador Full Stack",
    quote: "Presupuesto adaptable al cliente",
    role: "Desarrollador Webflow Profesional",
    description: "Especializado en crear sitios web y funcionales con tecnología moderna. Combinando estética de diseño con excelencia técnica.",
    skillsTitle: "Habilidades y Logros",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "MongoDB", "SQL", "Git"],
    achievements: [
      "Experiencias: Google, Microsoft, AWS Amazon, Platzi",
      "Más de 50 proyectos completados con éxito",
      "Certificación en Desarrollo Web Avanzado",
      "Experiencia liderando equipos técnicos",
      "Contribuidor activo en proyectos open-source"
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Avanzado" }
    ],
    certifications: [
      { title: "Finsweet Client-first", description: "Implementación de mejores prácticas con el Sistema de Estilo Webflow Client-first de Finsweet.", iconColor: "blue" },
      { title: "Miembro Finsweet+", description: "Acceso exclusivo a contenido premium y recursos en la comunidad Finsweet.", iconColor: "purple" },
      { title: "T.RICKS Wizardry", description: "Creando diseños que escalan perfectamente en todos los dispositivos con capacidad de respuesta óptima.", iconColor: "green" },
      { title: "Flux Academy", description: "Cursos completados de diseño web profesional en Flux Academy.", iconColor: "yellow" }
    ]
  },
  en: {
    title: {
      line1: "Your trusted",
      line2: "web developer",
      line3: "and professional"
    },
    name: "Angel Gabriel",
    available: "Desarrollador Full Stack",
    quote: "Client-adaptable quote",
    role: "Professional Webflow Developer",
    description: "Specialized in creating modern and functional websites. Combining design aesthetics with technical excellence.",
    skillsTitle: "Skills and Achievements",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "MongoDB", "SQL", "Git"],
    achievements: [
      "Experiences: Google, Microsoft, AWS Amazon, Platzi",
      "Over 50 projects successfully completed",
      "Advanced Web Development Certification",
      "Experience leading technical teams",
      "Active contributor to open-source projects"
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Advanced" }
    ],
    certifications: [
      { title: "Finsweet Client-first", description: "Implementing best practices with Finsweet's Client-first Webflow Style System.", iconColor: "blue" },
      { title: "Finsweet+ Member", description: "Exclusive access to premium content and resources in the Finsweet community.", iconColor: "purple" },
      { title: "T.RICKS Wizardry", description: "Creating designs that scale perfectly across all devices with optimal responsiveness.", iconColor: "green" },
      { title: "Flux Academy", description: "Completed professional web design courses at Flux Academy.", iconColor: "yellow" }
    ]
  },
  ar: {
    title: {
      line1: "مطور الويب",
      line2: "الموثوق الخاص بك",
      line3: "والمحترف"
    },
    name: "Angel Gabriel",
    available: "Desarrollador Full Stack",
    quote: "عرض سعر قابل للتكيف مع العميل",
    role: "مطور ويب فلو محترف",
    description: "متخصص في إنشاء مواقع ويب حديثة وعملية باستخدام التكنولوجيا الحديثة. يجمع بين جماليات التصميم والتفوق التقني.",
    skillsTitle: "المهارات والإنجازات",
    skills: ["جافا سكريبت", "رياكت", "نود.جي إس", "تايب سكريبت", "إتش تي إم إل/سي إس إس", "مونغو دي بي", "إس كيو إل", "جيت"],
    achievements: [
      "الخبرات: Google, Microsoft, AWS Amazon, Platzi",
      "أكثر من 50 مشروعًا تم إكمالها بنجاح",
      "شهادة في تطوير الويب المتقدم",
      "خبرة في قيادة الفرق التقنية",
      "مساهم نشط في مشاريع المصدر المفتوح"
    ],
    languagesTitle: "اللغات",
    languages: [
      { name: "الإسبانية", level: "أصلي" },
      { name: "الإنجليزية", level: "متقدم" }
    ],
    certifications: [
      { title: "فينسويت كلاينت-فيرست", description: "تنفيذ أفضل الممارسات باستخدام نظام أسلوب ويب فلو كلاينت-فيرست من فينسويت.", iconColor: "blue" },
      { title: "عضو فينسويت+", description: "الوصول الحصري إلى المحتوى المميز والموارد في مجتمع فينسويت.", iconColor: "purple" },
      { title: "تي.ريكس ويزاردري", description: "إنشاء تصاميم تتوسع بشكل مثالي عبر جميع الأجهزة باستجابة مثالية.", iconColor: "green" },
      { title: "أكاديمية فلوكس", description: "إكمال دورات تصميم الويب الاحترافية في أكاديمية فلوكس.", iconColor: "yellow" }
    ]
  },
  it: {
    title: {
      line1: "Il tuo sviluppatore",
      line2: "web di fiducia",
      line3: "e professionale"
    },
    name: "Angel Gabriel",
    available: "Desarrollador Full Stack",
    quote: "Preventivo adattabile al cliente",
    role: "Sviluppatore Webflow Professionale",
    description: "Specializzato nella creazione di siti web moderni e funzionali con tecnologia moderna. Combinando estetica del design con eccellenza tecnica.",
    skillsTitle: "Competenze e Risultati",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "MongoDB", "SQL", "Git"],
    achievements: [
      "Esperienze: Google, Microsoft, AWS Amazon, Platzi",
      "Oltre 50 progetti completati con successo",
      "Certificazione in Sviluppo Web Avanzato",
      "Esperienza nella guida di team tecnici",
      "Contributore attivo a progetti open-source"
    ],
    languagesTitle: "Lingue",
    languages: [
      { name: "Spagnolo", level: "Nativo" },
      { name: "Inglese", level: "Avanzato" }
    ],
    certifications: [
      { title: "Finsweet Client-first", description: "Implementazione delle migliori pratiche con il Sistema di Stile Webflow Client-first di Finsweet.", iconColor: "blue" },
      { title: "Membro Finsweet+", description: "Accesso esclusivo a contenuti premium e risorse nella comunità Finsweet.", iconColor: "purple" },
      { title: "T.RICKS Wizardry", description: "Creazione di design che si adattano perfettamente a tutti i dispositivi con una reattività ottimale.", iconColor: "green" },
      { title: "Flux Academy", description: "Corsi di design web professionale completati presso Flux Academy.", iconColor: "yellow" }
    ]
  }
};

const useScrollFade = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const PortafolioProfesional = () => {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const [language, setLanguage] = useState('es');
  const content = translations[language];

  useEffect(() => {
    if (!cardRef.current || !wrapRef.current) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 20;
      const rotateX = (centerY - y) / 20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--pointer-x', `${x}px`);
      card.style.setProperty('--pointer-y', `${y}px`);
    };

    const handlePointerLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const languages = ['es', 'en', 'ar', 'it'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % languages.length;
      setLanguage(languages[index]);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Añadimos el hook a cada sección que queremos animar
  const [cardRefFade, cardVisible] = useScrollFade();
  const [infoRefFade, infoVisible] = useScrollFade();

  return (
    <div className={`min-h-screen bg-black text-white ${language === 'ar' ? 'font-amiri direction-rtl' : ''}`}>
      <div className="container mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Tarjeta con imagen */}
        <div
          ref={wrapRef}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] perspective-1000"
        >
          <div
            ref={el => {
              cardRef.current = el;
              cardRefFade.current = el;
            }}
            className={`
              absolute inset-0 bg-black rounded-3xl border border-gray-800 overflow-hidden transition-transform duration-300 ease-out shadow-2xl
              transition-all duration-700
              ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{
              '--pointer-x': '50%',
              '--pointer-y': '50%',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Fondo con efecto de video */}
            <div className="absolute inset-0">
              <video
                src="/video/v.mp4" // Cambia la ruta por la de tu video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            </div>

            {/* Efecto de brillo */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: 'radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
            />

            {/* Contenido de la tarjeta */}
            <div className="relative h-full flex flex-col justify-between p-4 sm:p-8">
              {/* Texto superior */}
              <div className="text-center mt-0 sm:mt-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                  <span className="block">{content.title.line1}</span>
                  <span className="block">{content.title.line2}</span>
                  <span className="block">{content.title.line3}</span>
                </h2>
              </div>

              {/* Imagen de perfil */}
                 <div className="relative flex justify-center -mb-0 sm:-mb-2">
                <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 overflow-hidden">
                  <img 
                    src="/img/a.jpg" 
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                 </div>

              {/* Pie de tarjeta */}
              <div className="text-center">
                <p className="text-xl sm:text-2xl mb-4 sm:mb-6 mt-1 sm:mt-2">{content.name}</p>
                {/* Botones de redes sociales */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/tunumero" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                  <button className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors">
                    {content.available}
                  </button>
                  <button className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                    {content.quote}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección informativa */}
        <div
          ref={infoRefFade}
          className={`
            space-y-6 sm:space-y-8
            transition-all duration-700
            ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/20 rounded-full mb-4">
              Socio Pensium
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {content.role} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Webflow</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
              {content.description}
            </p>
          </div>

          {/* Habilidades y Logros */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{content.skillsTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {content.skills.map((skill, index) => (
                <span key={index} className="bg-gray-900/80 px-3 py-2 rounded-lg text-xs sm:text-sm">{skill}</span>
              ))}
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm sm:text-base">
              {content.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          {/* Idiomas */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{content.languagesTitle}</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {content.languages.map((lang, index) => (
                <div key={index}>
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-400 ml-2">- {lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
            {content.certifications.map((cert, index) => (
              <div key={index} className={`bg-gray-900/80 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-gray-800 hover:border-${cert.iconColor}-500 transition-colors`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-${cert.iconColor}-900/30 flex items-center justify-center`}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-${cert.iconColor}-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                        cert.iconColor === "blue" ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" :
                        cert.iconColor === "purple" ? "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" :
                        cert.iconColor === "green" ? "M13 10V3L4 14h7v7l9-11h-7z" :
                        "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      } />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white">{cert.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-3">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortafolioProfesional;