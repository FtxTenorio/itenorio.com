export const SectionHeader = ({
  title,
  subtitle,
  leftAccentColor,
  rightAccentColor,
}) => (
  <div className="flex flex-col items-center justify-center mb-10 border-b border-white/10 pb-4 w-full text-center">
    <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
      {leftAccentColor && (
        <span
          className="w-1.5 h-5 rounded-sm"
          style={{ backgroundColor: leftAccentColor }}
        />
      )}
      {title}
      {rightAccentColor && (
        <span
          className="w-1.5 h-5 rounded-sm"
          style={{ backgroundColor: rightAccentColor }}
        />
      )}
    </h2>
    {subtitle && (
      <p className="text-xs text-gray-400 mt-1 max-w-xl">{subtitle}</p>
    )}
  </div>
);
