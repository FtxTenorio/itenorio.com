import { useState, useEffect } from 'react';
import Games from './pages/Games';
import Musics from './pages/Musics';
import LandingPage from './pages/LandingPage';
import Minecraft from './pages/Minecraft'; // <-- Importe a nova página
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
      case 'minecraft':
        return <Minecraft />;
      case 'home':
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  // Verifica se estamos em uma página onde os itens "fan" devem ser escondidos
  const hideFanItems = ['minecraft', 'stacks'].includes(currentPage);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Passamos o currentPage e setCurrentPage para a Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* 
        Mantém a Tardis e o Anel sempre renderizados para as imagens não recarregarem.
        Usamos opacidade e pointer-events para escondê-los visualmente e impedir cliques,
        além de adicionar uma transição suave.
      */}
      <div 
        className={`transition-opacity duration-100 ${
          hideFanItems ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Tardis />
        <TheOneRing />
      </div>

      {/* Renderiza o conteúdo dinâmico */}
      {renderPage()}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;