import React, { useState } from "react";
import { Folder, FileText } from "lucide-react";
import Terminal from "./Terminal";
import Heading from "./Heading";
import Background from "./Background";
const STYLES = `

.cr-tree-item {
  color: var(--muted);
  background-color: transparent;
  border-left: 2px solid transparent;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
}
.cr-tree-item:hover {
  color: var(--text);
  background-color: var(--surface-2);
}
.cr-tree-item.active {
  color: var(--accent);
  background-color: var(--surface-2);
  border-left-color: var(--accent);
}

@keyframes cr-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.cr-fade { animation: cr-fade-in 0.25s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .cr-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const ENTRIES = [
  {
    file: "outlier-ai.log",
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
    file: "big-binary.log",
    role: "Full Stack Intern",
    org: "Big Binary Academy",
    dates: "Mar 2024 – May 2024",
    points: [
      "Built and shipped several complete full-stack web apps end to end, including a to-do list, currency converter, and password generator.",
      "Worked across the stack — UI, state, and logic — to take each project from idea to a working deployed product.",
    ],
  },
  {
    file: "programming-committee.log",
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
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ENTRIES[activeIdx];

  return (
    <section
      id="experience"
      className="cr-experience relative py-24 overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <Heading number="04 — experience">Experience</Heading>
        <Terminal>
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
            {/* file tree */}
            <div
              className="border-b sm:border-b-0 sm:border-r py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="cr-mono text-xs px-4 pb-2 flex items-center gap-1.5"
                style={{ color: "var(--muted)" }}
              >
                <Folder size={13} />
                experience/
              </div>
              {ENTRIES.map((entry, idx) => (
                <button
                  key={entry.file}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`cr-tree-item cr-mono w-full text-left text-sm px-4 py-2 flex items-center gap-2 ${
                    idx === activeIdx ? "active" : ""
                  }`}
                >
                  <span
                    style={{ paddingLeft: "10px" }}
                    className="flex items-center gap-2"
                  >
                    <FileText size={13} className="shrink-0" />
                    {entry.file}
                  </span>
                </button>
              ))}
            </div>

            {/* output pane */}
            <div className="p-5 sm:p-6 min-h-65">
              <div className="cr-mono text-xs sm:text-sm flex flex-wrap gap-x-2 mb-5">
                <span style={{ color: "var(--accent-warm)" }}>
                  guest@chaitanya:~/experience$
                </span>
                <span style={{ color: "var(--text)" }}>cat {active.file}</span>
              </div>

              <div key={active.file} className="cr-fade">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="cr-display font-bold text-lg md:text-xl">
                    {active.role}
                  </h3>
                  <span
                    className="cr-mono text-xs sm:text-sm whitespace-nowrap"
                    style={{ color: "var(--muted)" }}
                  >
                    {active.dates}
                  </span>
                </div>

                <p
                  className="cr-mono text-sm mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {active.org}
                </p>

                <ul className="space-y-2">
                  {active.points.map((point, i) => (
                    <li
                      key={i}
                      className="cr-body text-sm md:text-[15px] leading-relaxed flex gap-x-2.5"
                      style={{ color: "var(--text)", opacity: 0.85 }}
                    >
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                        ›
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Terminal>
      </div>
    </section>
  );
}

export default Experience;
