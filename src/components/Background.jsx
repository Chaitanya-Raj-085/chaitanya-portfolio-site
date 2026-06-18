import React from "react";

function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

export default Background;
