import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "../utils/axiosInstance";
import "./StockChartModal.css";
import "./charts.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler
);

const TimeRangeSelector = ({ selectedRange, onSelectRange }) => {
  const ranges = [
    { label: "1D", range: "1d", interval: "5m" },
    { label: "5D", range: "5d", interval: "30m" },
    { label: "1M", range: "1mo", interval: "1d" },
    { label: "6M", range: "6mo", interval: "1d" },
    { label: "1Y", range: "1y", interval: "1d" },
    { label: "5Y", range: "5y", interval: "1wk" },
    { label: "MAX", range: "max", interval: "1mo" },
  ];

  return (
    <div className="time-range-selector">
      {ranges.map(({ label, range, interval }) => (
        <button
          key={label}
          className={selectedRange === range ? "active" : ""}
          onClick={() => onSelectRange(range, interval)}>
          {label}
        </button>
      ))}
    </div>
  );
};

const StockChartModal = ({ symbol, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("1mo");
  const [interval, setInterval] = useState("1d");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!symbol) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/history/${symbol}?range=${range}&interval=${interval}`
        );
        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [symbol, range, interval]);

  const chartData = {
    datasets: [
      {
        data: history.map((point) => ({ x: point.time, y: point.value })),
        borderColor:
          history.length > 1 &&
          history[history.length - 1].value >= history[0].value
            ? "var(--color-success)"
            : "var(--color-danger)",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          const chartColor =
            history.length > 1 &&
            history[history.length - 1].value >= history[0].value
              ? "rgba(22, 163, 74, 0.2)"
              : "rgba(220, 38, 38, 0.2)";
          gradient.addColorStop(0, chartColor);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          return gradient;
        },
        fill: true,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { type: "time", time: { unit: "day" }, grid: { display: false } },
      y: { grid: { color: "#f1f5f9" } },
    },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{symbol.replace(".NS", "").replace(".BO", "")}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <TimeRangeSelector
          selectedRange={range}
          onSelectRange={(r, i) => {
            setRange(r);
            setInterval(i);
          }}
        />
        <div className="modal-body">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChartModal;
