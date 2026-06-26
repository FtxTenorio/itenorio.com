import { useState } from 'react';
import Games from './pages/Games';
import Musics from './pages/Musics';
import Stacks from './pages/Stacks';
import LandingPage from './pages/LandingPage';
import { Navbar } from './components/NavBar';
import { TheOneRing } from './components/TheOneRing';

function App() {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState('home');

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
        return <LandingPage />;
    }
  };

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Passamos o setCurrentPage para o Navbar poder trocar as páginas */}
      <Navbar setCurrentPage={setCurrentPage} />
      <TheOneRing/>

      {/* Renderiza o conteúdo dinâmico baseado no estado */}
      {renderPage()}
    </div>
  );
}

export default App;