/** "Free, maintained with voluntary support" + independence disclaimer. */
export function SupportNote({ ext, className = "" }) {
  if (!ext.supportNote && !ext.disclaimer) return null;

  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      {ext.supportNote && (
        <p className="flex items-start gap-2 text-gray-300">
          <i className="fas fa-heart text-rose-400 mt-1" aria-hidden="true" />
          <span>{ext.supportNote}</span>
        </p>
      )}
      {ext.disclaimer && (
        <p className="mt-2 text-xs text-gray-500">{ext.disclaimer}</p>
      )}
    </div>
  );
}
