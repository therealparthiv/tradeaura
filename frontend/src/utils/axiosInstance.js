import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3002", // your backend
  withCredentials: true, // ✅ send cookies
});

export default instance;
