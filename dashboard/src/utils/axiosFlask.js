// src/utils/axiosFlask.js
import axios from "axios";

const flaskInstance = axios.create({
  baseURL: "http://localhost:5001", // Flask (yfinance)
});

export default flaskInstance;
