import React, { useEffect, useRef, useState } from "react";
import { skills } from "../data/skills";
import Heading from "./Heading";
import Terminal from "./Terminal";

const STYLES = `

.cr-skill-item:hover {
  border-color: var(--accent);
  color: var(--accent);
  opacity: 1;
}

@keyframes cr-fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.cr-fade { animation: cr-fade-in 0.4s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .cr-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Skills() {
  const categories = Object.entries(skills);
  const totalCount = categories.reduce(
    (sum, [, items]) => sum + items.length,
    0,
  );
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="cr-skills relative py-24 overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Heading number="02 — capabilities">Skills</Heading>

        <Terminal>
          <div className="cr-mono text-xs sm:text-sm p-5 sm:p-6">
            <div className="flex flex-wrap gap-x-2 mb-6">
              <span style={{ color: "var(--accent)" }}>guest@chaitanya:~$</span>
              <span style={{ color: "var(--text)" }}>ls skills/</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
              {categories.map(([category, items], idx) => {
                const dirName = category.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div
                    key={category}
                    className={inView ? "cr-fade" : ""}
                    style={
                      inView
                        ? { animationDelay: `${idx * 60}ms` }
                        : { opacity: inView ? 1 : 0 }
                    }
                  >
                    <p
                      className="font-medium mb-2.5"
                      style={{ color: "var(--accent-warm)" }}
                    >
                      {dirName}/
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="cr-skill-item rounded-md px-2.5 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="flex items-center gap-2 pt-7"
              style={{ color: "var(--muted)" }}
            >
              <span style={{ color: "var(--accent)" }}>guest@chaitanya:~$</span>
              <span>
                {totalCount} skills, {categories.length} directories
              </span>
            </div>
          </div>
        </Terminal>
      </div>
    </section>
  );
}

export default Skills;
