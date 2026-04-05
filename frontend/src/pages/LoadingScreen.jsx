import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { FiCpu, FiZap, FiShield, FiLayers, FiCheck } from "react-icons/fi";
import { Sword } from "lucide-react";

const LOADING_STAGES = [
  { icon: FiCpu, text: "Initializing Battle Engine…", threshold: 15 },
  { icon: FiZap, text: "Loading AI Models…", threshold: 35 },
  { icon: FiShield, text: "Preparing Judge System…", threshold: 55 },
  { icon: FiLayers, text: "Building Arena Interface…", threshold: 75 },
  { icon: FiCheck, text: "Ready to Battle!", threshold: 95 },
];

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const counterRef = useRef(null);
  const progressObj = useRef({ value: 0 });

  useEffect(() => {
    // Animate progress from 0 to 100 over ~3.5 seconds
    const tween = gsap.to(progressObj.current, {
      value: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.round(progressObj.current.value);
        setProgress(val);

        // Update stage based on thresholds
        for (let i = LOADING_STAGES.length - 1; i >= 0; i--) {
          if (val >= LOADING_STAGES[i].threshold) {
            setCurrentStage(i);
            break;
          }
        }
      },
      onComplete: () => {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => navigate("/arena"), 600);
        }, 500);
      },
    });

    return () => tween.kill();
  }, [navigate]);

  const StageIcon = LOADING_STAGES[currentStage]?.icon || FiCpu;

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background image */}
          <div className="loading-bg" />

          {/* Overlay gradient */}
          <div className="loading-overlay" />

          {/* Animated grid lines */}
          <div className="loading-grid" />

          {/* Content */}
          <div className="loading-content">
            {/* Logo */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <div className="loading-logo-icon">
                <Sword size={32} />
              </div>
            </motion.div>

            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              AI Battle Arena
            </motion.h1>

            <motion.p
              className="loading-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Preparing your battleground
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="loading-progress-container"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="loading-progress-track">
                <motion.div
                  className="loading-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="loading-progress-glow"
                  style={{ left: `${progress}%` }}
                />
              </div>

              <div className="loading-progress-info">
                <div className="loading-stage">
                  <StageIcon size={14} />
                  <span>{LOADING_STAGES[currentStage]?.text}</span>
                </div>
                <span className="loading-percent" ref={counterRef}>
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Stage indicators */}
            <motion.div
              className="loading-stages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {LOADING_STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i <= currentStage;
                const isCurrent = i === currentStage;
                return (
                  <div
                    key={i}
                    className={`loading-stage-dot ${isActive ? "active" : ""} ${isCurrent ? "current" : ""}`}
                  >
                    <Icon size={12} />
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Floating particles */}
          <div className="loading-particles">
            {Array.from({ length: 20 }).map((_, i) => (
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
