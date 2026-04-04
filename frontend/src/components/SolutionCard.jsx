import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code2 } from "lucide-react";

const SolutionCard = ({ solution, modelName, modelKey, language, isWinner, index, isLoading }) => {
  const cardRef = useRef(null);

  // GSAP: fade + lift on mount
  useEffect(() => {
    if (!cardRef.current || isLoading) return;

    gsap.from(cardRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.45,
      delay: index * 0.12,
      ease: "power2.out",
    });
  }, [solution, isLoading]);

  if (isLoading) {
    return (
      <div className="solution-card">
        <div className="solution-card-header">
          <span className="solution-card-title">Solution {index + 1}</span>
          <span className={`model-chip model-chip--${modelKey}`}>{modelName}</span>
          <span className="lang-chip"><Code2 size={11} /> {language}</span>
        </div>
        <div className="solution-content" style={{ padding: "20px" }}>
          {[100, 70, 85, 55, 90, 60, 75].map((w, i) => (
            <div
              key={i}
              className="shimmer-line"
              style={{ width: `${w}%`, marginBottom: 10 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="solution-card">
        <div className="solution-card-header">
          <span className="solution-card-title">Solution {index + 1}</span>
          <span className={`model-chip model-chip--${modelKey}`}>{modelName}</span>
          <span className="lang-chip"><Code2 size={11} /> {language}</span>
        </div>
        <div className="card-placeholder">
          <div className="placeholder-icon">
            {index === 0 ? "⬡" : "⬢"}
          </div>
          <p className="placeholder-text">Awaiting battle</p>
          <p className="placeholder-sub">Submit a problem to see {modelName}'s solution here</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="solution-card"
      style={isWinner ? {
        outline: `2px solid ${modelKey === "alpha" ? "rgba(99,102,241,0.4)" : "rgba(139,92,246,0.4)"}`,
        outlineOffset: "2px",
      } : {}}
    >
      <div className="solution-card-header">
        <span className="solution-card-title">Solution {index + 1}</span>
        <span className={`model-chip model-chip--${modelKey}`}>
          {isWinner && "🏆 "}{modelName}
        </span>
        <span className="lang-chip"><Code2 size={11} /> {language}</span>
      </div>

      <div className="solution-content scrollable">
        <pre className="code-block">{solution}</pre>
      </div>
    </div>
  );
};

export default SolutionCard;
