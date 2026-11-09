import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { schoolData } from "../data/school";

export default function NotebookHero() {
  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.25 + custom * 0.16,
        duration: 0.55,
        ease: "easeOut"
      }
    })
  };

  return (
    <section style={{ padding: "3rem 0 4.5rem", backgroundColor: "var(--bg)", position: "relative", overflow: "hidden" }}>
      {/* Decorative Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="notebook-page"
          style={{
            padding: "3.75rem 2.25rem 3.75rem 5.5rem",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative"
          }}
        >
          {/* Notebook Spiral / Binder Punch Holes on Far Left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "14px",
              width: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              zIndex: 3
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#cbd5e1",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)"
                }}
              />
            ))}
          </div>

          {/* Animated Red Ruled Margin Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: "56px",
              width: "2px",
              backgroundColor: "#ef4444",
              boxShadow: "1px 0 0 rgba(239, 68, 68, 0.3)",
              zIndex: 2
            }}
          />

          {/* Floating Pencil Icon animation */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              top: "24px",
              right: "28px",
              fontSize: "2.5rem",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
            }}
          >
            ✏️
          </motion.div>

          {/* Top Pill Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{ marginBottom: "1rem" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--primary-soft)",
                color: "var(--primary)",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                border: "1px solid rgba(59, 130, 246, 0.2)"
              }}
            >
              <span>⭐</span> Welcome to DPS Junior Public School
            </span>
          </motion.div>

          {/* School Name - Animated line by line */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              fontSize: "clamp(2.1rem, 5.5vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--primary)",
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.025em"
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
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "var(--text)",
              fontWeight: 600,
              maxWidth: "760px",
              marginBottom: "1.75rem",
              lineHeight: 1.6
            }}
          >
            {schoolData.tagline}
          </motion.p>

          {/* Key Value Props with Animated Icons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>
              <span style={{ color: "var(--success)", fontSize: "1.1rem" }}>✓</span> Activity-Based CBSE Pedagogy
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>
              <span style={{ color: "var(--success)", fontSize: "1.1rem" }}>✓</span> Junior STEM & Robotics Labs
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", color: "var(--success)", fontWeight: 600 }}>
              <span style={{ fontSize: "1.1rem" }}>✓</span> Real-Time Digital Attendance Portal
            </div>
          </motion.div>

          {/* Call to action buttons */}
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
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/about" className="btn btn-primary" style={{ padding: "0.9rem 1.85rem", fontSize: "1rem" }}>
                Explore Our Story →
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contact" className="btn btn-secondary" style={{ padding: "0.9rem 1.85rem", fontSize: "1rem" }}>
                Admissions 2027-28
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/login" className="btn btn-accent" style={{ padding: "0.9rem 1.6rem", fontSize: "1rem" }}>
                Faculty & Admin Portal 🔐
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
