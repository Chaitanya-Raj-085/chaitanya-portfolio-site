import React from "react";
import Heading from "./Heading";
import { ABOUT } from "../data/about";
const STYLES = `

.cr-edu-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
}
`;

function About() {
  return (
    <section
      id="about"
      className="cr-about relative py-24 overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <Heading number="01 — origin story">About</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14">
          {/* narrative */}
          <div>
            <p
              className="cr-mono text-xs mb-3"
              style={{ color: "var(--muted)" }}
            >
              // about.md
            </p>
            <p
              className="cr-body text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text)", opacity: 0.88 }}
            >
              {ABOUT.detailDescription}
            </p>
          </div>

          {/* sidebar */}
          <div className="space-y-6">
            <div className="cr-edu-card rounded-xl p-5">
              <p
                className="cr-mono text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                education
              </p>
              <p className="cr-display font-bold text-base mb-1">
                {ABOUT.education.institution}
              </p>
              <p className="cr-mono text-sm" style={{ color: "var(--muted)" }}>
                {ABOUT.education.degree}
                <br />
                {ABOUT.education.duration}
              </p>
            </div>

            <p
              className="cr-mono text-xs leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {ABOUT.freeTime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
