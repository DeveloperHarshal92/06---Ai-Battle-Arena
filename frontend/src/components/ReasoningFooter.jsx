import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ReasoningFooter = ({ judge, isVisible }) => {
  const [open, setOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="reasoning-footer">
      <button
        id="reasoning-toggle"
        className="reasoning-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>⚖</span>
        <span className="reasoning-toggle-label">Judge's Reasoning</span>
        <ChevronDown
          size={15}
          className={`reasoning-chevron ${open ? "reasoning-chevron--open" : ""}`}
        />
      </button>

      <div className={`reasoning-body scrollable ${open ? "reasoning-body--open" : ""}`}>
        <div className="reasoning-grid">
          <div className="reasoning-col">
            <p className="reasoning-col-label reasoning-col-label--alpha">
              Model Alpha
            </p>
            <p className="reasoning-text">{judge.solution_1_reasoning}</p>
          </div>
          <div className="reasoning-col">
            <p className="reasoning-col-label reasoning-col-label--omega">
              Model Omega
            </p>
            <p className="reasoning-text">{judge.solution_2_reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningFooter;
