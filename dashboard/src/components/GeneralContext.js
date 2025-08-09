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
      // The backend sends an object like { stocks: [...] }, so we access the .stocks property
      if (res.data && Array.isArray(res.data.stocks)) {
        setWatchlist(res.data.stocks);
      } else {
        setWatchlist([]);
      }
    } catch (err) {
      console.error("Error fetching watchlist from backend:", err);
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
