import React from "react";
import "../Common.css";

// A reusable component for a founder's card
const FounderCard = ({ imageUrl, name, role }) => {
  return (
    <div className="card">
      <img
        src={imageUrl}
        alt={`Photo of ${name}`}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "1.5rem",
          border: "3px solid var(--border-color)",
        }}
      />
      <h4 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{name}</h4>
      <p style={{ color: "var(--text-secondary)" }}>{role}</p>
    </div>
  );
};

function Team() {
  return (
    <section className="section">
      <h2 className="section-title">Our Founders</h2>
      {/* This container is now correctly styled by the CSS file */}
      <div className="grid-container">
        <FounderCard
          imageUrl="media/images/lalit-keshre.jpg"
          name="Lalit Keshre"
          role="Co-founder & CEO"
        />
        <FounderCard
          imageUrl="media/images/harsh-jain.jpg"
          name="Harsh Jain"
          role="Co-founder & COO"
        />
        <FounderCard
          imageUrl="media/images/neeraj-singh.jpg"
          name="Neeraj Singh"
          role="Co-founder & CTO"
        />
      </div>
    </section>
  );
}

export default Team;
