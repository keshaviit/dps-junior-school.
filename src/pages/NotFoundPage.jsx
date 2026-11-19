import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, SchoolIcon } from "../components/Icons";
import palette from "../theme/palette";

export default function NotFoundPage() {
  return (
    <div
      style={{
        backgroundColor: palette.paper,
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 60px",
        textAlign: "center"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "560px",
          backgroundColor: palette.white,
          borderRadius: "32px",
          padding: "48px 36px",
          border: "1px solid var(--palette-line)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: palette.blush,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px"
          }}
        >
          <SchoolIcon size={30} color={palette.coralDark} />
        </div>

        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: palette.coralDark,
            textTransform: "uppercase",
            marginBottom: "8px"
          }}
        >
          404 · Page Not Found
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 38px)",
            fontWeight: 600,
            color: palette.ink,
            letterSpacing: "-0.8px",
            lineHeight: 1.2
          }}
        >
          Oops! Looks like this page wandered off.
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "24px",
            color: palette.muted,
            marginTop: "14px",
            marginBottom: "28px"
          }}
        >
          The page you are looking for doesn't exist or may have been moved. Let's get you back to our school discovery journey.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link to="/" className="pill-button pill-button-coral">
            <span>Return to Home</span>
            <ArrowRight size={16} color={palette.ink} />
          </Link>
          <Link to="/contact" className="pill-button pill-button-white">
            <span>Contact Desk</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
