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
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const animateElements = () => {
      // Animate title
      if (titleRef.current) {
        titleRef.current.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }

      // Animate subtitle
      if (subtitleRef.current) {
        subtitleRef.current.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
        subtitleRef.current.style.opacity = '1';
        subtitleRef.current.style.transform = 'translateY(0)';
      }
      
      // Animate steps one by one
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
      className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Particle effect - Reduced for mobile */}
      <div className="absolute inset-0 opacity-10 md:opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 5 + 3}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Background gradient - Lighter for mobile */}
      <div className="absolute inset-0 opacity-20 md:opacity-30 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20 px-2">
          <h2 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 opacity-0 translate-y-10"
          >
            <span 
              className="inline-block font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(45deg, #40ffaa, #4079ff, #40ffaa)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 4s ease-in-out infinite',
                lineHeight: '1.3'
              }}
            >
              Yoeltú'ometroi 5 smiyometroipagagramos aoay Foometromieloo a norteooelmimetroio ometroibsimiyometroi...
            </span>
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-xl opacity-0 translate-y-10 max-w-3xl mx-auto"
            style={{ lineHeight: '1.5' }}
          >
            <span 
              className="inline-block font-semibold text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(45deg, #40ffaa, #4079ff, #40ffaa)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 4s ease-in-out infinite'
              }}
            >
              Amplíe sin problemas las capacidades de su agencia con el desarrollo experto de Webflow.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 relative px-2 sm:px-0">
          {/* Connection line - Only for desktop */}
          <div className="hidden lg:block absolute left-16 right-16 top-1/2 h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="relative group opacity-0 translate-y-10 scale-95"
            >
              <div className={`p-0.5 sm:p-1 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.accentColor} transition-all duration-500 group-hover:shadow-xl`}>
                <div className="bg-gray-900 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 h-full flex flex-col items-center text-center backdrop-blur-sm border border-gray-800 group-hover:border-transparent transition-all duration-500">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-br ${step.accentColor}`}>
                    {step.number}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default WebflowProcess;