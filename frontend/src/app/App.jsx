import React, { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Plus, Loader2, ArrowRight, Swords, Sun, Moon, Sword } from "lucide-react";
import axios from "axios";
import VerdictBar from "../components/VerdictBar";
import SolutionCard from "../components/SolutionCard";
import ReasoningFooter from "../components/ReasoningFooter";
import { MODEL_ALPHA, MODEL_OMEGA } from "../data/mockData";

// ─────────────────────────────────────────────
// Battle state machine
// ─────────────────────────────────────────────
const STATES = { IDLE: "idle", LOADING: "loading", RESULTS: "results" };

const App = () => {
  const [status, setStatus] = useState(STATES.IDLE);
  const [battle, setBattle] = useState(null);
  const [problem, setProblem] = useState("");
  const [isDark, setIsDark] = useState(true);

  const btnRunRef = useRef(null);

  // Determine winner
  const winner = battle?.judge
    ? battle.judge.solution_1_score > battle.judge.solution_2_score
      ? "alpha"
      : battle.judge.solution_1_score < battle.judge.solution_2_score
        ? "omega"
        : "tie"
    : null;

  // ── Handlers ──────────────────────────────
  const handleNewBattle = () => {
    setBattle(null);
    setStatus(STATES.IDLE);
    setProblem("");
  };

  const handleRun = useCallback(async () => {
    if (!problem.trim() || status === STATES.LOADING) return;

    setStatus(STATES.LOADING);
    setBattle(null);

    const response = await axios.post("http://localhost:3000/invoke", {
      prompt: problem,
    });

    const data = response.data

    console.log(data)

    // GSAP button feedback
    if (btnRunRef.current) {
      gsap.fromTo(
        btnRunRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" },
      );
    }

    setTimeout(() => {
      setBattle({ ...data.result, problem: problem.trim() });
      setStatus(STATES.RESULTS);
    }, 2800);
  }, [problem, status]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleRun();
  };

  // ── Status label ──────────────────────────
  const statusText =
    status === STATES.LOADING
      ? "Running battle..."
      : status === STATES.RESULTS
        ? "Battle complete"
        : "Awaiting problem...";

  const statusDotClass =
    status === STATES.LOADING
      ? "status-dot status-dot--loading"
      : status === STATES.RESULTS
        ? "status-dot status-dot--ready"
        : "status-dot status-dot--idle";

  // ─────────────────────────────────────────
  return (
    <div className={`arena-shell${isDark ? " dark" : ""}`}>
      {/* ══════════════════════════════════════
          LEFT SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-row">
            <div className="sidebar-logo-icon">
            <Sword size={18} />
          </div>
            <span className="sidebar-logo-title">Battle Arena</span>
            <span className="sidebar-logo-badge">Pro</span>
            <button
              id="btn-theme-toggle"
              className="btn-theme-toggle"
              onClick={() => setIsDark((d) => !d)}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
          <p className="sidebar-logo-sub" style={{ marginTop: 6 }}>
            AI Model Comparison Platform
          </p>
        </div>

        {/* Body */}
        <div className="sidebar-body">
          {/* New Battle */}
          <button
            id="btn-new-battle"
            className="btn-new-battle"
            onClick={handleNewBattle}
          >
            <Plus size={15} strokeWidth={2.5} />
            New Battle
          </button>

          {/* Problem Statement */}
          <div className="problem-section">
            <p className="problem-label">Problem Statement</p>
            <textarea
              id="problem-textarea"
              className="problem-textarea"
              placeholder="Describe the coding challenge…&#10;&#10;e.g. Write a function to find the longest palindromic substring in a given string."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status === STATES.LOADING}
              aria-label="Problem statement input"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            id="btn-run-battle"
            ref={btnRunRef}
            className={`btn-run-battle ${status === STATES.LOADING ? "btn-run-battle--loading" : ""}`}
            onClick={handleRun}
            disabled={!problem.trim() || status === STATES.LOADING}
          >
            {status === STATES.LOADING ? (
              <>
                <Loader2 size={16} className="spin" /> Running Battle...
              </>
            ) : (
              <>
                <ArrowRight size={16} /> Run Battle
              </>
            )}
          </button>

          <div className="status-bar">
            <div className={statusDotClass} />
            <span>{statusText}</span>
            {status === STATES.RESULTS && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.68rem",
                  color: "var(--primary-container)",
                }}
              >
                Ctrl↵ to re-run
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          RIGHT MAIN PANEL
      ══════════════════════════════════════ */}
      <main className="main-panel">
        {/* Verdict bar (always visible) */}
        <VerdictBar
          judge={battle?.judge ?? { solution_1_score: 0, solution_2_score: 0 }}
          status={status}
        />

        {/* ── Battle Area / Idle state ── */}
        {status === STATES.IDLE ? (
          <div className="idle-main">
            <div className="idle-icon">
              <Swords size={40} strokeWidth={1.2} color="var(--outline)" />
            </div>
            <h2 className="idle-title">Ready to Battle</h2>
            <p className="idle-desc">
              Enter a coding challenge in the left panel to watch two AI models
              compete side by side. An impartial judge scores the results.
            </p>
            <div className="idle-tags">
              {["Side-by-Side", "Scored 0–10", "AI Judged", "No scroll"].map(
                (t) => (
                  <span key={t} className="idle-tag">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="battle-area">
            <SolutionCard
              solution={battle?.solution_1 ?? null}
              modelName={MODEL_ALPHA.name}
              modelKey={MODEL_ALPHA.key}
              // language={MODEL_ALPHA.language}
              isWinner={winner === "alpha"}
              index={0}
              isLoading={status === STATES.LOADING}
            />
            <SolutionCard
              solution={battle?.solution_2 ?? null}
              modelName={MODEL_OMEGA.name}
              modelKey={MODEL_OMEGA.key}
              // language={MODEL_OMEGA.language}
              isWinner={winner === "omega"}
              index={1}
              isLoading={status === STATES.LOADING}
            />
          </div>
        )}

        {/* Reasoning accordion footer */}
        <ReasoningFooter
          judge={battle?.judge}
          isVisible={status === STATES.RESULTS}
        />
      </main>
    </div>
  );
};

export default App;
