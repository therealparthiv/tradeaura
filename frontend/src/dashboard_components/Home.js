// src/dashboard_components/Home.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import TopBar from "./TopBar";
import Menu from "./Menu";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";

const Home = () => {
  return (
    <div className="app-container">
      <TopBar />
      <div className="main-layout">
        <Menu />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
