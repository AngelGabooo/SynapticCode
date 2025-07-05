import { useState } from 'react';
import Header from '../organisms/Header';
import HeroSection from '../organisms/HeroSection';
import PartnersSection from '../organisms/PartnersSection';
import PortfolioShowcase from '../organisms/PortfolioShowcase';
import ProjectLifeSection from '../molecules/ProjectLifeSection';
import WebflowProcess from '../organisms/WebflowProcess';
import SplashCursor from '../atoms/SplashCursor';
import Aurora from '../organisms/Aurora'; // Asegúrate de tener este componente

const HomePage = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  return (
    <>
      <SplashCursor />
      
      {/* Contenedor principal con posición relativa */}
      <div className="relative">
        {/* Efecto Aurora - Solo en la parte superior */}
        <div className="fixed top-0 left-0 w-full h-[400px] -z-10">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Header con estado compartido */}
        <Header activeIndex={activeNavItem} setActiveIndex={setActiveNavItem} />

        {/* Contenido principal con espacio para el header */}
        <main className="pt-24"> {/* Ajusta este padding-top según la altura de tu header */}
          <HeroSection />
          <PartnersSection />
          <PortfolioShowcase />
          <ProjectLifeSection />
          <WebflowProcess />
          {/* Más secciones pueden ir aquí */}
        </main>
      </div>
    </>
  );
};

export default HomePage;