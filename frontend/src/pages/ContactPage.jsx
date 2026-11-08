import React, { useState } from "react";
import toast from "react-hot-toast";
import { schoolData } from "../data/school";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gradeSeeking: "Grade 1",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields.");
      return;
    }
    toast.success("Thank you! Your inquiry has been dispatched to Admissions.");
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header */}
      <section style={{ backgroundColor: "var(--surface-alt)", padding: "4rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "750px" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
            Reach Out
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1rem" }}>
            Get in Touch with St. Xavier's
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            We look forward to answering your questions regarding admissions, academics, and campus visits.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "3.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
          {/* Contact Details Column */}
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.5rem" }}>
              Administrative Office
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>📍</div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>Campus Address</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {schoolData.contact.address}
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>📞</div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>Telephone Inquiries</h4>
                  <p style={{ fontSize: "0.95rem" }}>
                    Primary:{" "}
                    <a href={`tel:${schoolData.contact.phone}`} style={{ color: "var(--primary-light)", fontWeight: 600 }}>
                      {schoolData.contact.phone}
                    </a>
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    Direct Board:{" "}
                    <a href={`tel:${schoolData.contact.altPhone}`} style={{ color: "var(--primary-light)", fontWeight: 600 }}>
                      {schoolData.contact.altPhone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>✉️</div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>Digital Inquiries</h4>
                  <p style={{ fontSize: "0.95rem" }}>
                    General:{" "}
                    <a href={`mailto:${schoolData.contact.email}`} style={{ color: "var(--primary-light)", fontWeight: 600 }}>
                      {schoolData.contact.email}
                    </a>
                  </p>
                  <p style={{ fontSize: "0.95rem" }}>
                    Admissions:{" "}
                    <a href={`mailto:${schoolData.contact.admissionsEmail}`} style={{ color: "var(--primary-light)", fontWeight: 600 }}>
                      {schoolData.contact.admissionsEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>🕒</div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>Visiting Hours</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {schoolData.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div>
            <div className="card" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.5rem" }}>
                Admission & General Inquiry Form
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
                Fill in your details below and our counseling desk will reach out within 24 business hours.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "3rem", color: "var(--success)", marginBottom: "0.75rem" }}>✓</div>
                  <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>Inquiry Received!</h4>
                  <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
                    Our representative will connect with you via email or phone shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", gradeSeeking: "Grade 1", message: "" });
                    }}
                    className="btn btn-secondary"
                    style={{ marginTop: "1.5rem" }}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name of Parent / Guardian *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                  <div className="form-group">
                    <label className="form-label">Class Seeking Admission For</label>
                    <select
                      value={formData.gradeSeeking}
                      onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                      className="form-select"
                    >
                      <option value="Pre-Nursery">Pre-Nursery / Playgroup</option>
                      <option value="Kindergarten">Kindergarten (KG)</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2-5">Grades 2 - 5 (Primary)</option>
                      <option value="Grade 6-8">Grades 6 - 8 (Middle)</option>
                      <option value="Grade 9-10">Grades 9 - 10 (Secondary)</option>
                      <option value="Grade 11-12">Grades 11 - 12 (Senior Secondary)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Query or Message</label>
                    <textarea
                      rows={4}
                      placeholder="Provide any specific queries about transport, fee structure, syllabus..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
                    Submit Inquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1rem" }}>
            Campus Location Map
          </h3>
          <div
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <iframe
              title="School Location Map"
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

