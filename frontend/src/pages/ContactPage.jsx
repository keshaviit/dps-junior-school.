import React, { useState } from "react";
import toast from "react-hot-toast";
import { schoolData } from "../data/school";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childAgeGroup: "Early Years (Ages 2-5)",
    preferredSlot: "Morning Tour (9:30 AM)",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.phone) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    toast.success("Visit Request Confirmed! Our admissions registrar will reach out shortly.");
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: "6rem" }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: "#102f24",
          color: "#ffffff",
          padding: "5rem 0 3.5rem",
          textAlign: "center"
        }}
      >
        <div className="container" style={{ maxWidth: "780px" }}>
          <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "var(--accent)" }}>
            Admissions & Campus Visits
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.35rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1rem" }}>
            Arrange a Personal Visit
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#e2e8f0" }}>
            We would be delighted to welcome your family to our 45-acre parkland for a personalized meeting and guided tour.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3.5rem" }}>
          {/* Admissions Office Info */}
          <div>
            <span className="section-tag">
              📍 Direct Contact
            </span>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>
              Admissions & Registrar
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
              <div className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.75rem" }}>🏛</div>
                <div>
                  <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>Campus Address</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {schoolData.contact.address}
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.75rem" }}>📞</div>
                <div>
                  <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>Telephone Inquiries</h4>
                  <p style={{ fontSize: "0.95rem" }}>
                    Admissions Direct:{" "}
                    <a href={`tel:${schoolData.contact.phone}`} style={{ color: "var(--primary-light)", fontWeight: 700 }}>
                      {schoolData.contact.phone}
                    </a>
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    Main Switchboard:{" "}
                    <a href={`tel:${schoolData.contact.altPhone}`} style={{ color: "var(--primary-light)", fontWeight: 700 }}>
                      {schoolData.contact.altPhone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.75rem" }}>✉️</div>
                <div>
                  <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>Email Admissions</h4>
                  <p style={{ fontSize: "0.95rem" }}>
                    Registrar:{" "}
                    <a href={`mailto:${schoolData.contact.email}`} style={{ color: "var(--primary-light)", fontWeight: 700 }}>
                      {schoolData.contact.email}
                    </a>
                  </p>
                  <p style={{ fontSize: "0.95rem" }}>
                    General Info:{" "}
                    <a href={`mailto:${schoolData.contact.officeEmail}`} style={{ color: "var(--primary-light)", fontWeight: 700 }}>
                      {schoolData.contact.officeEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.75rem" }}>🕒</div>
                <div>
                  <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>Visiting Hours</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {schoolData.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Booking Form */}
          <div>
            <div className="card" style={{ padding: "2.75rem 2.25rem", boxShadow: "var(--shadow-lg)" }}>
              <h3 style={{ fontSize: "1.75rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                Book Your Personal Tour
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
                Select your preferred tour slot and our registrar will confirm your personalized appointment.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", color: "var(--success)", marginBottom: "1rem" }}>✓</div>
                  <h4 style={{ fontSize: "1.4rem", color: "var(--primary)", marginBottom: "0.5rem" }}>Visit Request Received!</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Thank you, {formData.parentName}. Our admissions team will reach out via {formData.email} to confirm your itinerary and directions.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ parentName: "", email: "", phone: "", childAgeGroup: "Early Years (Ages 2-5)", preferredSlot: "Morning Tour (9:30 AM)", message: "" });
                    }}
                    className="btn btn-secondary"
                    style={{ marginTop: "2rem" }}
                  >
                    Book Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Child's Entry Stage</label>
                      <select
                        value={formData.childAgeGroup}
                        onChange={(e) => setFormData({ ...formData, childAgeGroup: e.target.value })}
                        className="form-select"
                      >
                        <option value="Early Years (Ages 2-5)">Early Years & Nursery (Ages 2–5)</option>
                        <option value="Pre-Prep (Ages 5-8)">Pre-Prep (Grades 1–3 / Ages 5–8)</option>
                        <option value="Junior Prep (Ages 8-13)">Junior Prep (Grades 4–8 / Ages 8–13)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Visiting Slot</label>
                      <select
                        value={formData.preferredSlot}
                        onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                        className="form-select"
                      >
                        <option value="Morning Tour (9:30 AM)">Morning Tour (9:30 AM)</option>
                        <option value="Midday Session (11:30 AM)">Midday Session (11:30 AM)</option>
                        <option value="Afternoon Tour (2:00 PM)">Afternoon Tour (2:00 PM)</option>
                        <option value="Saturday Open Slot">Saturday Open Slot</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Questions or Specific Interests</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your child's passions (e.g. music, swimming, sciences, robotics)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-accent" style={{ width: "100%", padding: "0.95rem", fontSize: "1rem" }}>
                    Confirm Visit Request →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div style={{ marginTop: "5rem" }}>
          <span className="section-tag">
            🗺 Location Map
          </span>
          <h3 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Finding DPS Junior Campus
          </h3>
          <div
            style={{
              width: "100%",
              height: "440px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <iframe
              title="School Campus Location Map"
              src={schoolData.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
