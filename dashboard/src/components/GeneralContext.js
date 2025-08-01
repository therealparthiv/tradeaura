// frontend/src/components/GeneralContext.js

import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext();

export const GeneralContextProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  const refreshWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      setWatchlist(res.data);
    } catch (err) {
      console.error("Watchlist fetch error", err);
    }
  };

  const openBuyWindow = (uid, mode = "BUY") => {
    setSelectedStockUID(uid);
    setOrderMode(mode);
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  useEffect(() => {
    refreshWatchlist();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        watchlist,
        refreshWatchlist,
        openBuyWindow,
        closeBuyWindow,
      }}>
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
