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
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const PortfolioPerformance = ({ history }) => {
  const data = {
    labels: history.map((point) => point.time), // e.g., ['10:00', '10:30', '11:00']
    datasets: [
      {
        label: "Portfolio Value (₹)",
        data: history.map((point) => point.value),
        fill: true,
        backgroundColor: "rgba(34,197,94,0.1)",
        borderColor: "#10b981",
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
        ticks: { color: "#64748b" },
      },
      y: {
        title: { display: true, text: "₹ Value" },
        ticks: { color: "#64748b" },
      },
    },
  };

  return (
    <div className="section">
      <span>
        <p>Portfolio Performance</p>
      </span>
      <div style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PortfolioPerformance;
