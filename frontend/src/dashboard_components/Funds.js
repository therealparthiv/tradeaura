import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./Funds.css";

const Funds = () => {
  return (
    <div className="funds-container">
      <div className="funds-header">
        <h2 className="page-title">Funds</h2>
        <div className="header-actions">
          <Link className="btn btn-green">
            <AddCircleOutlineIcon
              style={{ fontSize: "1.2rem", marginRight: "8px" }}
            />
            Add Funds
          </Link>
          <Link className="btn btn-blue">
            <RemoveCircleOutlineIcon
              style={{ fontSize: "1.2rem", marginRight: "8px" }}
            />
            Withdraw
          </Link>
        </div>
      </div>

      <div className="funds-grid">
        <div className="fund-card equity">
          <h3 className="card-title">Equity</h3>
          <div className="card-content">
            <div className="metric">
              <span>Available Margin</span>
              <span className="value primary">₹ 4,043.10</span>
            </div>
            <div className="metric">
              <span>Used Margin</span>
              <span className="value">₹ 3,757.30</span>
            </div>
            <div className="metric">
              <span>Available Cash</span>
              <span className="value">₹ 4,043.10</span>
            </div>
            <hr className="divider" />
            <div className="metric">
              <span>Opening Balance</span>
              <span className="value secondary">₹ 4,043.10</span>
            </div>
            <div className="metric">
              <span>Payin</span>
              <span className="value secondary">₹ 4,064.00</span>
            </div>
          </div>
        </div>
        <div className="fund-card commodity">
          <h3 className="card-title">Commodity</h3>
          <div className="card-content centered">
            <p>You don't have a commodity account.</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
