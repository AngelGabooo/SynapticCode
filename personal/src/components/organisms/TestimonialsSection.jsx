import React, { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ rating: 0, clients: 0, projects: 0 });
  const hasCounterStartedRef = useRef(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const titleRef = useRef(null);
  const intervalRefs = useRef({});

  // Hook para detectar elementos visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setIsVisible(prev => ({
              ...prev,
              [id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounterStartedRef.current) {
            hasCounterStartedRef.current = true;
            // Animar contador de rating
            animateCounter(4.9, 'rating', 2000);
            // Animar contador de clientes
            animateCounter(100, 'clients', 2500);
            // Animar contador de proyectos
            animateCounter(150, 'projects', 3000);
          }
          // Cuando sale de vista, resetea los contadores y el flag
          if (!entry.isIntersecting && hasCounterStartedRef.current) {
            hasCounterStartedRef.current = false;
            setCounters({ rating: 0, clients: 0, projects: 0 });
            // Limpiar todos los intervalos
            Object.values(intervalRefs.current).forEach(id => clearInterval(id));
            intervalRefs.current = {};
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observar elementos
    const cards = document.querySelectorAll('[data-id]');
    cards.forEach(card => observer.observe(card));

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
      // Limpiar intervalos al desmontar
      Object.values(intervalRefs.current).forEach(id => clearInterval(id));
      intervalRefs.current = {};
    };
  }, []);

  // Función para animar contadores
  const animateCounter = (target, key, duration) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    // Limpiar cualquier intervalo anterior para esta key
    if (intervalRefs.current[key]) {
      clearInterval(intervalRefs.current[key]);
    }

    intervalRefs.current[key] = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(intervalRefs.current[key]);
        intervalRefs.current[key] = null;
      }
      setCounters(prev => ({
        ...prev,
        [key]: key === 'rating' ? Number(current.toFixed(1)) : Math.floor(current)
      }));
    }, 16);
  };

  const testimonials = [
    {
      id: 1,
      rating: 5,
      content: "Trabajar con Angel fue una experiencia excepcional. Su atención al detalle y comprensión de nuestras necesidades superó todas las expectativas. El diseño final fue exactamente lo que buscábamos.",
      author: "Carlos Mendoza",
      position: "Director de Marketing",
      company: "TechSolutions",
      username: "carlos_m",
      gradient: "from-purple-500 to-pink-500",
      avatar: "👨‍💼" // Icono de persona
    },
    {
      id: 2,
      rating: 5,
      content: "Increíble profesionalismo y creatividad. SynapticCode transformó completamente nuestra imagen corporativa en tiempo récord. Su capacidad para captar nuestra esencia y plasmarla en el diseño es asombrosa.",
      author: "Ana López",
      position: "CEO",
      company: "Diseño360",
      username: "analopez",
      gradient: "from-blue-500 to-cyan-500",
      avatar: "👩‍💻" // Icono de persona
    },
    {
      id: 3,
      rating: 5,
      content: "Como startup, necesitábamos un diseño impactante con recursos limitados. SynapticCode no solo entendió nuestra visión, sino que la mejoró. Su trabajo fue clave para nuestra exitosa campaña de lanzamiento.",
      author: "Diego Ramírez",
      position: "Co-fundador",
      company: "StartUpNow",
      username: "diego_r",
      gradient: "from-green-500 to-teal-500",
      avatar: "🧑‍💼" // Icono de persona
    },
    {
      id: 4,
      rating: 5,
      content: "Recomiendo a SynapticCode sin dudarlo. Su enfoque metódico y su ojo para el diseño moderno nos ayudaron a destacar en un mercado competitivo. Además, cumplió con todos los plazos prometidos.",
      author: "María González",
      position: "Directora Creativa",
      company: "BrandVision",
      username: "mariag",
      gradient: "from-orange-500 to-red-500",
      avatar: "👩‍🎨" // Icono de persona
    }
  ];

  return (
    <section className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      {/* Fondo con efecto de malla animada */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-black to-slate-900/50"></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        {/* Título con efecto moderno */}
        <div 
          className={`text-center mb-24 transform transition-all duration-1000 ${
            isVisible.title ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          data-id="title"
          ref={titleRef}
        >
          <div className="inline-block">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              Lo que dicen
            </h2>
            <h3 className="text-3xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              sobre mi trabajo
            </h3>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative group transform transition-all duration-1000 ${
                isVisible[`card-${testimonial.id}`] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              data-id={`card-${testimonial.id}`}
              style={{ 
                transitionDelay: `${index * 200}ms` 
              }}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Tarjeta principal */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-700 min-h-[380px] flex flex-col overflow-hidden">
                
                {/* Efecto de gradiente animado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Decoración superior */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                {/* Estrellas con animación */}
                <div className="flex gap-1 mb-8 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="transform transition-transform duration-300 hover:scale-110"
                      style={{
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Texto del testimonio */}
                <blockquote className="text-white/90 text-lg leading-relaxed flex-grow relative z-10 font-light">
                  <span className="text-6xl text-white/20 absolute -top-4 -left-2 font-serif">"</span>
                  <span className="relative">{testimonial.content}</span>
                </blockquote>

                {/* Información del autor */}
                <div className="mt-8 flex items-center gap-4 relative z-10">
                  {/* Avatar con gradiente */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} p-0.5`}>
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-xl mb-1">{testimonial.author}</h4>
                    <p className="text-white/60 text-sm">{testimonial.position} • {testimonial.company}</p>
                  </div>

                  {/* Logo/Username */}
                  <div className="text-right">
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient} font-bold text-lg`}>
                      @{testimonial.username}
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl blur-xl"></div>
                </div>
              </div>

              {/* Sombra externa animada */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-all duration-700 blur-2xl -z-10 scale-105`}></div>
            </div>
          ))}
        </div>

        {/* Estadísticas al final */}
        <div 
          className={`mt-20 text-center transform transition-all duration-1000 ${
            isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          data-id="stats"
          ref={statsRef}
        >
          <div className="flex justify-center gap-12 text-white/60">
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2">
                {counters.rating}
              </div>
              <div className="text-sm">Puntuación promedio</div>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2">
                {counters.clients}+
              </div>
              <div className="text-sm">Clientes satisfechos</div>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2">
                {counters.projects}+
              </div>
              <div className="text-sm">Proyectos completados</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;