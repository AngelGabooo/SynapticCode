import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PortfolioSections = () => {
  // Primera sección - Proyectos destacados (se mueve a la derecha)
  const featuredProjects = [
    {
      title: "Hoteles",
      category: "Hoteles",
      description: "Plataforma hotelera con reservas online",
      imageUrl: "https://images.squarespace-cdn.com/content/62bdac5c8fddd221bfbace8e/37f4acd7-a628-4e27-baa8-3f6857ef1ff3/image-asset.jpeg?content-type=image%2Fjpeg&format=1500w"
    },
    {
      title: "Restaurantes",
      category: "Comida",
      description: "Plataforma de reservas y pedidos online",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/67108c96215b682a860be345_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(23).webp"
    },
    {
      title: "Salones de Belleza",
      category: "Belleza",
      description: "Plataforma de reservas y gestión de citas",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd32352bd54b0587ed0d_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(25).webp"
    },
    {
      title: "Medicos",
      category: "Salud",
      description: "Plataforma de gestión de citas médicas",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/67108ca1bf381ac9e0b4629f_Cat.14.webp"
    },
    {
      title: "Agencias",
      category: "Agencies",
      description: "Plataforma para portafolios y agencias",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd8b5abd261a7f0827d6_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(35).webp"
    },
    {
      title: "Agencias",
      category: "Agencies",
      description: "Plataforma de gestión de proyectos de agencias",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd43352bd54b05880da9_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(37).png"
    }
  ];

  // Segunda sección - Trabajo reciente (se mueve a la izquierda)
  const recentProjects = [
    {
      title: "Agencia de Marketing",
      category: "Agencias & Marketing",
      description: "Plataforma de marketing digital",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/68102a39dc8f858806d01216_1745637115499_20055518_Secondary-20prev.webp"
    },
    {
      title: "Bienes y Raíces",
      category: "Real Estate",
      description: "Plataforma de gestión inmobiliaria",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd46c5f83dd2187bfde7_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(33).webp"
    },
    {
      title: "Arquitectura y Diseños",
      category: "ARCHITECTURE",
      description: "Plataforma de portafolio arquitectónico",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd38713733aafac171bc_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(16).webp"
    },
    {
      title: "Plataforma de Gobierno",
      category: "GOVERNMENT",
      description: "Sistema de gestión gubernamental",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd735abd261a7f080750_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(24).png"
    },
    {
      title: "Mantinimiento de Hogar",
      category: "HOME MAINTENANCE",
      description: "Plataforma de servicios de mantenimiento",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6706cd8e51b1e0160144a5bb_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(27).webp"
    },
    {
      title: "Technología y IoT",
      category: "TECHNOLOGY & IOT",
      description: "Tecnologia, software y dispositivos IoT",
      imageUrl: "https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/6711342ea3d7f258ad5e7959_183a9b4c-f57f-403c-b364-d9b26f1f6a9b-1-(34).webp"
    }
  ];

  const AutoScrollCarousel = ({ items, direction = 'right', speed = 1 }) => {
    const containerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    const [itemWidth, setItemWidth] = useState(350);
    const gap = 40;

    // Calcular el ancho del item basado en el tamaño de la pantalla
    useEffect(() => {
      const updateItemWidth = () => {
        setItemWidth(window.innerWidth > 768 ? 500 : 350);
      };
      
      updateItemWidth();
      window.addEventListener('resize', updateItemWidth);
      
      return () => window.removeEventListener('resize', updateItemWidth);
    }, []);

    useEffect(() => {
      const totalItemWidth = itemWidth + gap;
      const totalWidth = items.length * totalItemWidth;
      
      let animationId;
      
      const animate = () => {
        setTranslateX(prev => {
          const newValue = direction === 'right' ? prev - speed : prev + speed;
          
          // Reinicio suave cuando completa un ciclo
          if (direction === 'right' && Math.abs(newValue) >= totalWidth) {
            return 0;
          }
          if (direction === 'left' && newValue >= 0) {
            return -totalWidth;
          }
          
          return newValue;
        });
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, [items.length, direction, speed, itemWidth]);

    return (
      <div className="overflow-hidden py-8 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div 
          ref={containerRef}
          className="flex gap-10 px-[5vw] transition-transform duration-0"
          style={{
            transform: `translateX(${translateX}px)`,
            width: 'fit-content'
          }}
        >
          {/* Renderizar los items duplicados para efecto infinito */}
          {[...items, ...items, ...items].map((project, index) => (
            <ProjectCard 
              key={`${project.title}-${index}`} 
              project={project} 
              index={index} 
              width={itemWidth}
            />
          ))}
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project, index, width = 350 }) => {
    return (
      <div
        className="flex-shrink-0 relative overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
        style={{ 
          width: `${width}px`,
          height: `${width * 0.75}px`
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ transformOrigin: 'center' }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 flex flex-col justify-end">
          <span className="text-xs font-mono text-white/70 mb-2">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-base text-white/80">
            {project.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Primera sección - Featured Work (derecha) */}
      <section className="py-20 bg-black w-full">
        <div className="w-full">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-6 text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Work
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 text-center mb-12 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Selected projects that showcase our expertise
          </motion.p>
          
          <AutoScrollCarousel 
            items={featuredProjects} 
            direction="right" 
            speed={1.5}
          />
        </div>
      </section>

      {/* Segunda sección - Recent Work (izquierda) */}
      <section className="py-20 bg-black border-t border-white/10 w-full">
        <div className="w-full">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-6 text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recent Work
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 text-center mb-12 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our latest creations and collaborations
          </motion.p>
          
          <AutoScrollCarousel 
            items={recentProjects} 
            direction="left" 
            speed={1.5}
          />
          
          <motion.div
            className="text-center mt-16 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="#work" 
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors duration-300 text-lg"
            >
              View All Projects
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSections;