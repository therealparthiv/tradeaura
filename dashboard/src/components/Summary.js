import React from "react";
import LivePrice from "./LivePrice";

const Summary = () => {
  return (
    <>
      {/* Username section */}
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {/* Equity section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Holdings section */}
      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>
            </p>
            <p>
              Investment <span>29.88k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* 🔴 Live Price Section */}
      <div className="section">
        <span>
          <p>Live Market</p>
        </span>

        <div className="price-grid">
          <LivePrice symbol="RELIANCE.NS" />
          <LivePrice symbol="ITC.NS" />
          <LivePrice symbol="HDFCBANK.NS" />
          <LivePrice symbol="TCS.NS" />
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
