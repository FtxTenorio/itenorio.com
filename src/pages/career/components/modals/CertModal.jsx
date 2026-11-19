import { ModalWrapper } from "./ModalWrapper";
import { SignalStrength } from "../ui/SignalStrength";

export const CertModal = ({ cert, onClose }) => (
  <ModalWrapper isOpen={Boolean(cert)} onClose={onClose} maxWidth="max-w-md">
    {cert && (
      <>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left border-b border-white/5 pb-5 pt-2 sm:pt-0">
          <img
            src={cert.img}
            alt={cert.name}
            className="h-16 w-16 md:h-20 md:w-20 object-contain shrink-0"
          />
          <div className="flex-1">
            <span className="text-[10px] font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded">
              Issued {cert.issuedOn ?? cert.yearEarned} · {cert.issuer}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-2">
              {cert.name}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <SignalStrength difficulty={cert.difficulty} />
              {cert.credlyUrl && (
                <a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:border-amber-400/50 hover:text-white"
                >
                  <i className="fas fa-certificate text-amber-300" aria-hidden="true" />
                  Verify on Credly
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold uppercase text-[#ffc000] tracking-wider mb-1 text-left">
              What it means
            </h4>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed text-left">
              {cert.meaning}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1 text-left">
              Requirements
            </h4>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-left">
              {cert.details}
            </p>
          </div>
        </div>
      </>
    )}
  </ModalWrapper>
);
