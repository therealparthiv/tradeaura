import React from "react";

function Hero() {
  const heroStyle = {
    textAlign: "center",
    padding: "5rem 2rem",
    backgroundColor: "var(--background-light)",
  };

  const h1Style = {
    fontSize: "3rem",
    marginBottom: "1rem",
  };

  const pStyle = {
    fontSize: "1.2rem",
    color: "var(--text-secondary)",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.7",
  };

  return (
    <section style={heroStyle}>
      <h1 style={h1Style}>Our Mission</h1>
      <p style={pStyle}>
        To make investing simple, accessible, and transparent for everyone. We
        are a technology-led financial services company, committed to helping
        you build wealth with confidence.
      </p>
    </section>
  );
}

export default Hero;
