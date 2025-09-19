import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import Search from "./Search";
import axios from "../utils/axiosInstance";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
  DeleteOutline,
} from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";
import "./WatchList.css";

const WatchList = () => {
  const { watchlist, refreshWatchlist } = useContext(GeneralContext);

  const handleRemove = async (symbol) => {
    try {
      await axios.delete(`/api/watchlist/${symbol}`);
      refreshWatchlist();
    } catch (err) {
      console.error("Failed to remove stock:", err);
    }
  };

  return (
    <div className="watchlist-container">
      <Search />
      <ul className="list">
        {watchlist &&
          watchlist.map((stock) => (
            <WatchListItem
              key={stock._id || stock.symbol}
              stock={stock}
              onRemove={() => handleRemove(stock.symbol)}
            />
          ))}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onRemove }) => {
  const [showActions, setShowActions] = useState(false);
  const { openBuyWindow, openChartWindow } = useContext(GeneralContext);
  const [liveData, setLiveData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!stock.symbol) return;
      try {
        const res = await axios.get(`/api/price/${stock.symbol}`);
        setLiveData(res.data);
      } catch (err) {
        setError("N/A");
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [stock.symbol]);

  const price = liveData ? liveData.price : 0.0;
  const isDown = liveData ? liveData.change < 0 : false;
  const pChange = liveData ? Math.abs(liveData.pChange || 0) : 0;

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}>
      <div className="item">
        <p className={isDown ? "loss" : "profit"}>{stock.symbol}</p>
        <div className="item-info">
          {error ? (
            <span className="loss">{error}</span>
          ) : liveData ? (
            <>
              <span className={isDown ? "loss" : "profit"}>
                {isDown ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                {pChange.toFixed(2)}%
              </span>
              <span>₹{price.toFixed(2)}</span>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>

      {showActions && (
        <span className="actions">
          <Tooltip title="Buy (B)" placement="top" arrow>
            <button
              className="buy"
              onClick={() => openBuyWindow(stock.symbol, "BUY")}>
              Buy
            </button>
          </Tooltip>
          <Tooltip title="Sell (S)" placement="top" arrow>
            <button
              className="sell"
              onClick={() => openBuyWindow(stock.symbol, "SELL")}>
              Sell
            </button>
          </Tooltip>
          <Tooltip title="Analytics (A)" placement="top" arrow>
            <button
              className="action"
              onClick={() => openChartWindow(stock.symbol)}>
              <BarChartOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Remove" placement="top" arrow>
            <button className="action" onClick={onRemove}>
              <DeleteOutline />
            </button>
          </Tooltip>
        </span>
      )}
    </li>
  );
};
