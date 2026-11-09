export const QuickBadges = () => (
  <div className="flex flex-wrap justify-center gap-3 mb-8">
    <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-gray-200 flex items-center gap-2 shadow-lg">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      Open to Work (Remote / Europe / UK)
    </div>

    <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-blue-400 flex items-center gap-2 shadow-lg">
      <i className="fas fa-laptop-code" />
      5+ Years of Experience
    </div>

    <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-yellow-500 flex items-center gap-2 shadow-lg">
      <i className="fas fa-user-shield" />
      BSc Info Systems & MBA Cybersecurity
    </div>
  </div>
);
