import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ShieldIcon,
  SchoolIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  AlertCircleIcon,
  InfoIcon,
  CloseIcon,
  ArrowRight
} from "../components/Icons";

const colors = {
  bg: "#F6F5F1",
  surface: "#FFFFFF",
  textPrimary: "#252321",
  textMuted: "#77716C",
  darkTeal: "#264E52",
  darkTealHover: "#1E3E41",
  coralAccent: "#D98984",
  softCoral: "#F7E7E4",
  greenSuccess: "#52745D",
  greenSuccessBg: "#EBF2ED",
  border: "#E6E2DD",
  borderFocus: "#264E52",
  error: "#C0524C",
  errorBg: "#FDF0EF"
};

export default function LoginPage() {
  const [mode, setMode] = useState("signin"); // "signin" | "create"
  const [selectedRole, setSelectedRole] = useState("admin"); // "admin" | "teacher"

  // Sign in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Create account state
  const [fullName, setFullName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Status & validation
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Validate email pattern
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Handle Sign In submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage("Please enter your institutional email address.");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid institutional email address (e.g. name@dpsjunior.edu.in).");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const fallbackRole = selectedRole === "admin" ? "ADMIN" : "TEACHER";
      const user = await login(cleanEmail, password, fallbackRole);
      setSuccessMessage("Authentication verified. Redirecting to workspace...");

      setTimeout(() => {
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/teacher");
        }
      }, 500);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Invalid institutional credentials. Please verify your email and password.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Create Account / Request Access submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const cleanName = fullName.trim();
    const cleanEmail = createEmail.trim();

    if (!cleanName || cleanName.length < 3) {
      setErrorMessage("Please enter your full name (minimum 3 characters).");
      return;
    }
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid institutional email address.");
      return;
    }
    if (!createPassword || createPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const targetRole = selectedRole === "admin" ? "ADMIN" : "TEACHER";
      await signup({
        name: cleanName,
        email: cleanEmail,
        password: createPassword,
        role: targetRole
      });

      setRequestSubmitted(true);
      setSuccessMessage(
        "Account access request submitted. Your institutional profile is registered and pending administrator approval."
      );
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Unable to submit request. An account with this email may already exist.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 20px 24px",
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
        color: colors.textPrimary,
        boxSizing: "border-box"
      }}
    >
      {/* Top Bar / Navigation Link */}
      <header
        style={{
          maxWidth: "1040px",
          width: "100%",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: colors.textMuted,
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "14px",
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
            transition: "all 0.15s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.textPrimary;
            e.currentTarget.style.borderColor = colors.darkTeal;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textMuted;
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
            <ArrowRight size={14} color="currentColor" />
          </span>
          <span>Back to DPS Junior Public Website</span>
        </Link>

        <div style={{ fontSize: "13px", color: colors.textMuted, fontWeight: 500 }}>
          Institutional Access
        </div>
      </header>

      {/* Main Centered Two-Panel Card */}
      <main
        style={{
          maxWidth: "1040px",
          width: "100%",
          margin: "0 auto",
          backgroundColor: colors.surface,
          borderRadius: "28px",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 12px 36px rgba(37, 35, 33, 0.05)",
          overflow: "hidden"
        }}
      >
        <div className="portal-grid">
          {/* Left Branding Panel (Desktop) */}
          <aside
            className="portal-left-panel"
            style={{
              backgroundColor: colors.darkTeal,
              color: "#FFFFFF",
              padding: "48px 40px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden"
            }}
          >
            {/* Subtle Decorative Background Circles */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                pointerEvents: "none"
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-80px",
                left: "-80px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                pointerEvents: "none"
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "40%",
                right: "15%",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                pointerEvents: "none"
              }}
            />

            {/* Brand Header */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "1px",
                    color: "#FFFFFF"
                  }}
                >
                  DPS
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      color: "#FFFFFF"
                    }}
                  >
                    DPS JUNIOR
                  </h2>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "1.2px",
                      color: "rgba(255, 255, 255, 0.72)"
                    }}
                  >
                    PUBLIC SCHOOL · PLAY TO VIII
                  </p>
                </div>
              </div>

              {/* Headline & Description */}
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 600,
                  lineHeight: "1.25",
                  margin: "0 0 16px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.3px"
                }}
              >
                School management, made clear.
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 36px"
                }}
              >
                A unified institutional platform for daily attendance, academic progress, classroom administration,
                and faculty records.
              </p>

              {/* Three Institutional Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "CBSE-aligned academic workflows",
                  "Role-based access",
                  "Secure institutional accounts"
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <CheckIcon size={14} color="#FFFFFF" strokeWidth={2.4} />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255, 255, 255, 0.92)" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Support Link */}
            <div style={{ position: "relative", zIndex: 1, marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(255, 255, 255, 0.75)" }}>
                <MailIcon size={16} color="rgba(255, 255, 255, 0.8)" />
                <span>Institutional support:</span>
                <a
                  href="mailto:support@dpsjunior.edu.in"
                  style={{ color: "#FFFFFF", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  support@dpsjunior.edu.in
                </a>
              </div>
            </div>
          </aside>

          {/* Right Authentication Panel */}
          <section
            style={{
              padding: "48px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
            className="portal-right-panel"
          >
            {/* Mobile Compact Header (Hidden on Desktop) */}
            <div className="portal-mobile-brand" style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: colors.darkTeal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#FFFFFF"
                  }}
                >
                  DPS
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: colors.textPrimary }}>
                    DPS JUNIOR PUBLIC SCHOOL
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "1px", color: colors.textMuted }}>
                    PLAY TO VIII · CBSE STANDARDS
                  </div>
                </div>
              </div>
            </div>

            {/* Secure Access Label & Heading */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  marginBottom: "6px"
                }}
              >
                Secure access
              </div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: colors.textPrimary,
                  letterSpacing: "-0.3px"
                }}
              >
                {mode === "signin" ? "Welcome back" : "Request institutional access"}
              </h2>
              <p style={{ margin: 0, fontSize: "14px", color: colors.textMuted, lineHeight: "20px" }}>
                {mode === "signin"
                  ? "Sign in to access your administrative dashboard or classroom management workspace."
                  : "Submit your details to register an institutional faculty or administrative account."}
              </p>
            </div>

            {/* Mode Switch Tabs: Sign in | Create account */}
            <div
              role="tablist"
              aria-label="Authentication modes"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                backgroundColor: colors.bg,
                padding: "4px",
                borderRadius: "14px",
                marginBottom: "28px",
                border: `1px solid ${colors.border}`
              }}
            >
              <button
                role="tab"
                aria-selected={mode === "signin"}
                onClick={() => {
                  setMode("signin");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: mode === "signin" ? colors.surface : "transparent",
                  color: mode === "signin" ? colors.textPrimary : colors.textMuted,
                  fontWeight: mode === "signin" ? 600 : 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: mode === "signin" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                Sign in
              </button>
              <button
                role="tab"
                aria-selected={mode === "create"}
                onClick={() => {
                  setMode("create");
                  setErrorMessage("");
                  setSuccessMessage("");
                  setRequestSubmitted(false);
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: mode === "create" ? colors.surface : "transparent",
                  color: mode === "create" ? colors.textPrimary : colors.textMuted,
                  fontWeight: mode === "create" ? 600 : 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: mode === "create" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                Create account
              </button>
            </div>

            {/* Role Selection */}
            <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>
              <legend
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.textPrimary,
                  marginBottom: "10px",
                  display: "block"
                }}
              >
                Select your institutional role:
              </legend>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px"
                }}
              >
                {/* Administrator Role Option */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: `1.5px solid ${selectedRole === "admin" ? colors.coralAccent : colors.border}`,
                    backgroundColor: selectedRole === "admin" ? colors.softCoral : colors.surface,
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <input
                    type="radio"
                    name="institutionalRole"
                    value="admin"
                    checked={selectedRole === "admin"}
                    onChange={() => setSelectedRole("admin")}
                    style={{ marginTop: "3px", accentColor: colors.coralAccent }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <ShieldIcon
                        size={17}
                        color={selectedRole === "admin" ? colors.coralAccent : colors.textMuted}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: colors.textPrimary
                        }}
                      >
                        Administrator
                      </span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: colors.textMuted, lineHeight: "16px" }}>
                      School operations and reports
                    </p>
                  </div>
                </label>

                {/* Teacher / Faculty Role Option */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: `1.5px solid ${selectedRole === "teacher" ? colors.coralAccent : colors.border}`,
                    backgroundColor: selectedRole === "teacher" ? colors.softCoral : colors.surface,
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <input
                    type="radio"
                    name="institutionalRole"
                    value="teacher"
                    checked={selectedRole === "teacher"}
                    onChange={() => setSelectedRole("teacher")}
                    style={{ marginTop: "3px", accentColor: colors.coralAccent }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <SchoolIcon
                        size={17}
                        color={selectedRole === "teacher" ? colors.coralAccent : colors.textMuted}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: colors.textPrimary
                        }}
                      >
                        Teacher / Faculty
                      </span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: colors.textMuted, lineHeight: "16px" }}>
                      Classes, attendance, and academics
                    </p>
                  </div>
                </label>
              </div>
            </fieldset>

            {/* Error Message Feedback */}
            {errorMessage && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  backgroundColor: colors.errorBg,
                  border: `1px solid rgba(192, 82, 76, 0.25)`,
                  color: colors.error,
                  fontSize: "13px",
                  lineHeight: "18px",
                  marginBottom: "20px"
                }}
              >
                <div style={{ marginTop: "1px", flexShrink: 0 }}>
                  <AlertCircleIcon size={16} color={colors.error} />
                </div>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message Feedback */}
            {successMessage && (
              <div
                role="status"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  backgroundColor: colors.greenSuccessBg,
                  border: `1px solid rgba(82, 116, 93, 0.25)`,
                  color: colors.greenSuccess,
                  fontSize: "13px",
                  lineHeight: "18px",
                  marginBottom: "20px"
                }}
              >
                <div style={{ marginTop: "1px", flexShrink: 0 }}>
                  <CheckIcon size={16} color={colors.greenSuccess} strokeWidth={2.4} />
                </div>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Mode 1: Sign-in Form */}
            {mode === "signin" ? (
              <form onSubmit={handleSignIn} noValidate>
                {/* Email Address */}
                <div style={{ marginBottom: "18px" }}>
                  <label
                    htmlFor="signin-email"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.textPrimary,
                      marginBottom: "6px"
                    }}
                  >
                    Institutional email address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: colors.textMuted,
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none"
                      }}
                    >
                      <MailIcon size={16} color="currentColor" />
                    </div>
                    <input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      placeholder="e.g. admin@school.com or teacher@dpsjunior.edu.in"
                      autoComplete="username"
                      required
                      className="portal-input"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        height: "46px",
                        padding: "0 16px 0 42px",
                        borderRadius: "14px",
                        border: `1px solid ${colors.border}`,
                        fontSize: "14px",
                        color: colors.textPrimary,
                        backgroundColor: colors.surface,
                        outline: "none",
                        transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                      }}
                    />
                  </div>
                </div>

                {/* Password Input with Show/Hide Toggle */}
                <div style={{ marginBottom: "18px" }}>
                  <label
                    htmlFor="signin-password"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.textPrimary,
                      marginBottom: "6px"
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: colors.textMuted,
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none"
                      }}
                    >
                      <LockIcon size={16} color="currentColor" />
                    </div>
                    <input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      placeholder="Enter your institutional password"
                      autoComplete="current-password"
                      required
                      className="portal-input"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        height: "46px",
                        padding: "0 46px 0 42px",
                        borderRadius: "14px",
                        border: `1px solid ${colors.border}`,
                        fontSize: "14px",
                        color: colors.textPrimary,
                        backgroundColor: colors.surface,
                        outline: "none",
                        transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: colors.textMuted,
                        cursor: "pointer",
                        padding: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                    fontSize: "13px"
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      color: colors.textMuted
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: colors.darkTeal }}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: colors.darkTeal,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px"
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Primary Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="portal-primary-btn"
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "14px",
                    backgroundColor: colors.darkTeal,
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 600,
                    border: "none",
                    cursor: loading ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(38, 78, 82, 0.2)",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = colors.darkTealHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = colors.darkTeal;
                  }}
                >
                  {loading ? (
                    <span>Verifying credentials...</span>
                  ) : (
                    <>
                      <span>
                        {selectedRole === "admin"
                          ? "Sign in as Administrator"
                          : "Sign in as Teacher / Faculty"}
                      </span>
                      <ArrowRight size={16} color="#FFFFFF" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Mode 2: Create-Account / Access Request Form */
              <form onSubmit={handleCreateAccount} noValidate>
                {requestSubmitted ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "24px 16px",
                      backgroundColor: colors.bg,
                      borderRadius: "18px",
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: colors.greenSuccessBg,
                        color: colors.greenSuccess,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px"
                      }}
                    >
                      <CheckIcon size={24} color={colors.greenSuccess} strokeWidth={2.4} />
                    </div>
                    <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 600, color: colors.textPrimary }}>
                      Access Request Registered
                    </h3>
                    <p style={{ margin: "0 0 16px", fontSize: "14px", color: colors.textMuted, lineHeight: "21px" }}>
                      Your request for <strong>{fullName}</strong> ({createEmail}) as{" "}
                      <strong>{selectedRole === "admin" ? "Administrator" : "Teacher / Faculty"}</strong> has been recorded.
                      School IT administration will review your credential verification.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRequestSubmitted(false);
                        setMode("signin");
                      }}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "12px",
                        backgroundColor: colors.darkTeal,
                        color: "#FFFFFF",
                        border: "none",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      Return to Sign in
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Full Name */}
                    <div style={{ marginBottom: "18px" }}>
                      <label
                        htmlFor="create-name"
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: colors.textPrimary,
                          marginBottom: "6px"
                        }}
                      >
                        Full name
                      </label>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            left: "14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: colors.textMuted,
                            display: "flex",
                            alignItems: "center",
                            pointerEvents: "none"
                          }}
                        >
                          <UserIcon size={16} color="currentColor" />
                        </div>
                        <input
                          id="create-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          placeholder="e.g. Dr. Kavita Sharma"
                          required
                          className="portal-input"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: "46px",
                            padding: "0 16px 0 42px",
                            borderRadius: "14px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "14px",
                            color: colors.textPrimary,
                            backgroundColor: colors.surface,
                            outline: "none",
                            transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                          }}
                        />
                      </div>
                    </div>

                    {/* Institutional Email Address */}
                    <div style={{ marginBottom: "18px" }}>
                      <label
                        htmlFor="create-email"
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: colors.textPrimary,
                          marginBottom: "6px"
                        }}
                      >
                        Institutional email address
                      </label>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            left: "14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: colors.textMuted,
                            display: "flex",
                            alignItems: "center",
                            pointerEvents: "none"
                          }}
                        >
                          <MailIcon size={16} color="currentColor" />
                        </div>
                        <input
                          id="create-email"
                          type="email"
                          value={createEmail}
                          onChange={(e) => {
                            setCreateEmail(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          placeholder="name@dpsjunior.edu.in"
                          required
                          className="portal-input"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: "46px",
                            padding: "0 16px 0 42px",
                            borderRadius: "14px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "14px",
                            color: colors.textPrimary,
                            backgroundColor: colors.surface,
                            outline: "none",
                            transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                          }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "20px" }}>
                      <label
                        htmlFor="create-password"
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: colors.textPrimary,
                          marginBottom: "6px"
                        }}
                      >
                        Set password (at least 6 characters)
                      </label>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            left: "14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: colors.textMuted,
                            display: "flex",
                            alignItems: "center",
                            pointerEvents: "none"
                          }}
                        >
                          <LockIcon size={16} color="currentColor" />
                        </div>
                        <input
                          id="create-password"
                          type={showCreatePassword ? "text" : "password"}
                          value={createPassword}
                          onChange={(e) => {
                            setCreatePassword(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          placeholder="Choose a strong password"
                          required
                          className="portal-input"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: "46px",
                            padding: "0 46px 0 42px",
                            borderRadius: "14px",
                            border: `1px solid ${colors.border}`,
                            fontSize: "14px",
                            color: colors.textPrimary,
                            backgroundColor: colors.surface,
                            outline: "none",
                            transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCreatePassword(!showCreatePassword)}
                          aria-label={showCreatePassword ? "Hide password" : "Show password"}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: colors.textMuted,
                            cursor: "pointer",
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {showCreatePassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Institutional Approval Notice */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        backgroundColor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        marginBottom: "24px",
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: colors.textMuted
                      }}
                    >
                      <div style={{ marginTop: "1px", flexShrink: 0 }}>
                        <InfoIcon size={16} color={colors.darkTeal} />
                      </div>
                      <span>
                        <strong>Institutional Security Notice:</strong> All new faculty and administrative accounts
                        require administrator review and approval before activation.
                      </span>
                    </div>

                    {/* Request Access Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="portal-primary-btn"
                      style={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "14px",
                        backgroundColor: colors.darkTeal,
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        border: "none",
                        cursor: loading ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(38, 78, 82, 0.2)",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = colors.darkTealHover;
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = colors.darkTeal;
                      }}
                    >
                      {loading ? (
                        <span>Submitting request...</span>
                      ) : (
                        <>
                          <span>Request account access</span>
                          <ArrowRight size={16} color="#FFFFFF" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            )}
          </section>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer
        style={{
          maxWidth: "1040px",
          width: "100%",
          margin: "32px auto 0",
          textAlign: "center",
          fontSize: "13px",
          color: colors.textMuted
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "8px" }}>
          <button
            type="button"
            onClick={() => alert("DPS Junior Public School Privacy Policy: Institutional data is strictly governed according to CBSE and NEP records confidentiality protocols.")}
            style={{ background: "none", border: "none", color: colors.textMuted, cursor: "pointer", fontSize: "13px" }}
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => alert("DPS Junior Public School Terms: Authorized institutional use only. Unauthorized attempts to access student or faculty records are logged.")}
            style={{ background: "none", border: "none", color: colors.textMuted, cursor: "pointer", fontSize: "13px" }}
          >
            Terms of Service
          </button>
          <span>·</span>
          <a
            href="mailto:support@dpsjunior.edu.in"
            style={{ color: colors.textMuted, textDecoration: "none" }}
          >
            Support
          </a>
          <span>·</span>
          <Link
            to="/"
            style={{ color: colors.darkTeal, textDecoration: "none", fontWeight: 600 }}
          >
            Return to Public Website
          </Link>
        </div>
        <div>
          © 2026 DPS JUNIOR PUBLIC SCHOOL. All rights reserved. Playgroup to Class VIII.
        </div>
      </footer>

      {/* Forgot Password Modal Dialog */}
      {forgotPasswordOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-password-title"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(37, 35, 33, 0.45)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000
          }}
          onClick={() => setForgotPasswordOpen(false)}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: "20px",
              maxWidth: "460px",
              width: "100%",
              padding: "28px",
              border: `1px solid ${colors.border}`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setForgotPasswordOpen(false)}
              aria-label="Close dialog"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                color: colors.textMuted,
                cursor: "pointer",
                padding: "4px"
              }}
            >
              <CloseIcon size={20} />
            </button>

            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: colors.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.darkTeal,
                marginBottom: "16px"
              }}
            >
              <LockIcon size={20} color={colors.darkTeal} />
            </div>

            <h3
              id="forgot-password-title"
              style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 600, color: colors.textPrimary }}
            >
              Password Assistance
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "21px", color: colors.textMuted }}>
              To ensure institutional compliance and student data privacy, password resets for DPS Junior Public School accounts
              are handled through verified IT administration.
            </p>

            <div
              style={{
                padding: "14px",
                borderRadius: "12px",
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                fontSize: "13px",
                lineHeight: "19px",
                color: colors.textPrimary,
                marginBottom: "20px"
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: "4px" }}>Institutional Support Contact:</div>
              <div>Email: <a href="mailto:support@dpsjunior.edu.in" style={{ color: colors.darkTeal }}>support@dpsjunior.edu.in</a></div>
              <div>Office: IT & Administrative Block (Room 102)</div>
              <div>Hours: Mon – Sat, 8:00 AM – 3:30 PM</div>
            </div>

            <button
              type="button"
              onClick={() => setForgotPasswordOpen(false)}
              style={{
                width: "100%",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: colors.darkTeal,
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer"
              }}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Responsive Layout Styles */}
      <style>{`
        .portal-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          min-height: 580px;
        }

        .portal-mobile-brand {
          display: none;
        }

        .portal-input:focus {
          border-color: ${colors.borderFocus} !important;
          box-shadow: 0 0 0 3px rgba(38, 78, 82, 0.12) !important;
        }

        @media (max-width: 920px) {
          .portal-grid {
            grid-template-columns: 1fr;
          }
          .portal-left-panel {
            display: none !important;
          }
          .portal-mobile-brand {
            display: block !important;
          }
          .portal-right-panel {
            padding: 32px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .portal-right-panel {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
