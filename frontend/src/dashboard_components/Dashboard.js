import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import BuyActionWindow from "./BuyActionWindow";
import StockChartModal from "./StockChartModal";
import GeneralContext from "./GeneralContext";
import "./Dashboard.css";
import TopBar from "./TopBar";

const Dashboard = () => {
  const { buyWindow, stockChart } = useContext(GeneralContext);

  return (
    <div className="dashboard-layout">
      <TopBar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <Routes>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
          </Routes>
        </div>
        <WatchList />
      </main>
      {buyWindow.isOpen && (
        <BuyActionWindow uid={buyWindow.uid} mode={buyWindow.mode} />
      )}
      {stockChart.isOpen && <StockChartModal uid={stockChart.uid} />}
    </div>
  );
};

export default Dashboard;
