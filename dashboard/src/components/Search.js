// src/components/Search.js
import React, { useState, useContext, useRef, useEffect } from "react";
import flask from "../utils/axiosFlask"; // Flask backend
import axios from "../utils/axiosInstance"; // Node backend
import GeneralContext from "./GeneralContext";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { refreshWatchlist } = useContext(GeneralContext);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const input = e.target.value.toUpperCase();
    setQuery(input);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (input.length < 2) {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const exchanges = [".NS", ".BO"];
      const candidates = exchanges.map((suffix) => `${input}${suffix}`);
      const temp = [];

      await Promise.all(
        candidates.map(async (symbol) => {
          try {
            const res = await flask.get(`/price/${symbol}`);
            if (res.data && res.data.price) {
              temp.push({
                symbol: res.data.symbol,
                price: res.data.price,
                exchange: symbol.endsWith(".NS") ? "NSE" : "BSE",
              });
            }
          } catch {
            // ignore errors
          }
        })
      );

      setResults(temp);
      setLoading(false);
    }, 300);
  };

  const handleAdd = async (symbol) => {
    try {
      await axios.post("/api/watchlist", { symbol });
      refreshWatchlist();
      setQuery("");
      setResults([]);
    } catch (err) {
      console.error("Error adding stock:", err.message);
    }
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search eg: INFY, SBIN"
        className="search-input"
      />
      {loading && <div className="loading">Searching...</div>}
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
