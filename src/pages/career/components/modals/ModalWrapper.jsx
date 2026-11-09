export const ModalWrapper = ({
  isOpen,
  onClose,
  maxWidth = "max-w-sm",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-[#121826] border border-white/10 ${maxWidth} w-full rounded-2xl p-6 shadow-2xl relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-lg" />
        </button>
        {children}
      </div>
    </div>
  );
};
