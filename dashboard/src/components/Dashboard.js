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
import GeneralContext from "./GeneralContext";
import "./Dashboard.css"; // Import new styles

const Dashboard = () => {
  const { buyWindow } = useContext(GeneralContext);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <WatchList />
      </div>
      <main className="dashboard-main">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </main>
      {buyWindow.isOpen && (
        <BuyActionWindow uid={buyWindow.uid} mode={buyWindow.mode} />
      )}
    </div>
  );
};

export default Dashboard;
