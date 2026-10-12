import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useCurrentPage } from "../../App";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/NavBar";
import "../../index.css";

const PrivacyContent = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in text-left">
      <a
        href="/extensions"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-6 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Extensions
      </a>

      <div className="bg-[#121826] border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
        {/* Glow Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/H6Qz1U2YFHnHibDBIOcqIXNEQ7QpmDOWnRFcxF-8NqJm-o1jCEAwLc4sR44JnANlJO3qOQ7SSoCH391dMrkBMZ-7=s120"
                  alt="Crunchy Navigator"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#ff6b00] w-6 h-6 rounded-full border-2 border-[#121826] flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white text-[10px]"></i>
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-[#ff6b00] font-bold tracking-wide uppercase text-sm mt-1">
                  Crunchy Navigator
                </p>
              </div>
            </div>
            <div className="text-left md:text-right text-sm text-gray-500">
              <p>
                <strong>Last Updated:</strong> October 2026
              </p>
              <p>iTenorio Tech</p>
            </div>
          </div>

          {/* TL;DR Highlight Card */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <i className="fas fa-user-shield text-3xl text-emerald-400"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                The Short Version
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Our core principle is simple:{" "}
                <strong className="text-white">
                  we do not collect, store, or transmit your personal data.
                </strong>{" "}
                Everything the extension does happens locally on your own
                device.
              </p>
            </div>
          </div>

          {/* Grid Layout: Privacy vs Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Column 1: What we DON'T do (Safe Zone) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <i className="fas fa-check-circle text-emerald-400"></i>
                Data Privacy
              </h3>

              <div className="space-y-6 flex-grow">
                <div className="flex gap-4 items-start">
                  <div className="mt-1">
                    <i className="fas fa-user-slash text-gray-500 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">
                      Zero Personal Data
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We never ask for, collect, or have access to your name,
                      email, passwords, or Crunchyroll account details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1">
                    <i className="fas fa-eye-slash text-gray-500 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">
                      Zero Tracking
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      No analytics, no browsing history logging, and no external
                      servers receiving your data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1">
                    <i className="fas fa-laptop-code text-emerald-400 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">
                      100% Local Execution
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Reading page content (like anime titles and descriptions)
                      happens strictly inside your browser to power the filters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: What we REQUIRE (Technical Zone) */}
            <div className="bg-[#ff6b00]/5 border border-[#ff6b00]/20 rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden">
              {/* Subtle background icon */}
              <i className="fas fa-cogs absolute -bottom-10 -right-10 text-9xl text-[#ff6b00]/5 rotate-12"></i>

              <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-[#ff6b00]/20 pb-4 mb-6 relative z-10">
                <i className="fas fa-key text-[#ff6b00]"></i>
                Required Permissions
              </h3>

              <p className="text-sm text-gray-300 mb-6 relative z-10">
                To function properly, the extension requires these browser
                permissions:
              </p>

              <div className="space-y-4 flex-grow relative z-10">
                {/* ActiveTab */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                    <i className="fas fa-mouse-pointer text-[#ff6b00]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">ActiveTab</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Grants temporary access to the currently active tab only
                      when you interact with the extension, ensuring minimal and
                      secure access.
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                    <i className="fas fa-window-restore text-[#ff6b00]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">Tabs</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Allows the extension to read the current URL to ensure it
                      only injects scripts and activates filters on Crunchyroll
                      pages.
                    </p>
                  </div>
                </div>

                {/* Host */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                    <i className="fas fa-globe text-[#ff6b00]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">
                      Host (crunchyroll.com)
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Required to access the page structure (DOM) so the
                      extension can read the anime list and inject the filter
                      interface.
                    </p>
                  </div>
                </div>

                {/* Scripting */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                    <i className="fas fa-code text-[#ff6b00]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">Scripting</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Executes the logic that hides, shows, or reorganizes anime
                      cards based on the filters you select.
                    </p>
                  </div>
                </div>

                {/* Storage */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center shrink-0">
                    <i className="fas fa-database text-[#ff6b00]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">Storage</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Saves your custom filter preferences locally in your
                      browser so you don't have to reconfigure them every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Legal Text / Footer */}
          <div className="bg-black/20 border border-white/5 rounded-xl p-6 text-sm text-gray-400 space-y-4">
            <h4 className="text-white font-bold mb-2">
              Additional Information
            </h4>
            <p>
              <strong className="text-gray-300">Third-Party Sharing:</strong>{" "}
              Because we do not collect any personal data, we cannot and do not
              sell, trade, or otherwise transfer your data to outside parties.
            </p>
            <p>
              <strong className="text-gray-300">Policy Updates:</strong> We may
              update our Privacy Policy from time to time. We will notify you of
              any changes by updating the "Last Updated" date at the top of this
              page.
            </p>
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>Questions about this policy?</p>
              <a
                href="mailto:extensions@itenorio.com"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <i className="fas fa-envelope text-blue-400"></i>
                extensions@itenorio.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = [
    useCurrentPage((state) => state.currentPage),
    useCurrentPage((state) => state.setCurrentPage),
  ];

  const initialPage = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== initialPage.current) {
      window.location.href = "/";
    }
  }, [currentPage]);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <PrivacyContent />
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

const rootElement = document.getElementById("root");

if (!window.__CRUNCHY_ROOT__) {
  window.__CRUNCHY_ROOT__ = ReactDOM.createRoot(rootElement);
}

window.__CRUNCHY_ROOT__.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
