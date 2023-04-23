import axios from "axios";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3005";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as any;

axiosClient.defaults.withCredentials = true;
