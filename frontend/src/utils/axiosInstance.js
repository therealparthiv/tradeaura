import axios from "axios";

const instance = axios.create({
  baseURL: "https://tradeaura-backend.onrender.com", // your backend
  withCredentials: true, // ✅ send cookies
});

export default instance;
