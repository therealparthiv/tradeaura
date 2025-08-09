import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register all necessary components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const PortfolioPerformance = ({ history, loading }) => {
  // Display a loading state while data is being fetched
  if (loading) {
    return (
      <div className="loading-chart-container">
        <div className="spinner"></div>
        <p>Loading Performance Data...</p>
      </div>
    );
  }

  const data = {
    labels: history.map((point) => point.time),
    datasets: [
      {
        label: "Portfolio Value (₹)",
        data: history.map((point) => point.value),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
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
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#475569",
        borderColor: "#e2e8f0",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { family: "'Inter', sans-serif" } },
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#94a3b8",
          font: { family: "'Inter', sans-serif" },
          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  // The key is this container div which gets a height from the CSS
  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default PortfolioPerformance;
