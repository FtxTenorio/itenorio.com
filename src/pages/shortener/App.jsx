import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useCurrentPage } from "../../App";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/NavBar";
import "../../index.css";
import Shortener from "./components/Shortener";

export default function App() {
  const [currentPage, setCurrentPage] = [
    useCurrentPage((state) => state.currentPage),
    useCurrentPage((state) => state.setCurrentPage),
  ];
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // Se o estado global mudar para 'home', ele força a navegação para a raiz
    if (currentPage === "home" || currentPage === "") {
      window.location.href = "/";
    }
  }, [currentPage]);

  const navbarThemeClass =
    "bg-[rgba(11,15,25,0.6)] border-[rgba(255,255,255,0.1)]";

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navbarThemeClass={navbarThemeClass}
      />

      {/* O componente principal expande para empurrar o Footer pro final */}
      <main className="flex-grow flex items-center justify-center p-6 mt-16">
        <Shortener />
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
