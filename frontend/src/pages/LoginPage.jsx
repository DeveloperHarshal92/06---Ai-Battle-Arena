import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Sword, Swords, Shield, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigate("/arena");
  };

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
          <h2 className="auth-brand-title">AI Battle Arena</h2>
          <p className="auth-brand-sub">
            Pit AI models head-to-head on coding challenges with an impartial AI judge.
          </p>

          <div className="auth-features">
            {[
              { icon: Swords, label: "Side-by-side comparison" },
              { icon: Shield, label: "Impartial AI judging" },
              { icon: Zap, label: "Instant results" },
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

        {/* Floating particles */}
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

      {/* Right — Login Form */}
      <div className="auth-form-side">
        <motion.div
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="auth-form-header">
            <h1 className="auth-form-title">Welcome back</h1>
            <p className="auth-form-subtitle">Sign in to continue your battles</p>
          </motion.div>

          {/* Social login */}
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
            <span>or continue with email</span>
          </motion.div>

          <form onSubmit={handleSubmit} className="auth-form">
            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="login-email">
                <FiMail size={14} />
                Email
              </label>
              <div className={`auth-input-wrap ${errors.email ? "auth-input-error" : ""}`}>
                <input
                  id="login-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p
                  className="auth-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="auth-field-group">
              <label className="auth-label" htmlFor="login-password">
                <FiLock size={14} />
                Password
              </label>
              <div className={`auth-input-wrap ${errors.password ? "auth-input-error" : ""}`}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                  autoComplete="current-password"
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
              {errors.password && (
                <motion.p
                  className="auth-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="auth-options-row">
              <label className="auth-checkbox-label">
                <input type="checkbox" className="auth-checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="auth-link-small">Forgot password?</a>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="auth-submit-btn"
              whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
              <FiArrowRight size={16} />
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch-link">Create account</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
