import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartIcon,
  LeafIcon,
  SparklesIcon,
  SunnyIcon,
  SchoolIcon
} from "../components/Icons";
import palette from "../theme/palette";

export default function AdmissionsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ backgroundColor: palette.paper, minHeight: "100vh", paddingTop: "110px", paddingBottom: "90px" }}>
      {/* 1. HERO */}
      <section style={{ padding: "60px 0 70px", textAlign: "center", position: "relative" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "7px 16px",
              borderRadius: "20px",
              border: "1px solid var(--palette-line)",
              marginBottom: "20px"
            }}
          >
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: palette.coralDark }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", color: palette.coralDark, textTransform: "uppercase" }}>
              Admissions 2026–2027
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: palette.ink,
              fontSize: "clamp(42px, 5.8vw, 72px)",
              lineHeight: 1.08,
              letterSpacing: "-2px"
            }}
          >
            Admissions & <br />
            <span className="script-hero">Enrollment.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "19px",
              lineHeight: "30px",
              color: palette.muted,
              marginTop: "22px",
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            We welcome families who seek an unhurried, joy-filled education. Our admissions process is designed to be gentle, welcoming, and centered around your child's well-being.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "30px" }}
          >
            <Link
              to="/about#book-visit"
              className="pill-button pill-button-coral"
            >
              <span>Book a campus tour & visit</span>
              <ArrowRight size={17} color={palette.ink} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THREE INVENTIVE PROGRAMS */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
              AGE GROUPS & PROGRAMS
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: 500, color: palette.ink, letterSpacing: "-1px", marginTop: "10px" }}>
              Small rooms. Big <span className="script-heading">discoveries.</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "28px"
            }}
          >
            {[
              {
                badge: "AGES 2–5 (PLAY TO UKG)",
                name: "Foundational Pre-Primary",
                tagline: "Playgroup, Nursery, LKG & UKG",
                desc: "Guided by early childhood sensory exploration: mud kitchens, phonics, music rhythm, nature walks, and joyful social habits in warm, sunlit nursery cottages.",
                ratio: "1:6 mentor ratio",
                color: palette.blush,
                accent: palette.coralDark
              },
              {
                badge: "AGES 6–10 (CLASSES I – V)",
                name: "Preparatory & Primary Wing",
                tagline: "Class 1 through Class 5",
                desc: "Building rock-solid conceptual mastery in Mathematics, English & Hindi literacy, Environmental Studies (EVS), hands-on STEM experiments, and computer coding.",
                ratio: "1:8 mentor ratio",
                color: palette.sage,
                accent: "#5F7B67"
              },
              {
                badge: "AGES 11–14 (CLASSES VI – VIII)",
                name: "Middle School Wing",
                tagline: "Class 6 through Class 8",
                desc: "CBSE curriculum integrated with specialized Physics, Chemistry, Biology labs, advanced mathematics, Third Language (Sanskrit/French), robotics, and fixture sports.",
                ratio: "1:10 mentor ratio",
                color: palette.lavender,
                accent: "#776C9B"
              }
            ].map((prog) => (
              <div
                key={prog.name}
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "32px",
                  padding: "36px 30px",
                  border: "1px solid #F5F5F4",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: prog.color,
                      color: prog.accent,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "1.2px",
                      padding: "5px 12px",
                      borderRadius: "12px",
                      marginBottom: "16px"
                    }}
                  >
                    {prog.badge}
                  </div>
                  <h3 style={{ fontSize: "24px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
                    {prog.name}
                  </h3>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: prog.accent, marginTop: "4px" }}>
                    {prog.tagline}
                  </div>
                  <p style={{ fontSize: "15px", lineHeight: "24px", color: palette.muted, marginTop: "14px" }}>
                    {prog.desc}
                  </p>
                </div>
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #F5F5F4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: palette.ink }}>{prog.ratio}</span>
                  <span style={{ fontSize: "12px", color: palette.muted }}>Max 10 per group</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ADMISSIONS STEPS TIMELINE */}
      <section style={{ padding: "80px 0", backgroundColor: "#F7F4EE" }}>
        <div className="container" style={{ maxWidth: "980px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
              STEP-BY-STEP PROCESS
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: 500, color: palette.ink, letterSpacing: "-1px", marginTop: "10px" }}>
              The journey to <span className="script-heading">DPS Junior.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              {
                step: "01",
                title: "Visit Our Studios",
                desc: "Join a small-group morning tour. Watch our mentors and children in motion and get a genuine feel for our daily rhythm."
              },
              {
                step: "02",
                title: "Family Dialogue",
                desc: "We sit down with you over tea to hear about your child's personality, routines, and how we can support your family's hopes."
              },
              {
                step: "03",
                title: "Play Morning",
                desc: "Your child spends an unhurried morning playing in the studio or garden with their prospective group and mentors."
              },
              {
                step: "04",
                title: "Gentle Welcome",
                desc: "Receive your enrollment pack and a customized settling-in schedule designed so your child feels completely secure."
              }
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "26px",
                  padding: "28px 24px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  border: "1px solid #ECEAE3"
                }}
              >
                <div style={{ fontFamily: "var(--font-script)", fontSize: "36px", color: palette.coralDark, lineHeight: 1 }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 600, color: palette.ink, marginTop: "12px", letterSpacing: "-0.3px" }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: "14px", lineHeight: "22px", color: palette.muted, marginTop: "10px" }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div
            style={{
              marginTop: "50px",
              textAlign: "center",
              backgroundColor: palette.white,
              borderRadius: "32px",
              padding: "40px 30px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              border: "1px solid #ECEAE3"
            }}
          >
            <h3 style={{ fontSize: "26px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
              Ready to take the first step?
            </h3>
            <p style={{ fontSize: "15px", color: palette.muted, maxWidth: "520px", margin: "10px auto 24px" }}>
              Fill out our complete visit booking form and choose a morning to tour our campus.
            </p>
            <Link
              to="/about#book-visit"
              className="pill-button pill-button-coral"
            >
              <span>Go to Complete Visit Form</span>
              <ArrowRight size={16} color={palette.ink} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

