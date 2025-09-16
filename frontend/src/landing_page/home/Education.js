import React from "react";
import { Link } from "react-router-dom";
import "../Common.css";

function Education() {
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--background-light)" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "5rem",
        }}>
        <div style={{ flex: 1 }}>
          <img
            src="media/images/education.png"
            alt="Education"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <h2
            className="section-title"
            style={{ textAlign: "left", display: "block" }}>
            Learn About Investing
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              lineHeight: "1.7",
              marginBottom: "2rem",
            }}>
            Explore our free collection of articles, resources, and market
            insights. From beginner guides to advanced strategies, we have
            everything you need to learn on the go.
          </p>
          <Link to="/learn" className="btn">
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Education;
