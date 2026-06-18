import Navbar from "./components/Navbar";
import React from "react";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Hero from "./components/Hero";

import Background from "./components/Background";
function App() {
  return (
    <div style={{ backgroundColor: "var(--bg)", position: "relative" }}>
      <Background />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
}

export default App;
