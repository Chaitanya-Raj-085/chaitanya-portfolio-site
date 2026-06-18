import React from "react";

function Heading({ number, children, className = "" }) {
  return (
    <div className="mb-10">
      <p
        className="cr-mono text-xs sm:text-sm uppercase tracking-widest mb-3"
        style={{ color: "var(--accent-warm-2)" }}
      >
        {number}
      </p>
      <h2 className="cr-display font-bold text-3xl md:text-4xl">{children}</h2>
    </div>
  );
}
export default Heading;
