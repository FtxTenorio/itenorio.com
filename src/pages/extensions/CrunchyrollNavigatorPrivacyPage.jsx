// Served at /extensions/crunchy-navigator/privacy-policy/: this exact URL is
// referenced by the Chrome Web Store listing. Do not move it.
import { Link } from "react-router-dom";

const PrivacyContent = () => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in text-left">
      <Link
        to="/extensions"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-6 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Extensions
      </Link>

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
                  alt="Crunchyroll Navigator"
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
                  Crunchyroll Navigator
                </p>
              </div>
            </div>
            <div className="text-left md:text-right text-sm text-gray-500">
              <p>
                <strong>Last Updated:</strong> November 2026
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
                  we do not collect, store, or receive your personal data.
                </strong>{" "}
                The extension runs in your browser and talks only to
                Crunchyroll. Your preferences are saved in Chrome&apos;s own
                sync storage: if you have Chrome sync turned on, Chrome copies
                them to your Google account, just like your bookmarks. Nothing
                is ever sent to us.
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
                      We never ask for or collect your name, email, password,
                      or Crunchyroll account details. To load show and episode
                      data, the extension uses the Crunchyroll session already
                      open in your browser, and only to talk to Crunchyroll
                      itself. Session tokens never leave your browser.
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
                      Runs in Your Browser
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Reading the page (like anime titles and descriptions) and
                      loading data from Crunchyroll to power the filters happen
                      inside your browser. We run no server that receives your
                      data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1">
                    <i className="fas fa-sync-alt text-emerald-400 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200 mb-1">
                      Synced by Chrome, Not by Us
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Since version 2.6, your preferences are kept in
                      Chrome&apos;s sync storage. With Chrome sync on, Chrome
                      copies them to your Google account and to your other
                      computers, under Google&apos;s own privacy policy. With
                      sync off, they stay on this device. In both cases, we
                      never receive them.
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
                The extension requests only these two browser permissions:
              </p>

              <div className="space-y-4 flex-grow relative z-10">
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
                      Lets the extension run on Crunchyroll pages only. It reads
                      the anime list, adds the filter interface, loads show and
                      episode data from Crunchyroll, and lets the popup see
                      whether the open tab is a Crunchyroll page. It gives the
                      extension no access to any other site.
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
                      Saves your preferences in Chrome&apos;s sync storage:
                      interface language, preferred dub, toggles and your list
                      of followed shows. Caches stay on this device only. See
                      &quot;What the Extension Saves&quot; below.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6 relative z-10">
                The extension does not request the ActiveTab, Tabs or Scripting
                permissions.
              </p>
            </div>
          </div>

          {/* What is saved, and where */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <i className="fas fa-database text-blue-400"></i>
              What the Extension Saves
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400 leading-relaxed">
              <div>
                <h4 className="font-bold text-gray-200 mb-1">
                  Preferences (Chrome sync storage)
                </h4>
                <p>
                  Interface language, preferred dub language, grouping and
                  layout toggles, and the shows you follow. With Chrome sync
                  on, Chrome copies these to your Google account. With it off,
                  they stay on this device.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-200 mb-1">
                  Caches (this device only)
                </h4>
                <p>
                  Cover images, so pages load faster, and the filters you last
                  selected. Also saved here: a copy of the request Crunchyroll&apos;s website uses
                  to renew its session, which tells Crunchyroll which client is
                  asking and holds no tokens, passwords or cookies.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-200 mb-1">
                  Session (the open tab only)
                </h4>
                <p>
                  The Crunchyroll access token is kept in the tab&apos;s
                  session storage, used only for requests to Crunchyroll, and
                  cleared when you close the tab.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              None of this is ever sent to iTenorio Tech or to any third
              party.
            </p>
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

export default function CrunchyrollNavigatorPrivacyPage() {
  return (
    <div className="pt-8 pb-12 px-4 md:px-6">
      <PrivacyContent />
    </div>
  );
}
