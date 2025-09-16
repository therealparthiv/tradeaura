import axios from "axios";

const instance = axios.create({
  baseURL: "https://tradeaura-backend.onrender.com",
  withCredentials: true, // ✅ always send cookies
});

export default instance;
