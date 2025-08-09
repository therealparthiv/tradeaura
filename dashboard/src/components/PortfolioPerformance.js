import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";

// Register all necessary components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const PortfolioPerformance = ({ holdings, prices, history, loading }) => {
  if (loading) {
    return (
      <div className="portfolio-performance-card loading">
        <div className="spinner"></div>
        <p>Loading Portfolio Data...</p>
      </div>
    );
  }

  // --- All calculations are now handled inside this component ---
  const getLTP = (symbol) => prices[symbol] || 0;
  const investment = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const currentValue = holdings.reduce(
    (acc, s) => acc + getLTP(s.name) * s.qty,
    0
  );
  const pnl = currentValue - investment;
  const isProfit = pnl >= 0;

  // --- Dynamic Chart Styling (Zerodha-style) ---
  const chartColor = isProfit ? "rgb(5, 150, 105)" : "rgb(220, 38, 38)"; // Green for profit, Red for loss
  const chartGradient = isProfit
    ? "rgba(16, 185, 129, 0.1)"
    : "rgba(239, 68, 68, 0.1)";

  const data = {
    labels: history.map((point) => point.time),
    datasets: [
      {
        data: history.map((point) => point.value),
        borderColor: chartColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, chartGradient);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        displayColors: false,
        backgroundColor: "#1e293b",
        titleColor: "#cbd5e1",
        bodyColor: "#f8fafc",
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  return (
    <div className="portfolio-performance-card">
      <div className="card-header">
        <h3 className="section-title">Portfolio Overview</h3>
        <div className={`pnl-display ${isProfit ? "profit" : "loss"}`}>
          {pnl >= 0 ? `+₹${pnl.toFixed(2)}` : `-₹${Math.abs(pnl).toFixed(2)}`}
        </div>
      </div>
      <div className="card-chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="card-footer">
        <div className="footer-metric">
          <span>Total Investment</span>
          <span className="value">₹{investment.toFixed(2)}</span>
        </div>
        <div className="footer-metric">
          <span>Current Value</span>
          <span className="value">₹{currentValue.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformance;
