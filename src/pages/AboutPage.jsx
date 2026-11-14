import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendFormEmail } from "../data/school";
import {
  ArrowRight,
  HeartIcon,
  LeafIcon,
  SparklesIcon,
  SunnyIcon,
  SchoolIcon
} from "../components/Icons";

const palette = {
  paper: "#FDFCF8",
  ink: "#292524",
  muted: "#78716C",
  coral: "#FFB7B2",
  coralDark: "#9C514E",
  blush: "#FFE4E1",
  sage: "#E8EFE8",
  lavender: "#EFEDF4",
  sunshine: "#F8D97A",
  sky: "#CFE8F3",
  line: "#E7E5E4",
  white: "#FFFFFF",
};

export default function AboutPage() {
  const location = useLocation();

  // Scroll to hash if URL contains #book-visit
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 86;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  // Complete Visit Booking Form State
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "4",
    program: "seedlings",
    parentName: "",
    email: "",
    phone: "",
    visitDate: "",
    sessionTime: "morning",
    referral: "word-of-mouth",
    notes: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.childName.trim() || !formData.parentName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError("Please fill out all required fields marked with *.");
      return;
    }

    setSubmitting(true);
    await sendFormEmail(`Campus Visit Booking - ${formData.parentName} (${formData.childName})`, {
      "Parent Name": formData.parentName,
      "Child Name": formData.childName,
      "Child Age": formData.childAge,
      "Program Wing": formData.program,
      "Email": formData.email,
      "Phone": formData.phone,
      "Preferred Visit Date": formData.visitDate || "Flexible",
      "Preferred Session": formData.sessionTime === "morning" ? "Morning Open Studio (9:30 AM - 11:30 AM)" : "Afternoon Discovery (1:30 PM - 3:30 PM)",
      "Referral Source": formData.referral,
      "Special Notes": formData.notes || "None provided"
    });
    setSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: palette.paper, minHeight: "100vh", paddingTop: "110px", paddingBottom: "80px" }}>
      {/* 1. HERO BANNER */}
      <section style={{ padding: "60px 0 70px", position: "relative", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "860px", position: "relative", zIndex: 10 }}>
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
              Our Story & Ethos
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
            Where childhood is <br />
            <span className="script-hero">cherished.</span>
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
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            DPS JUNIOR PUBLIC SCHOOL was founded on a simple, enduring conviction: childhood is not a race to rush through, but an adventure to live with wide-eyed curiosity, dirty hands, and abundant joy.
          </motion.p>
        </div>
      </section>

      {/* 2. THREE GUIDING PILLARS */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px"
            }}
          >
            {[
              {
                number: "01",
                title: "Rhythm Over Rush",
                desc: "We prioritize deep focus and reflective inquiry. Children are never rushed from one task to the next; they are given the time to linger, inspect, and truly master their questions.",
                icon: SunnyIcon,
                bg: palette.blush,
                accent: palette.coralDark
              },
              {
                number: "02",
                title: "Nature as Co-Teacher",
                desc: "Our woodlands, mud kitchens, and botany beds are daily classrooms. In all seasons, learners connect directly with living ecosystems, developing resilience and profound wonder.",
                icon: LeafIcon,
                bg: palette.sage,
                accent: "#5F7B67"
              },
              {
                number: "03",
                title: "Known by Name & Heart",
                desc: "With small groups of only 10 learners per mentor, every little individual is observed with devotion. Their unique spark, quirks, and passions shape the trajectory of each day.",
                icon: HeartIcon,
                bg: palette.lavender,
                accent: "#776C9B"
              }
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <span style={{ fontFamily: "var(--font-script)", fontSize: "36px", color: pillar.accent }}>
                        {pillar.number}
                      </span>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          backgroundColor: pillar.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Icon size={22} color={pillar.accent} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "24px", color: palette.muted, marginTop: "12px" }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HEAD OF SCHOOL MESSAGE */}
      <section style={{ padding: "80px 0", backgroundColor: "#F7F4EE" }}>
        <div className="container" style={{ maxWidth: "1060px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "50px",
              alignItems: "center"
            }}
          >
            {/* Portrait Frame */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  height: "420px",
                  borderRadius: "40px",
                  overflow: "hidden",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
                  backgroundColor: palette.sage
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Arvind S. Sharma, Head of School"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Tape sticker effect */}
              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  bottom: "-15px",
                  backgroundColor: "rgba(253, 252, 248, 0.96)",
                  backdropFilter: "blur(8px)",
                  padding: "14px 22px",
                  borderRadius: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                }}
              >
                <div style={{ fontFamily: "var(--font-script)", fontSize: "24px", color: palette.ink, lineHeight: 1 }}>
                  Dr. Arvind S. Sharma
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.1px", color: palette.muted, marginTop: "4px" }}>
                  HEAD OF SCHOOL & PEDAGOGY
                </div>
              </div>
            </div>

            {/* Note Quote */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
                A NOTE FROM OUR HEAD OF SCHOOL
              </div>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 500,
                  lineHeight: 1.18,
                  letterSpacing: "-1px",
                  color: palette.ink,
                  marginTop: "14px"
                }}
              >
                "We don't teach to tests; <br />
                we teach to <span className="script-heading">spark lifelong joy."</span>
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "27px", color: palette.muted, marginTop: "18px" }}>
                Welcome to DPS JUNIOR PUBLIC SCHOOL. When families step onto our campus, they often tell us they feel an immediate sense of calm and breathing room.
                That feeling is deliberate.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "27px", color: palette.muted, marginTop: "14px" }}>
                Our classrooms are filled with natural sunlight, tactile building blocks, paints, open-ended books, and botanical samples. Here, children learn math through weighing seeds, science through pond-dipping, and emotional courage through collaborative storytelling.
              </p>
              <div style={{ marginTop: "24px" }}>
                <a
                  href="#book-visit"
                  className="pill-button pill-button-coral"
                  style={{ display: "inline-flex" }}
                >
                  <span>Schedule a personal walk with the Head of School</span>
                  <ArrowRight size={16} color={palette.ink} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE COMPLETE VISIT BOOKING FORM (CRITICAL REQUIREMENT) */}
      <section
        id="book-visit"
        style={{
          padding: "110px 0 90px",
          position: "relative"
        }}
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "20px",
                backgroundColor: palette.ink,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
              }}
            >
              <SchoolIcon size={26} color={palette.white} />
            </div>

            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
              COME SAY HELLO
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 4.5vw, 54px)",
                fontWeight: 500,
                letterSpacing: "-1.5px",
                color: palette.ink,
                marginTop: "12px",
                lineHeight: 1.15
              }}
            >
              Book a Visit & <span className="script-hero">Campus Tour.</span>
            </h2>

            <p style={{ fontSize: "16px", lineHeight: "26px", color: palette.muted, maxWidth: "600px", margin: "16px auto 0" }}>
              Please complete this visit reservation form. Our admissions coordinator will confirm your preferred morning within 24 hours and prepare a personalized tour for your family.
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              backgroundColor: palette.white,
              borderRadius: "36px",
              padding: "44px 36px",
              border: "1px solid #E7E5E4",
              boxShadow: "0 12px 38px rgba(0,0,0,0.06)"
            }}
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 20px" }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: palette.sage,
                    color: "#5F7B67",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px"
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5F7B67" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "28px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
                  Visit Reserved! We can't wait to meet you.
                </h3>
                <p style={{ fontSize: "16px", color: palette.muted, marginTop: "12px", maxWidth: "520px", margin: "12px auto 0", lineHeight: "26px" }}>
                  Thank you, <strong>{formData.parentName}</strong>. We have received your tour request for <strong>{formData.childName}</strong>.
                  A confirmation email and visitor guide have been sent to <strong>{formData.email}</strong>.
                </p>
                <div style={{ marginTop: "32px" }}>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        childName: "",
                        childAge: "4",
                        program: "seedlings",
                        parentName: "",
                        email: "",
                        phone: "",
                        visitDate: "",
                        sessionTime: "morning",
                        referral: "word-of-mouth",
                        notes: ""
                      });
                    }}
                    className="pill-button pill-button-white"
                  >
                    <span>Book another tour date</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                {formError && (
                  <div
                    style={{
                      backgroundColor: palette.blush,
                      color: palette.coralDark,
                      padding: "12px 18px",
                      borderRadius: "14px",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "24px"
                    }}
                  >
                    {formError}
                  </div>
                )}

                {/* Section A: Child Info */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.2px", color: palette.coralDark, textTransform: "uppercase", marginBottom: "14px" }}>
                    1. Little Learner Information
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Child's Full Name *
                      </label>
                      <input
                        type="text"
                        name="childName"
                        required
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="e.g. Maya Sharma"
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Age of Child / Class
                      </label>
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      >
                        <option value="playgroup">Age 2+ (Playgroup)</option>
                        <option value="nursery">Age 3+ (Nursery)</option>
                        <option value="lkg">Age 4+ (LKG / Lower KG)</option>
                        <option value="ukg">Age 5+ (UKG / Upper KG)</option>
                        <option value="class-1">Age 6+ (Class I / Grade 1)</option>
                        <option value="class-2">Age 7+ (Class II / Grade 2)</option>
                        <option value="class-3">Age 8+ (Class III / Grade 3)</option>
                        <option value="class-4">Age 9+ (Class IV / Grade 4)</option>
                        <option value="class-5">Age 10+ (Class V / Grade 5)</option>
                        <option value="class-6">Age 11+ (Class VI / Grade 6)</option>
                        <option value="class-7">Age 12+ (Class VII / Grade 7)</option>
                        <option value="class-8">Age 13–14 (Class VIII / Grade 8)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Educational Wing (Play to 8)
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      >
                        <option value="foundational">Foundational Wing (Playgroup to UKG)</option>
                        <option value="primary">Primary Wing (Classes I to V)</option>
                        <option value="middle">Middle Wing (Classes VI to VIII)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: palette.line, margin: "24px 0" }} />

                {/* Section B: Parent Info */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.2px", color: palette.coralDark, textTransform: "uppercase", marginBottom: "14px" }}>
                    2. Parent / Guardian Contact Details
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Sharma"
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah@example.com"
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 (555) 019-2834"
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: palette.line, margin: "24px 0" }} />

                {/* Section C: Visit Preferences */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.2px", color: palette.coralDark, textTransform: "uppercase", marginBottom: "14px" }}>
                    3. Tour Day & Timing
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Preferred Tour Date *
                      </label>
                      <input
                        type="date"
                        name="visitDate"
                        required
                        value={formData.visitDate}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        Preferred Session
                      </label>
                      <select
                        name="sessionTime"
                        value={formData.sessionTime}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      >
                        <option value="morning">Morning Open Studio (9:30 AM – 11:30 AM)</option>
                        <option value="afternoon">Afternoon Discovery (1:30 PM – 3:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                        How did you hear about us?
                      </label>
                      <select
                        name="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: "1px solid #E7E5E4",
                          backgroundColor: "#FAFAF9",
                          fontSize: "14px",
                          color: palette.ink,
                          outline: "none"
                        }}
                      >
                        <option value="word-of-mouth">Word of mouth / Family recommendation</option>
                        <option value="social">Instagram / Social media</option>
                        <option value="google">Search engine (Google)</option>
                        <option value="event">Local community event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section D: Notes */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                    Anything special about your child you'd like us to know? (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Loves building with wooden blocks, outdoors bug exploration, shy in new groups..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      border: "1px solid #E7E5E4",
                      backgroundColor: "#FAFAF9",
                      fontSize: "14px",
                      color: palette.ink,
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="pill-button pill-button-coral"
                    style={{ minWidth: "260px", opacity: submitting ? 0.7 : 1 }}
                  >
                    <span>{submitting ? "Confirming..." : "Confirm My Family's Visit"}</span>
                    <ArrowRight size={17} color={palette.ink} />
                  </button>
                  <div style={{ fontSize: "12px", color: "#A8A29E", marginTop: "12px" }}>
                    Tours are complimentary. No application commitment required.
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
