import React, { useState } from "react";
import { ChevronDown, Scale } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

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
        <Scale size={15} />
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
            <MarkdownRenderer content={judge.solution_1_reasoning} />
          </div>
          <div className="reasoning-col">
            <p className="reasoning-col-label reasoning-col-label--omega">
              Model Omega
            </p>
            <MarkdownRenderer content={judge.solution_2_reasoning} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningFooter;
