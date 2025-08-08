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

  const refreshWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      setWatchlist(res.data.stocks || []);
    } catch (err) {
      console.error("Failed to refresh watchlist:", err);
      setWatchlist([]);
    }
  };

  useEffect(() => {
    refreshWatchlist();
  }, []);

  const openBuyWindow = (symbol, mode) => {
    setBuyWindow({
      isOpen: true,
      uid: symbol,
      mode: mode,
    });
  };

  const closeBuyWindow = () => {
    setBuyWindow({
      isOpen: false,
      uid: null,
      mode: null,
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        watchlist,
        refreshWatchlist,
        openBuyWindow,
        closeBuyWindow,
        buyWindow,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
