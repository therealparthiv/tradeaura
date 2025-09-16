import React from "react";
import { Link } from "react-router-dom";
import "../Common.css";

function ProductsPreview() {
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--background-light)" }}>
      <h2 className="section-title">Explore Our Products</h2>
      <div className="grid-container">
        <div className="card">
          <h3>Stocks</h3>
          <p>Invest in thousands of stocks with our easy-to-use platform.</p>
          <Link to="/products" className="btn">
            Learn More
          </Link>
        </div>
        <div className="card">
          <h3>Mutual Funds</h3>
          <p>
            Choose from a wide range of commission-free direct mutual funds.
          </p>
          <Link to="/products" className="btn">
            Learn More
          </Link>
        </div>
        <div className="card">
          <h3>US Stocks</h3>
          <p>Diversify globally by investing in your favorite US companies.</p>
          <Link to="/products" className="btn">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
export default ProductsPreview;
