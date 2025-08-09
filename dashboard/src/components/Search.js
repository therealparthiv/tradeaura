import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "../utils/axiosInstance";
import GeneralContext from "./GeneralContext";
import SearchIcon from "@mui/icons-material/Search"; // 1. Import the icon
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { refreshWatchlist } = useContext(GeneralContext);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

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
    const input = e.target.value;
    setQuery(input);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (input.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/search-stocks?q=${input}`);
        setResults(res.data);
      } catch (err) {
        console.error("Failed to search for stocks:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleAdd = async (symbol) => {
    try {
      await axios.post("/api/watchlist", { symbol });
      refreshWatchlist();
      setQuery("");
      setResults([]);
    } catch (err) {
      alert(err.response?.data?.error || `Could not add ${symbol}.`);
      console.error("Error adding stock:", err.message);
    }
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      {/* 2. Add a container and the icon */}
      <div className="search-input-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search e.g., Infosys, ITC"
          className="search-input"
          autoComplete="off"
        />
      </div>
      {loading && <div className="loading-text">Searching...</div>}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((stock) => (
            <li key={stock.symbol} className="search-item">
              <div className="stock-info">
                <strong>{stock.symbol}</strong>
                <span>{stock.name}</span>
              </div>
              <button
                className="add-btn"
                title={`Add ${stock.symbol} to watchlist`}
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
