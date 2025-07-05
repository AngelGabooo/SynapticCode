import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const PortfolioSections = () => {
  // Primera sección - Proyectos destacados (se mueve a la derecha)
  const featuredProjects = [
    {
      title: "Unlock Your Customer Data",
      category: "PERSONAL",
      description: "Plataforma de análisis de datos para e-commerce",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "A joyful learner is an Engaged learner",
      category: "POLICY",
      description: "Sistema de gamificación para educación online",
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    },
    {
      title: "Out of this world Solutions",
      category: "PILDER",
      description: "Dashboard de gestión para startups espaciales",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
    },
    {
      title: "Legal Weed Delivered Fast",
      category: "EFFECTIVE",
      description: "Plataforma de e-commerce para cannabis medicinal",
      imageUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "IT'S NOT A TENT, IT'S A CULLA",
      category: "GREATNESS",
      description: "Sitio web para equipo outdoor premium",
      imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Weed Griffiths",
      category: "SPECIAL",
      description: "Plataforma de entrega express",
      imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    }
  ];

  // Segunda sección - Trabajo reciente (se mueve a la izquierda)
  const recentProjects = [
    {
      title: "FITTER AND HEALTHIER IN ONE MONTH WITH",
      category: "CAREER",
      description: "App de fitness y nutrición personalizada",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Way That",
      category: "INNOVATION",
      description: "Solución de movilidad urbana",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Roy, Salt, Win Luxury",
      category: "COLLECTIONS",
      description: "E-commerce de artículos de lujo",
      imageUrl: "https://images.unsplash.com/photo-1601924638867-346803f9143c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Experiences Redefined",
      category: "TRAVEL",
      description: "Plataforma de viajes exclusivos",
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Secure Transactions",
      category: "FINANCE",
      description: "Sistema de pagos seguros",
      imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Transparent Data",
      category: "TECH",
      description: "Visualización de datos en tiempo real",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const AutoScrollCarousel = ({ items, direction = 'right', speed = 0.5 }) => {
    const carouselRef = useRef();
    const animationControls = useAnimation();
    const itemWidth = window.innerWidth > 768 ? 500 : 350;
    const gap = 40;

    useEffect(() => {
      const totalWidth = items.length * (itemWidth + gap);
      const duration = totalWidth / (speed * 50);

      animationControls.start({
        x: direction === 'right' ? -totalWidth/2 : totalWidth/2,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }, [items, direction, speed, itemWidth]);

    return (
      <div className="overflow-hidden py-8 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <motion.div 
          ref={carouselRef}
          className="flex gap-10 px-[5vw]"
          animate={animationControls}
        >
          {[...items, ...items].map((project, index) => (
            <ProjectCard 
              key={`${project.title}-${index}`} 
              project={project} 
              index={index} 
              width={itemWidth}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  const ProjectCard = ({ project, index, width = 350 }) => {
    return (
      <motion.div
        className="flex-shrink-0 relative overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
        style={{ 
          width: `${width}px`,
          height: `${width * 0.75}px`
        }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
      </motion.div>
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
            speed={0.3}
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
            speed={0.3}
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