import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import flask from "../utils/axiosFlask";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import Search from "./Search"; // at top

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("/api/watchlist"); // Your backend watchlist API
        const list = res.data;

        const updatedList = await Promise.all(
          list.map(async (item) => {
            try {
              const res = await flask.get(`/price/${item.symbol}`);
              const price = res.data.price;
              const prev = item.prevPrice || price;
              const isDown = price < prev;
              const percent = prev
                ? `${(((price - prev) / prev) * 100).toFixed(2)}%`
                : "0.00%";

              return {
                ...item,
                price,
                percent,
                isDown,
              };
            } catch {
              return {
                ...item,
                price: 0,
                percent: "0.00%",
                isDown: false,
              };
            }
          })
        );

        setWatchlist(updatedList);
        setChartData({
          labels: updatedList.map((s) => s.symbol),
          datasets: [
            {
              label: "Price",
              data: updatedList.map((s) => s.price),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching watchlist:", err.message);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <Search />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {chartData && <DoughnutChart data={chartData} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.symbol}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">₹{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.symbol} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}>
          <button
            className="buy"
            onClick={() => generalContext.openBuyWindow(uid, "BUY")}>
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
            onClick={() => generalContext.openBuyWindow(uid, "SELL")}>
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
