import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Sword, Swords, Shield, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { score: 2, label: "Fair", color: "#f59e0b" };
  if (score <= 3) return { score: 3, label: "Good", color: "#22c55e" };
  return { score: 4, label: "Strong", color: "#6366f1" };
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigate("/arena");
  };

  const clearError = (field) => setErrors((p) => ({ ...p, [field]: "" }));

  return (
    <div className="auth-page">
      {/* Left — Animated Visual */}
      <div className="auth-visual">
        <div className="auth-visual-bg" />
        <div className="auth-visual-overlay" />
        <div className="auth-visual-grid" />

        <motion.div
          className="auth-visual-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="auth-brand-logo">
            <Sword size={28} />
          </div>
          <h2 className="auth-brand-title">Join the Arena</h2>
          <p className="auth-brand-sub">
            Create your account and start watching AI models battle it out.
          </p>

          <div className="auth-features">
            {[
              { icon: Swords, label: "Unlimited battles" },
              { icon: Shield, label: "Track your history" },
              { icon: Zap, label: "Premium features" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                className="auth-feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              >
                <div className="auth-feature-icon">
                  <Icon size={16} />
                </div>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="auth-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="loading-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right — Register Form */}
      <div className="auth-form-side">
        <motion.div
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="auth-form-header">
            <h1 className="auth-form-title">Create account</h1>
            <p className="auth-form-subtitle">Start your first battle in seconds</p>
          </motion.div>

          <motion.div variants={itemVariants} className="auth-social-row">
            <button className="auth-social-btn" type="button">
              <FcGoogle size={18} />
              <span>Google</span>
            </button>
            <button className="auth-social-btn" type="button">
              <FiGithub size={18} />
              <span>GitHub</span>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="auth-divider">
            <span>or sign up with email</span>
          </motion.div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="reg-name">
                <FiUser size={14} />
                Full Name
              </label>
              <div className={`auth-input-wrap ${errors.fullName ? "auth-input-error" : ""}`}>
                <input
                  id="reg-name"
                  type="text"
                  className="auth-input"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); clearError("fullName"); }}
                />
              </div>
              {errors.fullName && (
                <motion.p className="auth-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="reg-email">
                <FiMail size={14} />
                Email
              </label>
              <div className={`auth-input-wrap ${errors.email ? "auth-input-error" : ""}`}>
                <input
                  id="reg-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p className="auth-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="reg-password">
                <FiLock size={14} />
                Password
              </label>
              <div className={`auth-input-wrap ${errors.password ? "auth-input-error" : ""}`}>
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {password && (
                <div className="password-strength">
                  <div className="password-strength-track">
                    <motion.div
                      className="password-strength-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength.score / 4) * 100}%` }}
                      style={{ backgroundColor: strength.color }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="password-strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
              {errors.password && (
                <motion.p className="auth-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="reg-confirm">
                <FiLock size={14} />
                Confirm Password
              </label>
              <div className={`auth-input-wrap ${errors.confirmPassword ? "auth-input-error" : ""}`}>
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  className="auth-input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p className="auth-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="auth-submit-btn"
              whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
              <FiArrowRight size={16} />
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">Sign in</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
