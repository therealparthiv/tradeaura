import React from "react";
import "../Common.css";

function Hero() {
  return (
    <section className="page-hero">
      <h1>Simple, Free Investing</h1>
      <p>The smartest way to manage your wealth is right here.</p>
      <a href="/signup" className="btn" style={{ marginTop: "2rem" }}>
        Get Started
      </a>
    </section>
  );
}
export default Hero;
