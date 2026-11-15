import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, children, maxWidth = "560px" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(4px)"
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth,
              backgroundColor: "var(--surface, #FFFFFF)",
              borderRadius: "var(--radius-lg, 28px)",
              boxShadow: "var(--shadow-xl, 0 20px 40px rgba(0,0,0,0.12))",
              overflow: "hidden",
              zIndex: 1001,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--border, #E7E5E4)",
                backgroundColor: "var(--surface-alt, #FDFCF8)"
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary, #292524)" }}>{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  color: "var(--text-muted, #78716C)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-sm, 10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                padding: "1.5rem",
                overflowY: "auto",
                flex: 1
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

