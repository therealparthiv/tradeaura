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
  };

  return (
    <section style={heroStyle}>
      <h1 style={h1Style}>Simple & Transparent Pricing</h1>
      <p style={pStyle}>
        Pay ₹0 brokerage for equity delivery and mutual funds.
      </p>
    </section>
  );
}

export default Hero;
