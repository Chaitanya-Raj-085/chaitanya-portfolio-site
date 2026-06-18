import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Terminal from "./Terminal";
import Heading from "./Heading";
import { ENTRIES } from "../data/experience";
const STYLES = `

.cr-proc-row {
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.15s ease;
}
.cr-proc-row:hover {
  background-color: var(--surface-2);
}
.cr-proc-row.open {
  background-color: var(--surface-2);
}

.cr-chevron {
  color: var(--muted);
  transition: transform 0.2s ease, color 0.2s ease;
}
.cr-proc-row.open .cr-chevron {
  transform: rotate(90deg);
  color: var(--accent);
}

.cr-acc-panel {
  overflow: hidden;
  transition: max-height 0.25s ease;
}
`;

function Experience() {
  const [openId, setOpenId] = useState(ENTRIES[0].id);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

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
          <div
            className="cr-mono text-xs sm:text-sm px-5 pt-4 pb-1"
            style={{ color: "var(--text)" }}
          >
            <span style={{ color: "var(--accent)" }}>guest@chaitanya:~$</span>{" "}
            cat experience.log
          </div>

          <div>
            {ENTRIES.map((entry) => {
              const isOpen = openId === entry.id;
              return (
                <div key={entry.id}>
                  <button
                    type="button"
                    onClick={() => toggle(entry.id)}
                    aria-expanded={isOpen}
                    className={`cr-proc-row ${isOpen ? "open" : ""} w-full flex items-center gap-3 text-left px-5 py-3`}
                  >
                    <ChevronRight size={14} className="cr-chevron shrink-0" />
                    <span
                      className="cr-display font-bold text-sm sm:text-base"
                      style={{ color: "var(--text)" }}
                    >
                      {entry.role}
                    </span>
                    <span
                      className="cr-mono text-xs sm:text-sm"
                      style={{ color: "var(--accent-warm)" }}
                    >
                      {entry.org}
                    </span>
                    <span
                      className="cr-mono text-xs ml-auto whitespace-nowrap"
                      style={{ color: "var(--muted)" }}
                    >
                      {entry.dates}
                    </span>
                  </button>

                  <div
                    className="cr-acc-panel"
                    style={{ maxHeight: isOpen ? "320px" : "0px" }}
                  >
                    <div className="px-5 pb-5 pt-2 pl-12">
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
        </Terminal>
      </div>
    </section>
  );
}

export default Experience;
