import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap');

.cr-nav {
  --bg: #15130f;
  --surface: #1d1a14;
  --surface-2: #221e17;
  --border: #38332a;
  --text: #f3ece0;
  --muted: #9c948a;
  --accent: #6fb98f;
  --accent-warm: #6f8cb9;
}
.cr-nav .cr-display { font-family: 'Space Grotesk', sans-serif; }
.cr-nav .cr-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

.cr-nav a { text-decoration: none; }
.cr-nav a:focus-visible, .cr-nav button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

.cr-nav-link { color: var(--muted); transition: color 0.15s ease; position: relative; }
.cr-nav-link:hover { color: var(--text); }
.cr-nav-link::before { content: "> "; color: var(--accent); opacity: 0; transition: opacity 0.15s ease; }
.cr-nav-link:hover::before { opacity: 1; }

.cr-nav-cta {
  border: 1px solid var(--border);
  color: var(--text);
  transition: border-color 0.15s ease, color 0.15s ease;
}
.cr-nav-cta:hover { border-color: var(--accent); color: var(--accent); }

.cr-nav-toggle { color: var(--text); }

@keyframes cr-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
}
.cr-pulse-dot { animation: cr-pulse 2.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .cr-pulse-dot { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="cr-nav fixed top-0 left-0 w-full z-50 border-b transition-colors duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(21, 19, 15, 0.92)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <style>{STYLES}</style>

      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* logo / prompt */}
        <a
          href="#top"
          className="cr-mono flex items-center gap-2 text-sm"
          style={{ color: "var(--text)" }}
        >
          <span
            className="cr-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
            aria-hidden="true"
          />
          <span style={{ color: "var(--accent)" }}>guest@chaitanya</span>
          <span style={{ color: "var(--muted)" }}>:~$</span>
        </a>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cr-nav-link cr-mono text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="mailto:chaitanyaraj085@gmail.com"
            className="cr-nav-cta cr-mono inline-flex items-center px-4 py-2 rounded-md text-sm font-medium"
          >
            say hi
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className="cr-nav-toggle md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* mobile panel */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cr-nav-link cr-mono text-sm"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:chaitanyaraj085@gmail.com"
              className="cr-nav-cta cr-mono inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium mt-1"
              onClick={() => setOpen(false)}
            >
              say hi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
