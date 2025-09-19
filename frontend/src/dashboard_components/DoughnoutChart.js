import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register the required components for a Doughnut chart. This is the crucial step.
ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We will create a custom legend if needed, for a cleaner look
      },
    },
    cutout: "70%", // This creates the "doughnut" hole in the center
  };

  return <Doughnut data={data} options={options} />;
}
