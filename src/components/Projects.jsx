import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Folder, FileText } from "lucide-react";
import Heading from "./Heading";
import Terminal from "./Terminal";
import { PROJECTS } from "../data/projects";

const STYLES = `

.cr-file-item {
  color: var(--muted);
  background-color: transparent;
  border-left: 2px solid transparent;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
}
.cr-file-item:hover {
  color: var(--text);
  background-color: var(--surface-2);
}
.cr-file-item.active {
  color: var(--accent-warm);
  background-color: var(--surface-2);
  border-left-color: var(--accent-warm);
}

.cr-tag {
  border: 1px solid var(--border);
  color: var(--muted);
  background-color: var(--surface-2);
}

.cr-out-link {
  color: var(--muted);
  transition: color 0.15s ease;
}
.cr-out-link:hover { color: var(--accent-warm); }

@keyframes cr-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.cr-fade { animation: cr-fade-in 0.25s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .cr-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROJECTS[activeIdx];

  return (
    <section
      id="projects"
      className="cr-projects relative py-24 overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <Heading number="03 — selected work">Projects</Heading>
        <Terminal>
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
            {/* file list */}
            <div
              className="border-b sm:border-b-0 sm:border-r py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="cr-mono text-xs px-4 pb-2 flex items-center gap-1.5"
                style={{ color: "var(--muted)" }}
              >
                <Folder size={13} />
                projects/
              </div>
              {PROJECTS.map((entry, idx) => (
                <button
                  key={entry.file}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`cr-file-item cr-mono w-full text-left text-sm px-4 py-2 flex items-center gap-2 ${
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
            <div className="p-5 sm:p-6 min-h-70">
              <div className="cr-mono text-xs sm:text-sm flex flex-wrap gap-x-2 mb-5">
                <span style={{ color: "var(--accent)" }}>
                  guest@chaitanya:~/projects$
                </span>
                <span style={{ color: "var(--text)" }}>cat {active.file}</span>
              </div>

              <div key={active.file} className="cr-fade">
                <h3 className="cr-display font-bold text-xl md:text-2xl mb-3">
                  {active.title}
                </h3>

                <p
                  className="text-sm md:text-base leading-relaxed mb-5"
                  style={{ color: "var(--text)", opacity: 0.85 }}
                >
                  {active.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {active.stack.map((tech) => (
                    <span
                      key={tech}
                      className="cr-tag cr-mono text-xs px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 cr-mono text-sm">
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cr-out-link inline-flex items-center gap-1.5"
                  >
                    <SiGithub size={15} />
                    github
                  </a>
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cr-out-link inline-flex items-center gap-1.5"
                    >
                      demo
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Terminal>
      </div>
    </section>
  );
}

export default Projects;
