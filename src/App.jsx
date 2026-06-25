import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Games from './pages/Games';
import Musics from './pages/Musics';
import Stacks from './pages/Stacks';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Defina aqui suas rotas */}
        <Route path="/games" element={<Games />} />
        <Route path="/music" element={<Musics />} />
        <Route path="/stacks" element={<Stacks />} />
        
        {/* Rota padrão (home) */}
        <Route path="/" element={<LandingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;