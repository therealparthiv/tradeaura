import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/auth/profile")
      .then(() => setAuthChecked(true))
      .catch(() => {
        alert("Unauthorized! Redirecting to login...");
        window.location.href = "http://localhost:3000/login"; // from frontend app
      });
  }, []);

  if (!authChecked) return <p>Loading...</p>;

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
