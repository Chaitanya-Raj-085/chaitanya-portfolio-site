import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap');

.cr-experience {
  --bg: #15130f;
  --surface: #1d1a14;
  --surface-2: #221e17;
  --border: #38332a;
  --text: #f3ece0;
  --muted: #9c948a;
  --accent: #6fb98f;
  --accent-warm: #6f8cb9;
}
.cr-experience .cr-display { font-family: 'Space Grotesk', sans-serif; }
.cr-experience .cr-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
.cr-experience .cr-body { font-family: 'IBM Plex Sans', sans-serif; }

.cr-acc-item {
  background-color: var(--surface);
  border: 1px solid var(--border);
  transition: border-color 0.15s ease;
}
.cr-acc-item.open {
  border-color: var(--accent);
}

.cr-acc-header {
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.cr-acc-header:hover {
  background-color: var(--surface-2);
}

.cr-chevron {
  color: var(--muted);
  transition: transform 0.2s ease, color 0.2s ease;
}
.cr-acc-item.open .cr-chevron {
  transform: rotate(180deg);
  color: var(--accent);
}

.cr-acc-panel {
  overflow: hidden;
  transition: max-height 0.25s ease;
}
`;

const ENTRIES = [
  {
    id: "outlier",
    role: "Freelance AI Trainer",
    org: "Outlier AI · Remote",
    dates: "Jun 2024 – Mar 2025",
    points: [
      "Trained foundational models in complex mathematical reasoning — algebra, calculus, and geometry.",
      "Wrote adversarial prompts and edge-case scenarios to expose model weaknesses and improve safety.",
      "Validated datasets and evaluated LLM outputs for high-quality training signal.",
    ],
  },
  {
    id: "bigbinary",
    role: "Full Stack Intern",
    org: "Big Binary Academy",
    dates: "Mar 2024 – May 2024",
    points: [
      "Built and shipped several complete full-stack web apps end to end, including a to-do list, currency converter, and password generator.",
      "Worked across the stack — UI, state, and logic — to take each project from idea to a working deployed product.",
    ],
  },
  {
    id: "nitc",
    role: "Senior Executive, Programming Committee",
    org: "NIT Calicut",
    dates: "2023 – 2024",
    points: [
      "Designed and ran technical events for college fests, handling planning end to end.",
      "Guided and mentored juniors getting started with competitive programming and development.",
      "Helped increase event participation by roughly 20% year over year.",
    ],
  },
];

function Experience() {
  const [openId, setOpenId] = useState(ENTRIES[0].id);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="cr-experience relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <div className="mb-10">
          <p
            className="cr-mono text-xs sm:text-sm uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            04 — experience
          </p>
          <h2 className="cr-display font-bold text-3xl md:text-4xl">
            Experience
          </h2>
        </div>

        <div className="space-y-3">
          {ENTRIES.map((entry) => {
            const isOpen = openId === entry.id;
            return (
              <div
                key={entry.id}
                className={`cr-acc-item rounded-xl ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={isOpen}
                  className="cr-acc-header w-full flex items-center justify-between gap-4 text-left px-5 py-4 rounded-xl"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="cr-display font-bold text-base md:text-lg">
                        {entry.role}
                      </h3>
                      <span
                        className="cr-mono text-xs md:text-sm"
                        style={{ color: "var(--accent-warm)" }}
                      >
                        {entry.org}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className="cr-mono text-xs md:text-sm whitespace-nowrap hidden sm:inline"
                      style={{ color: "var(--muted)" }}
                    >
                      {entry.dates}
                    </span>
                    <ChevronDown size={18} className="cr-chevron" />
                  </div>
                </button>

                <div
                  className="cr-acc-panel"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <div className="px-5 pb-5 pt-1">
                    <span
                      className="cr-mono text-xs sm:hidden block mb-3"
                      style={{ color: "var(--muted)" }}
                    >
                      {entry.dates}
                    </span>
                    <ul className="space-y-2">
                      {entry.points.map((point, i) => (
                        <li
                          key={i}
                          className="cr-body text-sm md:text-[15px] leading-relaxed flex gap-x-2.5"
                          style={{ color: "var(--text)", opacity: 0.85 }}
                        >
                          <span
                            style={{ color: "var(--accent)", flexShrink: 0 }}
                          >
                            ›
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
