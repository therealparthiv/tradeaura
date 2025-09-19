// src/utils/axiosInstance.js

import axios from "axios";

const instance = axios.create({
  // The proxy in vercel.json will handle routing this to the backend
  baseURL: "/api",
  withCredentials: true, // Crucial for sending the auth cookie
});

export default instance;
