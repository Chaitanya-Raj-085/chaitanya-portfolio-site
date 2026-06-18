export const PROJECTS = [
  {
    file: "kv-store.md",
    title: "Redis-Inspired Distributed Key-Value Store",
    description:
      "A distributed data storage system built from scratch over raw sockets, supporting SET, GET, and DEL commands. Implements Write-Ahead Logging with fsync for crash-safe durability via log replay, and was benchmarked across 10–1000 concurrent clients to study throughput under different concurrency models.",
    stack: ["Python", "Sockets", "Threading", "Concurrency"],
    github: "https://github.com/Chaitanya-Raj-085/Distributed-Key-Value-Store",
    demo: null,
  },
  {
    file: "infra-agent.md",
    title: "AI Infrastructure & Autonomous Monitoring Agent",
    description:
      "An AI-powered infrastructure agent for log analysis, incident diagnosis, and automated root-cause investigation. Uses tool-driven workflows and LLM-based reasoning for failure classification, with integration points for observability platforms and MCP servers to reason over metrics, logs, and infrastructure state.",
    stack: ["Python", "LangChain", "Gemini API", "Pydantic", "MCP"],
    github: "https://github.com/Chaitanya-Raj-085",
    demo: null,
  },
];
