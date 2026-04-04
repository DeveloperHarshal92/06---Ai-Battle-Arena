import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown, Crown, Scale } from "lucide-react";

// SVG ring constants
const RING_R  = 20;
const RING_C  = 26;
const CIRC    = 2 * Math.PI * RING_R; // ≈ 125.66

const ScoreRing = ({ score, side }) => {
  const fillRef  = useRef(null);
  const labelRef = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!fillRef.current) return;

    const progress  = score / 10;
    const dashOffset = CIRC * (1 - progress);

    // Animate the ring stroke
    gsap.fromTo(
      fillRef.current,
      { strokeDashoffset: CIRC },
      {
        strokeDashoffset: dashOffset,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    // Animate the numeric counter
    const obj = { value: 0 };
    gsap.to(obj, {
      value: score,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3,
      onUpdate: () => setDisplay(parseFloat(obj.value.toFixed(1))),
    });
  }, [score]);

  return (
    <div className="score-ring-wrap">
      <svg className="score-ring-svg" viewBox={`0 0 ${RING_C * 2} ${RING_C * 2}`}>
        <circle
          className="score-ring-bg"
          cx={RING_C} cy={RING_C} r={RING_R}
        />
        <circle
          ref={fillRef}
          className={`score-ring-fill score-ring-fill--${side}`}
          cx={RING_C} cy={RING_C} r={RING_R}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
        />
      </svg>
      <div className={`score-ring-label score-ring-label--${side}`}>
        {display}
      </div>
    </div>
  );
};

const VerdictBar = ({ judge, status }) => {
  const isResults = status === "results";

  const winner = isResults
    ? judge.solution_1_score > judge.solution_2_score
      ? "alpha"
      : judge.solution_1_score < judge.solution_2_score
        ? "omega"
        : "tie"
    : null;

  return (
    <div className="verdict-bar">
      {/* Model Alpha */}
      <div className="verdict-model">
        {isResults && (
          <ScoreRing score={judge.solution_1_score} side="alpha" />
        )}
        <div className="verdict-info">
          <h4>Model Alpha</h4>
          {isResults && (
            <span className={`score-big score-big--alpha`}>
              {judge.solution_1_score}
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--on-surface-muted)" }}>
                /10
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Center */}
      <div className="verdict-center">
        {isResults ? (
          <>
            <span className="verdict-vs">vs</span>
            {winner === "alpha" && (
              <span className="verdict-winner-badge verdict-winner-badge--alpha">
                <Crown size={11} /> Alpha Wins
              </span>
            )}
            {winner === "omega" && (
              <span className="verdict-winner-badge verdict-winner-badge--omega">
                <Crown size={11} /> Omega Wins
              </span>
            )}
            {winner === "tie" && (
              <span className="verdict-winner-badge verdict-winner-badge--tie">
                <Scale size={11} /> Draw
              </span>
            )}
          </>
        ) : (
          <span className="verdict-idle">— no battle yet —</span>
        )}
      </div>

      {/* Model Omega */}
      <div className="verdict-model verdict-model--right">
        {isResults && (
          <ScoreRing score={judge.solution_2_score} side="omega" />
        )}
        <div className="verdict-info" style={{ textAlign: "right" }}>
          <h4>Model Omega</h4>
          {isResults && (
            <span className={`score-big score-big--omega`}>
              {judge.solution_2_score}
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--on-surface-muted)" }}>
                /10
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerdictBar;
