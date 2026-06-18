import React, { useEffect, useRef, useState } from "react";
import { SiGithub, SiLeetcode, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Heading from "./Heading";
import Terminal from "./Terminal";
const STYLES = `


.cr-field {
  background-color: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  transition: border-color 0.15s ease;
}
.cr-field::placeholder { color: var(--muted); opacity: 0.7; }
.cr-field:focus {
  outline: none;
  border-color: var(--accent);
}

.cr-send-btn {
  background-color: var(--accent);
  color: var(--bg);
  transition: background-color 0.15s ease, opacity 0.15s ease;
}
.cr-send-btn:hover { background-color: var(--accent-warm); }
.cr-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.cr-icon-link { color: var(--muted); transition: color 0.15s ease; }
.cr-icon-link:hover { color: var(--accent); }

@keyframes cr-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.cr-cursor { animation: cr-blink 1s step-end infinite; }

@keyframes cr-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.cr-fade { animation: cr-fade-in 0.3s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .cr-cursor, .cr-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const PING_LINES = [
  { delay: 0, text: "PING chaitanya.dev (127.0.0.1): 56 data bytes" },
  { delay: 450, text: "64 bytes from chaitanya.dev: icmp_seq=0 time=11.2ms" },
  { delay: 750, text: "64 bytes from chaitanya.dev: icmp_seq=1 time=9.8ms" },
];

function useInView(threshold = 0.25) {
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

function Contact() {
  const [sectionRef, inView] = useInView(0.2);
  const [visiblePings, setVisiblePings] = useState(0);
  const [connected, setConnected] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!inView) return;

    if (prefersReduced) {
      setVisiblePings(PING_LINES.length);
      setConnected(true);
      return;
    }

    const timers = PING_LINES.map((line, idx) =>
      setTimeout(() => setVisiblePings(idx + 1), line.delay),
    );
    const connectTimer = setTimeout(() => setConnected(true), 1450);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(connectTimer);
    };
  }, [inView, prefersReduced]);

  const terminalRef = useRef(null);
  useEffect(() => {
    if (connected && terminalRef.current) {
      terminalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [connected]);
  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend not wired up yet — UI-only for now
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="cr-contact relative py-24 overflow-hidden"
      style={{ color: "var(--text)" }}
    >
      <style>{STYLES}</style>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <Heading number="05 — contact">Let's talk</Heading>
        <Terminal ref={terminalRef}>
          <div className="cr-mono text-xs sm:text-sm p-5 sm:p-6">
            {/* ping sequence */}
            <div className="flex flex-wrap gap-x-2 mb-1">
              <span style={{ color: "var(--accent)" }}>guest@chaitanya:~$</span>
              <span style={{ color: "var(--text)" }}>ping chaitanya.dev</span>
            </div>

            <div className="space-y-0.5 mb-3" style={{ color: "var(--muted)" }}>
              {PING_LINES.slice(1, visiblePings).map((line, i) => (
                <div key={i} className="cr-fade pl-1">
                  {line.text}
                </div>
              ))}
            </div>

            {connected && (
              <div className="cr-fade mb-6" style={{ color: "var(--accent)" }}>
                connection established.
              </div>
            )}

            {/* form, revealed after "connection" */}
            {connected && !sent && (
              <form onSubmit={handleSubmit} className="cr-fade space-y-4">
                <div className="flex flex-wrap gap-x-2 mb-1">
                  <span style={{ color: "var(--accent)" }}>
                    guest@chaitanya:~$
                  </span>
                  <span style={{ color: "var(--text)" }}>
                    ./send-message.sh
                  </span>
                </div>

                <div>
                  <label
                    className="block mb-1.5"
                    style={{ color: "var(--muted)" }}
                  >
                    name:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="your name"
                    className="cr-field cr-mono w-full rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label
                    className="block mb-1.5"
                    style={{ color: "var(--muted)" }}
                  >
                    email:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                    className="cr-field cr-mono w-full rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label
                    className="block mb-1.5"
                    style={{ color: "var(--muted)" }}
                  >
                    message:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange("message")}
                    placeholder="say hello..."
                    className="cr-field cr-mono w-full rounded-md px-3 py-2 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="cr-send-btn cr-mono inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium"
                >
                  [ send ]
                </button>
              </form>
            )}

            {sent && (
              <div className="cr-fade" style={{ color: "var(--accent)" }}>
                message queued. thanks for reaching out — I'll get back to you
                soon.
                <span
                  className="cr-cursor inline-block ml-2"
                  style={{
                    width: "7px",
                    height: "14px",
                    backgroundColor: "var(--text)",
                  }}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </Terminal>

        {/* direct links, always visible */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <a
            href="mailto:chaitanyaraj085@gmail.com"
            className="cr-icon-link"
            aria-label="Email"
          >
            <SiGmail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/chaitanya-raj-16180621b/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-icon-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/Chaitanya-Raj-085"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-icon-link"
            aria-label="GitHub"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://leetcode.com/u/CR_22/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-icon-link"
            aria-label="LeetCode"
          >
            <SiLeetcode size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
