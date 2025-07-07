import { useState, useEffect } from 'react';
import { Wrench, Clock, Zap, Star, ArrowLeft, RefreshCw } from 'lucide-react';

const Maintenance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [particles, setParticles] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Animación de progreso
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) return 0;
        return prev + 1;
      });
    }, 100);

    // Generar partículas flotantes
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Fondo con gradiente animado mejorado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black via-50% to-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/10 via-transparent to-cyan-900/10"></div>
      </div>
      
      {/* Partículas flotantes optimizadas para móvil */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Icono central mejorado */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full blur-2xl scale-150 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-xl scale-125 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="relative bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 sm:p-8 rounded-full border border-white/20 backdrop-blur-sm shadow-2xl">
            <Wrench className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-spin" style={{animationDuration: '4s'}} />
          </div>
        </div>

        {/* Título principal responsive */}
        <div className="text-center mb-8 sm:mb-12 max-w-4xl px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 via-50% to-blue-200 bg-clip-text text-transparent leading-tight">
            EN MANTENIMIENTO
          </h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full shadow-lg shadow-purple-500/50"></div>
          <p className="text-base sm:text-xl lg:text-2xl text-white/80 leading-relaxed px-2">
            Estamos mejorando la experiencia para ti. Grandes cambios están en camino.
          </p>
        </div>

        {/* Tarjetas de información optimizadas para móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl w-full px-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Tiempo estimado</h3>
            <p className="text-sm sm:text-base text-white/70">24-48 horas</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Nuevas funciones</h3>
            <p className="text-sm sm:text-base text-white/70">Experiencia mejorada</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 sm:col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Progreso actual</h3>
            <p className="text-sm sm:text-base text-white/70">{progress}% completado</p>
          </div>
        </div>

        {/* Reloj en tiempo real mejorado */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 inline-block shadow-lg">
            <p className="text-white/60 text-xs sm:text-sm mb-1">Hora actual</p>
            <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wider">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* Barra de progreso animada mejorada */}
        <div className="w-full max-w-sm sm:max-w-md mb-6 sm:mb-8 px-4">
          <div className="bg-white/10 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <p className="text-center text-white/60 text-xs sm:text-sm mt-2">{progress}% completado</p>
        </div>

        {/* Botones de acción mejorados */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-4">
          <button
            onClick={() => window.history.back()}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl font-semibold transition-all duration-300 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="relative z-10 text-sm sm:text-base">Volver atrás</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="relative z-10 text-sm sm:text-base">Actualizar</span>
          </button>
        </div>

        {/* Mensaje adicional responsive */}
        <div className="mt-8 sm:mt-12 text-center max-w-2xl px-4">
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
            Gracias por tu paciencia. Estamos trabajando para ofrecerte la mejor experiencia posible. 
            Síguenos en nuestras redes sociales para estar al tanto de las novedades.
          </p>
        </div>
      </div>

      {/* Elementos decorativos mejorados */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-l from-cyan-500/15 to-blue-500/15 rounded-full blur-xl"></div>
    </div>
  );
};

export default Maintenance;