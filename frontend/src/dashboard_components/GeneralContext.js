import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

// This is now a regular constant, not exported directly here
const GeneralContext = createContext();

// The provider remains a named export, as it's used correctly in index.js
export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  // ✅ ADDED: State management for modals and action windows
  const [buyWindow, setBuyWindow] = useState({
    isOpen: false,
    uid: null,
    mode: "BUY",
  });
  const [chartWindow, setChartWindow] = useState({
    isOpen: false,
    symbol: null,
  });

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("/api/user-details");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get("/api/watchlist");
      setWatchlist(response.data);
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchWatchlist();
  }, []);

  // ✅ ADDED: Functions to control the modals from any component
  const openBuyWindow = (uid, mode = "BUY") =>
    setBuyWindow({ isOpen: true, uid, mode });
  const closeBuyWindow = () =>
    setBuyWindow({ isOpen: false, uid: null, mode: "BUY" });
  const openChartWindow = (symbol) => setChartWindow({ isOpen: true, symbol });
  const closeChartWindow = () =>
    setChartWindow({ isOpen: false, symbol: null });

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        watchlist,
        setWatchlist,
        fetchWatchlist,
        // ✅ ADDED: Exposing the new state and functions to the application
        buyWindow,
        openBuyWindow,
        closeBuyWindow,
        chartWindow,
        openChartWindow,
        closeChartWindow,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

// ✅ ADDED: Export the context as the default for the file
export default GeneralContext;
