import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useCurrentPage } from "../../App";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/NavBar";
import "../../index.css";
import Websites from "./components/Websites";

export default function App() {
  const [currentPage, setCurrentPage] = [
    useCurrentPage((state) => state.currentPage),
    useCurrentPage((state) => state.setCurrentPage),
  ];

  // Save initial page reference to avoid unwanted reload loops
  const initialPage = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== initialPage.current) {
      window.location.href = "/";
    }
  }, [currentPage]);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-grow pt-24 pb-8">
        <Websites />
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
