import { useEffect, useState } from 'react';
import { Tardis } from '../components/Tardis';
import { Navbar } from '../components/NavBar';

const LandingPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Atualiza o ano automaticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 86400000); // 24 horas

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Componente Navbar Compartilhado */}
      <Navbar />

      {/* Componente Tardis Compartilhado */}
      <Tardis />

      {/* Main Content */}
      <main className="content-wrapper px-4 text-center pt-32 pb-24 relative z-20">
        {/* Profile Picture Section */}
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105 z-20 bg-white/5">
          <img src="https://source-of-data.s3.sa-east-1.amazonaws.com/public/tenorio-logo.png" alt="Paulo Tenório" className="w-full h-full object-cover"/>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 glowing-text tracking-tight z-20 relative">
          Paulo Tenório
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-400 font-semibold mb-8 z-20 relative">
          Creator, Tech Enthusiast & Dreamer
        </h2>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed z-20 relative">
          I'm building a space to share my journey, my projects, and the things that make me, me.
          From the music that inspires me to the stories that shape my perspective. Welcome to my world.
        </p>

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

        {/* Footer */}
        <div className="absolute bottom-6 w-full text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Paulo Tenório. All rights reserved.
          </p>
        </div>
      </main>

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
    </div>
  );
};

export default LandingPage;