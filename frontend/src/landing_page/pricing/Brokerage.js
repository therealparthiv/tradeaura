import React from "react";

function Brokerage() {
  const sectionStyle = {
    textAlign: "center",
    padding: "5rem 2rem",
  };

  const h2Style = {
    fontSize: "2.5rem",
    marginBottom: "3rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  };

  const priceStyle = {
    fontSize: "2.5rem",
    color: "var(--groww-green)",
    margin: "1rem 0",
    fontWeight: "bold",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={h2Style}>Our Charges</h2>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3>Equity Delivery</h3>
          <p style={priceStyle}>₹0</p>
          <p style={{ color: "var(--text-secondary)" }}>
            Free investing in stocks. No hidden fees.
          </p>
        </div>
        <div style={cardStyle}>
          <h3>Intraday & F&O</h3>
          <p style={priceStyle}>₹20</p>
          <p style={{ color: "var(--text-secondary)" }}>
            Flat per executed order.
          </p>
        </div>
        <div style={cardStyle}>
          <h3>Mutual Funds</h3>
          <p style={priceStyle}>₹0</p>
          <p style={{ color: "var(--text-secondary)" }}>
            Zero commission on direct mutual funds.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;
