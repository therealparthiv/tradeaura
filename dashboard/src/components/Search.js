import React, { useState, useContext } from "react";
import flask from "../utils/axiosFlask";
import axios from "../utils/axiosInstance";
import GeneralContext from "./GeneralContext";
import "./Search.css"; // Make sure you include this for styles

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { refreshAll } = useContext(GeneralContext);

  const handleChange = async (e) => {
    const input = e.target.value.toUpperCase();
    setQuery(input);

    if (input.length < 2) {
      setResults([]);
      return;
    }

    const exchanges = [".NS", ".BO"];
    const candidates = exchanges.map((suffix) => `${input}${suffix}`);

    const temp = [];

    for (let symbol of candidates) {
      try {
        const res = await flask.get(`/price/${symbol}`);
        if (res.data && res.data.price) {
          temp.push({
            symbol: res.data.symbol,
            price: res.data.price,
            exchange: symbol.endsWith(".NS") ? "NSE" : "BSE",
          });
        }
      } catch (err) {
        // skip if error
      }
    }

    setResults(temp);
  };

  const handleAdd = async (symbol) => {
    try {
      await axios.post("/api/watchlist", { symbol });
      setQuery("");
      setResults([]);
      refreshAll();
    } catch (err) {
      console.error("Error adding stock:", err.message);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search eg: INFY, SBIN"
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((stock, idx) => (
            <li key={idx} className="search-item">
              <span>
                <strong>{stock.symbol}</strong> — ₹{stock.price} (
                {stock.exchange})
              </span>
              <button
                className="add-btn"
                onClick={() => handleAdd(stock.symbol)}>
                +
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
