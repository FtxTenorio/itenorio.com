import { useState, useEffect } from 'react';
import Games from './pages/Games';
import Musics from './pages/Musics';
import Stacks from './pages/Stacks';
import LandingPage from './pages/LandingPage';
import { Navbar } from './components/NavBar';
import { TheOneRing } from './components/TheOneRing';
import { Footer } from './components/Footer';
import { Tardis } from './components/Tardis';

function App() {
  // Inicializa lendo do cache ou definindo 'home' como padrão
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'home';
  });

  // Salva no cache e rola para o topo sempre que currentPage mudar
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    window.scrollTo(0, 0); 
  }, [currentPage]);

  // Função para renderizar o componente correto
  const renderPage = () => {
    switch (currentPage) {
      case 'games':
        return <Games />;
      case 'music':
        return <Musics />;
      case 'stacks':
        return <Stacks />;
      case 'home':
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Passamos o currentPage e setCurrentPage para a Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Tardis />
      <TheOneRing />

      {/* Renderiza o conteúdo dinâmico */}
      {renderPage()}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;