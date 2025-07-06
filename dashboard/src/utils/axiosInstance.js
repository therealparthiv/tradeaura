import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3002", // your backend
  withCredentials: true, // ✅ send JWT cookie
});

export default instance;
