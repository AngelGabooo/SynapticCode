import React, { useEffect, useRef } from 'react';

const WebflowProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Request",
      description: "Submit your request",
      accentColor: "from-purple-500 to-pink-500"
    },
    {
      number: "02",
      title: "Estimate",
      description: "Get an estimate step",
      accentColor: "from-blue-400 to-cyan-400"
    },
    {
      number: "03",
      title: "Approve",
      description: "Send Figma file & deposit",
      accentColor: "from-green-400 to-teal-400"
    },
    {
      number: "04",
      title: "Develop",
      description: "Excited in Webflow",
      accentColor: "from-yellow-400 to-orange-400"
    },
    {
      number: "05",
      title: "Deliver",
      description: "Pay remainder when 100%",
      accentColor: "from-red-400 to-pink-400"
    }
  ];

  const stepsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const animateElements = () => {
      const title = document.querySelector('.process-title');
      const subtitle = document.querySelector('.process-subtitle');
      
      if (title && subtitle) {
        title.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        subtitle.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }
      
      stepsRef.current.forEach((step, index) => {
        if (step) {
          step.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.15}s`;
          step.style.opacity = '1';
          step.style.transform = 'translateY(0) scale(1)';
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElements();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Efecto de partículas */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 5 + 3}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradiente de fondo */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="process-title text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 translate-y-10">
            You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">5 steps</span> away from a new website...
          </h2>
          <p className="process-subtitle text-xl text-gray-300 opacity-0 translate-y-10 max-w-3xl mx-auto">
            Seamlessly extend your agency's capabilities with expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Webflow</span> development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Línea de conexión */}
          <div className="hidden md:block absolute left-16 right-16 top-1/2 h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="relative group opacity-0 translate-y-10 scale-0.95"
            >
              <div className={`p-1 rounded-2xl bg-gradient-to-br ${step.accentColor} transition-all duration-500 group-hover:shadow-xl group-hover:shadow-${step.accentColor.split(' ')[1]}/20`}>
                <div className="bg-gray-900 rounded-xl p-8 h-full flex flex-col items-center text-center backdrop-blur-sm border border-gray-800 group-hover:border-transparent transition-all duration-500">
                  <div className={`text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br ${step.accentColor}`}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos para las animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default WebflowProcess;