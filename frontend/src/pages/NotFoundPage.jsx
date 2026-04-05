import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { Sword } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="notfound-page">
      {/* Background effects */}
      <div className="notfound-bg" />
      <div className="notfound-grid" />

      {/* Floating particles */}
      <div className="loading-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      <div className="notfound-content">
        {/* Glitch 404 */}
        <motion.div
          className="notfound-number-wrap"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          <h1 className="notfound-number" data-text="404">404</h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="notfound-icon"
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiAlertTriangle size={32} />
        </motion.div>

        {/* Message */}
        <motion.h2
          className="notfound-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Battle Not Found
        </motion.h2>

        <motion.p
          className="notfound-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          The arena you're looking for doesn't exist or has been dissolved.
          <br />
          Return to the arena and start a new battle.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="notfound-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link to="/arena" className="notfound-btn notfound-btn--primary">
            <Sword size={16} />
            Go to Arena
          </Link>
          <Link to="/" className="notfound-btn notfound-btn--secondary">
            <FiHome size={16} />
            Home
          </Link>
        </motion.div>

        {/* Brand footer */}
        <motion.div
          className="notfound-brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Sword size={14} />
          <span>AI Battle Arena</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
