import React from "react";
import Hero from "./Hero";
import Team from "./Team";
import "../Common.css";

function AboutPage() {
  return (
    <>
      <Hero />
      <section
        className="section"
        style={{ backgroundColor: "var(--background-light)" }}>
        <h2 className="section-title">Our Philosophy</h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--text-secondary)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
          We believe that every Indian deserves an opportunity to create wealth.
          Our mission is to make investing simple, accessible, and transparent
          for millions of Indians by leveraging technology. We are committed to
          an honest, customer-first approach in everything we do.
        </p>
      </section>
      <Team />
    </>
  );
}
export default AboutPage;
