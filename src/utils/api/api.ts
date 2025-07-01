import axios from "axios";
import { API_KEY, API_URL } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  },
});

export default api;
