import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          backgroundColor: "rgba(41, 37, 36, 0.65)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "760px",
            backgroundColor: "var(--palette-paper)",
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            border: "1px solid var(--palette-line)",
            position: "relative"
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 20,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              cursor: "pointer"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--palette-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Video / Visual Hero */}
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#1C1917" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
              src="https://assets.mixkit.co/videos/preview/mixkit-children-reading-and-learning-together-41315-large.mp4"
            />
          </div>

          {/* Modal Caption */}
          <div style={{ padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--palette-coralDark)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.2px", color: "var(--palette-coralDark)" }}>
                A DAY IN OUR CLASSROOM
              </span>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: 600, color: "var(--palette-ink)", letterSpacing: "-0.5px" }}>
              Big little days, growing <span className="script-heading">gently.</span>
            </h3>
            <p style={{ fontSize: "15px", color: "var(--palette-muted)", marginTop: "10px", lineHeight: "1.6" }}>
              Watch how our little learners move between focused discoveries, long outdoor walks in the garden, and joyful muddy play.
              We believe learning is not a race—it’s an adventure built on trust, laughter, and wide-eyed curiosity.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

