import React from "react";
import "./OpenAccount.css"; // Import the new CSS

function OpenAccount() {
  return (
    <section className="open-account-section">
      <h2>Ready to start your investment journey?</h2>
      <a href="/signup" className="btn btn-light">
        Open an Account
      </a>
    </section>
  );
}

export default OpenAccount;
