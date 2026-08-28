import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { useCurrentPage } from '../../App'
import { Footer } from '../../components/Footer'
import NavBarRaw from '../../components/NavBarRaw'
import "../../index.css"; // Garante que o Tailwind e seus estilos carreguem
import Extensions from './components/Extensions'

export default function App() {
  const [currentPage, setCurrentPage] = [useCurrentPage(state => state.currentPage), useCurrentPage(state => state.setCurrentPage)]
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      setCurrentPage('extensions')
      firstRender.current = false
      return
    }

    window.location.href = '/'
  }, [currentPage])

  const navbarThemeClass = 'bg-[rgba(11,15,25,0.6)] border-[rgba(255,255,255,0.1)]';

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Passamos o currentPage e setCurrentPage para a Navbar */}
      <NavBarRaw currentPage={currentPage} setCurrentPage={setCurrentPage} navbarThemeClass={navbarThemeClass} />
      <Extensions></Extensions>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

// É esta parte aqui que estava faltando! Ela pega a div id="root" do privacy/index.html e injeta o React.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)