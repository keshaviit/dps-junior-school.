import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { schoolData } from "../data/school";

export default function NotebookHero() {
  // Line-by-line reveal variants
  const lineVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + custom * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section style={{ padding: "3rem 0 5rem", backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div
          className="notebook-page"
          style={{
            padding: "3.5rem 2rem 3.5rem 4.5rem",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {/* Animated Red Margin Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: "48px",
              width: "2px",
              backgroundColor: "#ef4444",
              zIndex: 2
            }}
          />

          {/* School Badge Pill */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{ marginBottom: "1rem" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 0.9rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--primary-soft)",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "0.825rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}
            >
              🎓 CBSE Affiliated • Est. {schoolData.established}
            </span>
          </motion.div>

          {/* School Title - Animated line by line */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "var(--primary)",
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.02em"
            }}
          >
            {schoolData.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)",
              color: "var(--text)",
              fontWeight: 500,
              maxWidth: "760px",
              marginBottom: "1.75rem",
              lineHeight: 1.6
            }}
          >
            {schoolData.tagline}
          </motion.p>

          {/* Value Prop Badges */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginBottom: "2.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.925rem", color: "var(--text-muted)", fontWeight: 600 }}>
              <span style={{ color: "var(--success)" }}>✓</span> 100% Board Pass Rate
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.925rem", color: "var(--text-muted)", fontWeight: 600 }}>
              <span style={{ color: "var(--success)" }}>✓</span> Modern STEM Laboratories
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.925rem", color: "var(--success)", fontWeight: 600 }}>
              <span>✓</span> Digital Attendance & Portal
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <Link to="/about" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
              Explore School Story →
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: "0.85rem 1.75rem" }}>
              Admissions 2027-28
            </Link>
            <Link
              to="/login"
              className="btn btn-accent"
              style={{
                padding: "0.85rem 1.5rem"
              }}
            >
              Staff & Teacher Portal 🔐
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

