import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { schoolData } from "../data/school";

export default function NotebookHero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d241c",
        overflow: "hidden",
        color: "#ffffff"
      }}
    >
      {/* Background Visual with Parallax / Motion Zoom */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 0.75 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=85")`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          zIndex: 0
        }}
      />

      {/* Cinematic Gradient Overlays (Great Walstead style) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, rgba(13, 36, 28, 0.7) 0%, rgba(13, 36, 28, 0.45) 45%, rgba(13, 36, 28, 0.95) 100%)",
          zIndex: 1
        }}
      />

      {/* Hero Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, padding: "5rem 1.5rem", textAlign: "center" }}>
        {/* Floating Accolade Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "inline-block", marginBottom: "1.5rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.45rem 1.25rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--accent)"
            }}
          >
            <span>🏆</span>
            <span style={{ color: "#ffffff" }}>{schoolData.awardBadge}</span>
          </div>
        </motion.div>

        {/* Grand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#ffffff",
            maxWidth: "1000px",
            margin: "0 auto 1.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)"
          }}
        >
          Where Every Day is an <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Adventure</span> in Learning.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
            color: "#f1f5f9",
            maxWidth: "760px",
            margin: "0 auto 2.75rem",
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          {schoolData.name} provides an extraordinary independent prep school education set within {schoolData.campusSize}. We cultivate confident, kind, and deeply inquisitive young learners.
        </motion.p>

        {/* Action Buttons & Film Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap"
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="btn btn-accent"
              style={{
                padding: "1rem 2.25rem",
                fontSize: "1.05rem",
                boxShadow: "0 10px 25px -4px rgba(216, 150, 37, 0.5)"
              }}
            >
              Book a Personal Visit →
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVideoModalOpen(true)}
            className="btn btn-outline-white"
            style={{ padding: "1rem 2rem", fontSize: "1rem" }}
          >
            <span style={{ fontSize: "1.2rem", color: "var(--accent)" }}>▶</span> Watch Campus Film
          </motion.button>
        </motion.div>

        {/* Quick Highlights Bar under Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            marginTop: "4.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            maxWidth: "1000px",
            margin: "4.5rem auto 0"
          }}
        >
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🌲</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>Forest School Days</div>
              <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>Hands-on outdoor science & nature</div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>💡</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>Junior STEM Labs</div>
              <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>Robotics, coding & electronics</div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🏊</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>Aquatics & Sports</div>
              <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>25m heated pool & fixture matches</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {videoModalOpen && (
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
              padding: "1.5rem"
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(10, 20, 16, 0.88)",
                backdropFilter: "blur(10px)"
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "860px",
                backgroundColor: "#000",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                zIndex: 1001
              }}
            >
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  title="School Tour Video"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--primary)" }}>
                <div>
                  <h4 style={{ color: "#ffffff", fontWeight: 700 }}>DPS Junior Public School • Campus Adventure Tour</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>Step inside a typical joyful day in our 45-acre parkland</p>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  ✕ Close Film
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
