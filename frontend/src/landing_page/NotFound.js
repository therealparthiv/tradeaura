import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import new CSS

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
