import { SiGithub } from "react-icons/si";
import { SiLeetcode } from "react-icons/si";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ABOUT } from "@/data/about";

const LOG_LINES = [
  { kind: "prompt", text: "whoami" },
  { kind: "out", text: "chaitanya raj bangaru" },
  { kind: "out", text: "software engineer · systems & AI · india" },
  { kind: "gap" },
  { kind: "prompt", text: "cat education.log" },
  { kind: "ok", text: "b.tech, mechanical engineering — nit calicut '24" },
  { kind: "ok", text: "250+ dsa problems solved on leetcode" },
  { kind: "gap" },
  { kind: "prompt", text: "tail -f projects.log" },
  { kind: "ok", text: "kv-store — redis-style store, WAL + crash recovery" },
  { kind: "ok", text: "infra-agent — langchain + gemini, incident triage" },
  { kind: "info", text: "currently going deeper on distributed systems" },
];

const STYLES = `


.cr-hero a { text-decoration: none; }
.cr-hero a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

.cr-btn-primary {
  background-color: var(--accent);
  color: var(--bg);
  transition: background-color 0.15s ease;
}
.cr-btn-primary:hover { background-color: var(--accent-warm); }

.cr-btn-secondary {
  border: 1px solid var(--border);
  color: var(--text);
  transition: border-color 0.15s ease, color 0.15s ease;
}
.cr-btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

.cr-icon-link { color: var(--muted); transition: color 0.15s ease; }
.cr-icon-link:hover { color: var(--accent); }

@keyframes cr-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.cr-cursor { animation: cr-blink 1s step-end infinite; }

@keyframes cr-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
}
.cr-pulse-dot { animation: cr-pulse 2.4s ease-in-out infinite; }

@keyframes cr-line-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.cr-line { animation: cr-line-in 0.22s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .cr-pulse-dot, .cr-cursor, .cr-line {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

function LogLine({ line }) {
  if (line.kind === "gap") return <div className="h-2" aria-hidden="true" />;

  if (line.kind === "prompt") {
    return (
      <div className="cr-line flex flex-wrap gap-x-2">
        <span style={{ color: "var(--accent)" }}>guest@chaitanya:~$</span>
        <span style={{ color: "var(--text)" }}>{line.text}</span>
      </div>
    );
  }

  if (line.kind === "ok") {
    return (
      <div className="cr-line flex gap-x-2 pl-4">
        <span style={{ color: "var(--accent-warm)" }}>[ok]</span>
        <span style={{ color: "var(--text)", opacity: 0.85 }}>{line.text}</span>
      </div>
    );
  }

  if (line.kind === "info") {
    return (
      <div className="cr-line flex gap-x-2 pl-4">
        <span style={{ color: "var(--accent-warm)" }}>[info]</span>
        <span style={{ color: "var(--muted)" }}>{line.text}</span>
      </div>
    );
  }

  return (
    <div
      className="cr-line pl-4"
      style={{ color: "var(--text)", opacity: 0.85 }}
    >
      {line.text}
    </div>
  );
}

function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisibleCount(LOG_LINES.length);
      return;
    }

    if (visibleCount < LOG_LINES.length) {
      const delay = LOG_LINES[visibleCount].kind === "gap" ? 90 : 170;
      const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const done = visibleCount >= LOG_LINES.length;

  return (
    <section
      className="cr-hero relative min-h-screen flex items-center overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* left column */}
        <div className="space-y-6">
          <div
            className="cr-mono inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            <span
              className="cr-pulse-dot inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
              aria-hidden="true"
            />
            Open to software engineering roles
          </div>

          <h1 className="cr-display font-bold tracking-tight leading-tight text-5xl sm:text-6xl md:text-7xl">
            {ABOUT.FirstName}
            <br />
            {ABOUT.LastName}
          </h1>

          <p
            className="cr-mono text-base md:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {ABOUT.title} — systems, infra &amp; AI
          </p>

          <p
            className="cr-body text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "var(--text)", opacity: 0.85 }}
          >
            {ABOUT.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={ABOUT.ResumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-mono cr-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium"
            >
              resume
              <ArrowUpRight size={16} />
            </a>

            <a
              href={ABOUT.GithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-mono cr-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium"
            >
              <SiGithub size={16} />
              github
            </a>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <a
              href={ABOUT.LinkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-icon-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={ABOUT.MailLink}
              className="cr-icon-link"
              aria-label="Email"
            >
              <SiGmail size={20} />
            </a>
            <a
              href={ABOUT.LeetCodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-icon-link"
              aria-label="LeetCode"
            >
              <SiLeetcode size={20} />
            </a>
          </div>
        </div>

        {/* right column - terminal */}
        <div className="relative">
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "0 0 70px -25px rgba(111, 185, 143, 0.3)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--accent-warm-2)" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--accent-warm)" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="cr-mono text-xs ml-2"
                style={{ color: "var(--muted)" }}
              >
                guest@chaitanya — zsh
              </span>
            </div>

            <div
              className="cr-mono text-xs sm:text-sm p-5 space-y-1.5"
              style={{ minHeight: "300px" }}
            >
              {LOG_LINES.slice(0, visibleCount).map((line, i) => (
                <LogLine key={i} line={line} />
              ))}
              {done && (
                <div className="flex items-center gap-2 pt-1">
                  <span style={{ color: "var(--accent)" }}>
                    guest@chaitanya:~$
                  </span>
                  <span
                    className="cr-cursor inline-block"
                    style={{
                      width: "8px",
                      height: "16px",
                      backgroundColor: "var(--text)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
