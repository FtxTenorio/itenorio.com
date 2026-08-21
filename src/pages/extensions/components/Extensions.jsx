import { useState } from 'react';

export default function Extensions() {
  const [activePolicy, setActivePolicy] = useState(null);

  return <div className='mt-20'>
    <main className="px-4 pt-20 pb-24 max-w-5xl mx-auto flex flex-col items-center w-full">

      {/* === VIEW 1: LISTA DE EXTENSÕES === */}
      {!activePolicy && (
        <div className="w-full flex flex-col items-center animate-fade-in">

          {/* Cabeçalho Centralizado */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
              Browser Extensions
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              View policies for all published browser extensions by Itenorio.
            </p>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1 */}
            <div className="bg-[#121826] border border-white/10 p-6 md:p-8 rounded-md shadow-sm hover:border-[#ff6b00]/50 transition-colors duration-300 flex text-left h-full">
              {/* Ícone fixo na esquerda */}
              <div className="flex-shrink-0 mr-4 md:mr-5">
                <i className="fas fa-compass text-3xl text-[#ff6b00]"></i>
              </div>
              {/* Título e Texto alinhados na mesma linha vertical */}
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white tracking-wide mb-2">Crunchy Navigator</h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                  Improve the Crunchyroll experience with advanced filters, better navigation, and faster search.
                </p>
                <div>
                  <button
                    onClick={() => setActivePolicy('crunchy')}
                    className="bg-white/5 border border-white/10 hover:bg-[#ff6b00] hover:border-[#ff6b00] hover:text-white text-gray-300 px-5 py-2.5 rounded-sm font-semibold transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-file-contract"></i>
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* === VIEW 2: POLÍTICA DE PRIVACIDADE DO CRUNCHY NAVIGATOR === */}
      {activePolicy === 'crunchy' && (
        <div className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in text-left">

          <button
            onClick={() => setActivePolicy(null)}
            className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-2"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Extensions
          </button>

          {/* Cabeçalho da Política Centralizado */}
          <div className="mb-8 border-b border-white/10 pb-8 flex flex-col items-center text-center">
            <i className="fas fa-compass text-5xl text-[#ff6b00] mb-4"></i>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Crunchy Navigator
            </h1>
            <h2 className="text-lg text-gray-400 font-semibold mb-6">
              Privacy Policy & Terms of Use
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-sm text-xs font-semibold text-green-400 flex items-center gap-2 uppercase tracking-wider">
                <i className="fas fa-user-shield"></i> Privacy Focused
              </div>
              <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-sm text-xs font-semibold text-blue-400 flex items-center gap-2 uppercase tracking-wider">
                <i className="fas fa-toggle-on"></i> Opt-in Features
              </div>
            </div>
          </div>

          {/* Card de Informação 1 */}
          <div className="bg-[#121826] rounded-md p-6 md:p-8 border border-white/5 border-l-4 border-l-[#ff6b00] flex">
            <div className="flex-shrink-0 mr-4 md:mr-6 mt-1">
              <i className="fas fa-database text-2xl text-[#ff6b00]"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Data Collection & Usage</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                Our core functionality is designed to respect your privacy, but we do process specific data to enhance your experience:
              </p>
              <ul className="list-none space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-[#ff6b00] mt-1 text-lg"></i>
                  <span><strong>Account Information (Optional):</strong> By default, data collection is disabled. However, if you choose to opt-in, we may collect your Crunchyroll username and email address to personalize your experience, address you properly in the UI, and sync your extension preferences.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-search text-[#ff6b00] mt-1 text-lg"></i>
                  <span><strong>Website Content Processing:</strong> To provide our advanced features, the extension actively reads and processes on-page website information, including texts, anime titles, descriptions, and images/thumbnails. This data is utilized to power our enhanced recommendation engine, build complex filtering systems, and generate accurate, real-time alerts for new anime releases and episode updates.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card de Informação 2 */}
          <div className="bg-[#121826] rounded-md p-6 md:p-8 border border-white/5 border-l-4 border-l-[#0078d7] flex">
            <div className="flex-shrink-0 mr-4 md:mr-6 mt-1">
              <i className="fas fa-key text-2xl text-[#0078d7]"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Required Permissions</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                To provide advanced filters and better navigation, Crunchy Navigator requires the following browser permissions:
              </p>
              <ul className="list-none space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <i className="fas fa-check text-green-500 mt-1 text-lg"></i>
                  <span><strong>Host Permission (crunchyroll.com):</strong> Necessary to inject the improved UI and read website content for filters and recommendations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check text-green-500 mt-1 text-lg"></i>
                  <span><strong>Scripting:</strong> Essential for executing background logic, manipulating the DOM dynamically, and extracting the on-page data required to make our custom filters work seamlessly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check text-green-500 mt-1 text-lg"></i>
                  <span><strong>Storage:</strong> Required to save your custom filter configurations, feature toggles, and user preferences locally on your machine.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card de Informação 3 */}
          <div className="bg-[#121826] rounded-md p-6 md:p-8 border border-white/5 border-l-4 border-l-green-500 flex">
            <div className="flex-shrink-0 mr-4 md:mr-6 mt-1">
              <i className="fas fa-envelope text-2xl text-green-500"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Contact & Support</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                If you have any questions regarding this privacy policy, how your data is handled, or if you need assistance with the extension, please reach out directly to our support email.
              </p>
              <a
                href="mailto:extensions@itenorio.com"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-green-600 hover:border-green-600 text-white px-6 py-3 rounded-sm font-semibold transition-all duration-300 text-sm tracking-wide"
              >
                <i className="fas fa-paper-plane"></i>
                extensions@itenorio.com
              </a>
            </div>
          </div>

        </div>
      )}
    </main>

    <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
  </div>
}