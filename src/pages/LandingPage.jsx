import { useEffect, useState } from 'react';
import { Tardis } from '../components/Tardis';

// Lista de tecnologias
const techStack = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" }
];

const LandingPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Controle da animação (brilho e pulo automático)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Controle exclusivo do balão com o nome (só aparece no clique)
  const [showTooltipIndex, setShowTooltipIndex] = useState(null);

  // Relógio do footer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 86400000); // 24 horas
    return () => clearInterval(timer);
  }, []);

  // Timer do Tech Stack (Animação de brilho)
  useEffect(() => {
    if (isPaused) return;

    const techTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techStack.length);
    }, 3000);

    return () => clearInterval(techTimer);
  }, [isPaused]);

  // Fecha o tooltip se o usuário clicar em qualquer outro lugar da tela
  useEffect(() => {
    const handleClickOutside = () => setShowTooltipIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <main className="content-wrapper px-4 text-center pt-32 pb-24 relative z-20">
      <Tardis />
      <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105 z-20 bg-white/5">
        <img src="https://source-of-data.s3.sa-east-1.amazonaws.com/public/tenorio-logo.png" alt="Paulo Tenório" className="w-full h-full object-cover"/>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 glowing-text tracking-tight z-20 relative">
        Paulo Tenório
      </h1>

      <h2 className="text-xl md:text-2xl text-gray-400 font-semibold mb-8 z-20 relative">
        Creator, Tech Enthusiast & Dreamer
      </h2>

      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed z-20 relative">
        I'm building a space to share my journey, my projects, and the things that make me, me.
        From the music that inspires me to the stories that shape my perspective. Welcome to my world.
      </p>

      {/* ========================================== */}
      {/* SESSÃO DE TECH STACK                         */}
      {/* ========================================== */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 z-20 relative max-w-md mx-auto">
        {techStack.map((tech, index) => {
          const isActive = activeIndex === index;             // Controla as cores/tamanho
          const isTooltipVisible = showTooltipIndex === index; // Controla o balão de texto

          return (
            <div 
              key={tech.name}
              className={`relative cursor-pointer flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border transition-all duration-300 
                ${isActive ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'}
              `}
              onMouseEnter={() => {
                setIsPaused(true);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setShowTooltipIndex(null); // Esconde o nome se tirar o mouse
              }}
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique feche o balão imediatamente pelo event listener global
                setIsPaused(true);
                setActiveIndex(index);
                // Alterna o balão: se já estiver aberto, fecha; se não, abre.
                setShowTooltipIndex(showTooltipIndex === index ? null : index);
              }}
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 
                  ${isActive ? 'grayscale-0 opacity-100 scale-110' : 'opacity-50 filter grayscale'}
                `}
              />
              
              {/* Pop-up (Tooltip) - Só aparece no isTooltipVisible */}
              <div 
                className={`absolute -top-10 whitespace-nowrap bg-gray-800 text-white text-xs font-semibold py-1 px-3 rounded-md shadow-lg transition-all duration-200 pointer-events-none border border-gray-600
                  ${isTooltipVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
                `}
              >
                {tech.name}
                {/* Rabicho do balão */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-b border-r border-gray-600"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Media Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 z-20 relative">
        <a href="https://github.com/FtxTenorio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg">
          <i className="fab fa-github text-2xl text-gray-300 hover:text-white"></i>
        </a>
        <a href="https://www.linkedin.com/in/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg">
          <i className="fab fa-linkedin text-2xl text-gray-300 hover:text-white"></i>
        </a>
        <a href="https://www.instagram.com/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg">
          <i className="fab fa-instagram text-2xl text-gray-300 hover:text-white"></i>
        </a>
        <a href="https://www.twitch.tv/ftxtenorio" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg">
          <i className="fab fa-twitch text-2xl text-gray-300 hover:text-white"></i>
        </a>
      </div>

      <div className="absolute bottom-6 w-full text-center">
        <p className="text-sm text-gray-500">
          © {currentYear} Paulo Tenório. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #0b0f19;
          color: #ffffff;
          overflow-x: hidden;
          margin: 0;
          height: 100vh;
        }

        .glowing-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5);
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </main>
  );
};

export default LandingPage;