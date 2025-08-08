import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import Search from "./Search"; // Make sure you have Search.js component
import axios from "../utils/axiosInstance"; // Your backend axios
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
  DeleteOutline,
} from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";

const WatchList = () => {
  const { watchlist, refreshWatchlist } = useContext(GeneralContext);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    setDisplayList(watchlist);
  }, [watchlist]);

  // Remove stock from watchlist
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
        {displayList.map((stock, index) => (
          <WatchListItem
            key={index}
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
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="watchlist-item">
      <div className="item">
        <p>{stock.symbol}</p>
      </div>

      {showActions && (
        <span className="actions">
          <Tooltip
            title="Buy (B)"
            placement="top"
            arrow
            TransitionComponent={Grow}>
            <button
              className="buy"
              onClick={() => openBuyWindow(stock.symbol, "BUY")}>
              Buy
            </button>
          </Tooltip>

          <Tooltip
            title="Sell (S)"
            placement="top"
            arrow
            TransitionComponent={Grow}>
            <button
              className="sell"
              onClick={() => openBuyWindow(stock.symbol, "SELL")}>
              Sell
            </button>
          </Tooltip>

          <Tooltip
            title="Analytics (A)"
            placement="top"
            arrow
            TransitionComponent={Grow}>
            <button className="action">
              <BarChartOutlined />
            </button>
          </Tooltip>

          <Tooltip
            title="Remove"
            placement="top"
            arrow
            TransitionComponent={Grow}>
            <button className="action" onClick={onRemove}>
              <DeleteOutline />
            </button>
          </Tooltip>

          <Tooltip
            title="More"
            placement="top"
            arrow
            TransitionComponent={Grow}>
            <button className="action">
              <MoreHoriz />
            </button>
          </Tooltip>
        </span>
      )}
    </li>
  );
};
