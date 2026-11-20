import React, { useState } from "react";
import toast from "react-hot-toast";
import { schoolData, sendFormEmail } from "../data/school";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childAgeGroup: "Pre-Primary (Playgroup to UKG)",
    preferredSlot: "Morning Tour (9:30 AM – 11:30 AM)",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.phone) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    toast.loading("Sending inquiry...", { id: "contact-submit" });
    const sent = await sendFormEmail(`Admissions Inquiry - ${formData.parentName}`, {
      "Parent Name": formData.parentName,
      "Email": formData.email,
      "Phone": formData.phone,
      "Grade / Wing": formData.childAgeGroup,
      "Preferred Tour Slot": formData.preferredSlot,
      "Message": formData.message || "No message provided"
    });
    if (sent) {
      toast.success("Inquiry Sent! Our admissions registrar will reach out shortly.", { id: "contact-submit" });
      setSubmitted(true);
    } else {
      toast.error("The inquiry could not be sent. Please call our admissions number.", { id: "contact-submit" });
    }
  };

  return (
    <div style={{ backgroundColor: palette.paper, minHeight: "100vh", paddingTop: "110px", paddingBottom: "80px" }}>
      {/* Header Banner */}
      <section style={{ padding: "50px 0 60px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: palette.blush,
              color: palette.coralDark,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              padding: "6px 16px",
              borderRadius: "18px",
              marginBottom: "16px",
              textTransform: "uppercase"
            }}
          >
            Admissions & Campus Contacts
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 500,
              color: palette.ink,
              letterSpacing: "-1.8px",
              lineHeight: 1.1
            }}
          >
            Contact DPS Junior <span className="script-hero">School.</span>
          </h1>
          <p style={{ fontSize: "17px", color: palette.muted, marginTop: "16px", lineHeight: "28px" }}>
            We would be delighted to welcome your family to our green campus for an unhurried meeting and tour.
            Serving learners from Playgroup to Class VIII.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: "1060px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          {/* Admissions Office Info */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.6px", color: palette.coralDark, textTransform: "uppercase", marginBottom: "8px" }}>
              CAMPUS & INQUIRIES
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
              Admissions Office
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
              <div
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "24px",
                  padding: "24px",
                  border: "1px solid #ECEAE3",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start"
                }}
              >
                <div style={{ fontSize: "24px" }}>📍</div>
                <div>
                  <h4 style={{ color: palette.ink, fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>Campus Address</h4>
                  <p style={{ color: palette.muted, fontSize: "14px", lineHeight: "22px" }}>
                    {schoolData.contact.address}
                  </p>
                  <a href={schoolData.contact.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", color: palette.coralDark, fontSize: "12px", fontWeight: 600, marginTop: "6px" }}>
                    Get directions →
                  </a>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "24px",
                  padding: "24px",
                  border: "1px solid #ECEAE3",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start"
                }}
              >
                <div style={{ fontSize: "24px" }}>📞</div>
                <div>
                  <h4 style={{ color: palette.ink, fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>Telephone Inquiries</h4>
                  <p style={{ fontSize: "14px", color: palette.muted }}>
                    Admissions Direct:{" "}
                    <a href={`tel:${schoolData.contact.phone}`} style={{ color: palette.ink, fontWeight: 700 }}>
                      {schoolData.contact.phone}
                    </a>
                  </p>
                  <p style={{ fontSize: "14px", color: palette.muted, marginTop: "4px" }}>
                    Contact Number:{" "}
                    <a href={`tel:${schoolData.contact.altPhone}`} style={{ color: palette.ink, fontWeight: 700 }}>
                      {schoolData.contact.altPhone}
                    </a>
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "24px",
                  padding: "24px",
                  border: "1px solid #ECEAE3",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start"
                }}
              >
                <div style={{ fontSize: "24px" }}>✉️</div>
                <div>
                  <h4 style={{ color: palette.ink, fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>Email Inquiries</h4>
                  <p style={{ fontSize: "14px", color: palette.muted }}>
                    Official / Admissions:{" "}
                    <a href={`mailto:${schoolData.contact.email}`} style={{ color: palette.coralDark, fontWeight: 700 }}>
                      {schoolData.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: palette.white,
                  borderRadius: "24px",
                  padding: "24px",
                  border: "1px solid #ECEAE3",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start"
                }}
              >
                <div style={{ fontSize: "24px" }}>🕒</div>
                <div>
                  <h4 style={{ color: palette.ink, fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>Office Visiting Hours</h4>
                  <p style={{ color: palette.muted, fontSize: "14px", lineHeight: "22px" }}>
                    {schoolData.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div>
            <div
              style={{
                backgroundColor: palette.white,
                borderRadius: "32px",
                padding: "36px 30px",
                border: "1px solid #E7E5E4",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px", marginBottom: "6px" }}>
                Send a Quick Message
              </h3>
              <p style={{ fontSize: "14px", color: palette.muted, marginBottom: "24px" }}>
                Leave your details below and our admissions counsellor will connect with you.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 10px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>✨</div>
                  <h4 style={{ fontSize: "20px", fontWeight: 600, color: palette.ink }}>Message Received!</h4>
                  <p style={{ fontSize: "14px", color: palette.muted, marginTop: "8px" }}>
                    Thank you, {formData.parentName}. We will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                      Parent's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Vikram Batra"
                      style={{
                        width: "100%",
                        height: "46px",
                        padding: "0 16px",
                        borderRadius: "14px",
                        border: "1px solid #E7E5E4",
                        backgroundColor: "#FAFAF9",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      style={{
                        width: "100%",
                        height: "46px",
                        padding: "0 16px",
                        borderRadius: "14px",
                        border: "1px solid #E7E5E4",
                        backgroundColor: "#FAFAF9",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9359159934"
                      style={{
                        width: "100%",
                        height: "46px",
                        padding: "0 16px",
                        borderRadius: "14px",
                        border: "1px solid #E7E5E4",
                        backgroundColor: "#FAFAF9",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                      Grade / Wing Applying For
                    </label>
                    <select
                      value={formData.childAgeGroup}
                      onChange={(e) => setFormData({ ...formData, childAgeGroup: e.target.value })}
                      style={{
                        width: "100%",
                        height: "46px",
                        padding: "0 16px",
                        borderRadius: "14px",
                        border: "1px solid #E7E5E4",
                        backgroundColor: "#FAFAF9",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    >
                      <option>Pre-Primary: Playgroup, Nursery, LKG, UKG (Ages 2–5)</option>
                      <option>Primary Wing: Class 1 to Class 5 (Ages 6–10)</option>
                      <option>Middle Wing: Class 6 to Class 8 (Ages 11–14)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.ink, marginBottom: "6px" }}>
                      Your Message / Questions
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask about admissions, transport routes, curriculum..."
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "14px",
                        border: "1px solid #E7E5E4",
                        backgroundColor: "#FAFAF9",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="pill-button pill-button-coral"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Location Map Section */}
        <div style={{ marginTop: "60px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.6px", color: palette.coralDark, textTransform: "uppercase", marginBottom: "8px" }}>
            CAMPUS LOCATION
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px", marginBottom: "16px" }}>
            Finding DPS Junior Campus
          </h3>
          <a href={schoolData.contact.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", color: palette.coralDark, fontWeight: 600, marginBottom: "16px" }}>
            Open directions in Google Maps →
          </a>
          <div
            style={{
              width: "100%",
              height: "420px",
              position: "relative",
              borderRadius: "32px",
              overflow: "hidden",
              border: "1px solid #E7E5E4",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
            }}
          >
            <iframe
              title="DPS Junior School Campus Location Map"
              src={schoolData.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              aria-label="DPS Junior Public School campus location"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none"
              }}
            >
              <span style={{ background: "#fff", color: "#174EA6", fontWeight: 700, fontSize: "13px", padding: "7px 12px", borderRadius: "999px", boxShadow: "0 2px 10px rgba(0,0,0,0.18)", marginBottom: "5px", whiteSpace: "nowrap" }}>
                DPS Junior Public School
              </span>
              <span style={{ width: "38px", height: "38px", display: "grid", placeItems: "center", background: "#1A73E8", color: "#fff", border: "3px solid #fff", borderRadius: "50%", boxShadow: "0 3px 12px rgba(0,0,0,0.3)", fontSize: "22px", fontWeight: 800 }}>
                ✓
              </span>
              <span style={{ width: "10px", height: "10px", background: "#1A73E8", transform: "rotate(45deg)", marginTop: "-3px" }} />
            </div>
            <a
              href={schoolData.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open directions to DPS Junior Public School in Google Maps"
              style={{ position: "absolute", inset: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
