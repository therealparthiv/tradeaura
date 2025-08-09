import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [buyWindow, setBuyWindow] = useState({
    isOpen: false,
    uid: null,
    mode: null,
  });

  const [chartWindow, setChartWindow] = useState({
    isOpen: false,
    symbol: null,
  });

  const refreshWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      if (res.data && Array.isArray(res.data.stocks)) {
        setWatchlist(res.data.stocks);
      } else {
        setWatchlist([]);
      }
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setWatchlist([]);
    }
  };

  useEffect(() => {
    refreshWatchlist();
  }, []);

  const openBuyWindow = (symbol, mode) => {
    setBuyWindow({ isOpen: true, uid: symbol, mode: mode });
  };
  const closeBuyWindow = () => {
    setBuyWindow({ isOpen: false, uid: null, mode: null });
  };

  const openChartWindow = (symbol) => {
    setChartWindow({ isOpen: true, symbol: symbol });
  };
  const closeChartWindow = () => {
    setChartWindow({ isOpen: false, symbol: null });
  };

  return (
    <GeneralContext.Provider
      value={{
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
