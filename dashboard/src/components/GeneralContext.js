import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [authStatus, setAuthStatus] = useState("PENDING");

  const [buyWindow, setBuyWindow] = useState({
    isOpen: false,
    uid: null,
    mode: null,
  });
  const [chartWindow, setChartWindow] = useState({
    isOpen: false,
    symbol: null,
  });

  useEffect(() => {
    axios
      .get("/api/auth/profile")
      .then(() => setAuthStatus("LOGGED_IN"))
      .catch(() => setAuthStatus("LOGGED_OUT"));
  }, []);

  const refreshWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      setWatchlist(res.data?.stocks || []);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
    }
  };

  useEffect(() => {
    if (authStatus === "LOGGED_IN") {
      refreshWatchlist();
    }
  }, [authStatus]);

  const openBuyWindow = (symbol, mode) =>
    setBuyWindow({ isOpen: true, uid: symbol, mode: mode });
  const closeBuyWindow = () =>
    setBuyWindow({ isOpen: false, uid: null, mode: null });
  const openChartWindow = (symbol) =>
    setChartWindow({ isOpen: true, symbol: symbol });
  const closeChartWindow = () =>
    setChartWindow({ isOpen: false, symbol: null });

  return (
    <GeneralContext.Provider
      value={{
        authStatus,
        watchlist,
        refreshWatchlist,
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

export default GeneralContext;
