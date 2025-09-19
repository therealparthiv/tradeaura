import React from "react";
import "./Apps.css";
import ApiIcon from "@mui/icons-material/Api";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BarChartIcon from "@mui/icons-material/BarChart";

const AppCard = ({ icon, title, description }) => (
  <div className="app-card">
    <div className="app-icon">{icon}</div>
    <h3 className="app-title">{title}</h3>
    <p className="app-description">{description}</p>
    <button className="app-button">Learn More</button>
  </div>
);

const Apps = () => {
  return (
    <div className="apps-container">
      <h2 className="page-title">Apps & Integrations</h2>
      <p className="page-subtitle">
        Supercharge your trading with our powerful tools and integrations.
      </p>
      <div className="apps-grid">
        <AppCard
          icon={<ApiIcon />}
          title="TradeAura API"
          description="Build your own trading platform with our free APIs."
        />
        <AppCard
          icon={<SmartToyIcon />}
          title="Algo Trading Bot"
          description="Automate your strategies with our easy-to-use bot builder."
        />
        <AppCard
          icon={<BarChartIcon />}
          title="Advanced Charting"
          description="Unlock premium charting tools and indicators for in-depth analysis."
        />
      </div>
    </div>
  );
};

export default Apps;
