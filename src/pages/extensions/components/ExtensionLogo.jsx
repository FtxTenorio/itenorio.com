export function ExtensionLogo({ ext, className = "w-24 h-24", iconClassName = "text-4xl" }) {
  return (
    <div
      className={`${className} rounded-2xl shadow-xl border border-white/10 overflow-hidden bg-ink flex items-center justify-center shrink-0`}
    >
      {ext.isImage ? (
        <img
          src={ext.logo}
          alt={`${ext.name} logo`}
          className="w-full h-full object-cover"
        />
      ) : (
        <i
          className={`${ext.logo} ${iconClassName}`}
          style={{ color: ext.color }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
