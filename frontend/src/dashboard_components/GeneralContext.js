import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance"; // ✅ CORRECTED PATH

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("/user-details");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get("/watchlist");
      setWatchlist(response.data);
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchWatchlist();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        watchlist,
        setWatchlist,
        fetchWatchlist,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};
