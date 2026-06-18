import React from "react";

/**
 * Reusable terminal window chrome.
 * Wrap any content in <Terminal> to get the consistent
 * 3-dot header + title bar used across Skills, Projects,
 * Experience, and Contact.
 *
 * Expects the parent to already define the cr-* CSS variables
 * (--surface, --surface-2, --border, --accent, --accent-warm, --muted)
 * via its own scoped class, same as Hero/Skills/etc currently do.
 */
function Terminal({
  title = "guest@chaitanya — zsh",
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border overflow-hidden ${className}`}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
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
          {title}
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default Terminal;
