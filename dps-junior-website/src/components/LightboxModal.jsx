import React, { useEffect } from "react";

export default function LightboxModal({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-rose-400 p-2 text-2xl font-bold cursor-pointer transition-colors z-50"
        aria-label="Close"
      >
        ✕
      </button>

      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 text-white hover:bg-white/20 p-3 rounded-full text-2xl font-bold cursor-pointer transition-all"
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 text-white hover:bg-white/20 p-3 rounded-full text-2xl font-bold cursor-pointer transition-all"
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src || image.url || image}
          alt={image.caption || "Campus photo"}
          className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
        />
        {image.caption && (
          <div className="mt-4 text-center">
            <p className="text-white font-medium text-sm md:text-base">{image.caption}</p>
            {image.category && (
              <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider mt-1 block">
                {image.category}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
