import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import axios from "../utils/axiosInstance";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  orders: [],
  holdings: [],
  positions: [],
  refreshAll: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setSelectedStockUID(uid);
    setOrderMode(mode);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  const refreshAll = async () => {
    try {
      const [o, h, p] = await Promise.all([
        axios.get("/api/orders"),
        axios.get("/api/holdings"),
        axios.get("/api/positions"),
      ]);
      setOrders(o.data);
      setHoldings(h.data);
      setPositions(p.data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    }
  };

  useEffect(() => {
    refreshAll(); // Fetch on mount
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        orders,
        holdings,
        positions,
        refreshAll,
      }}>
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
