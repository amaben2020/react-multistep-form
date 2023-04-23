import axios from "axios";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3005";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as any;

axiosClient.defaults.withCredentials = true;

// https://masteringjs.io/tutorials/axios/interceptors

//Axios interceptors are functions that Axios calls for every request
axiosClient.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});

axiosClient.interceptors.response.use((res) => {
  console.log("Returned data", res.data);
  // Important: response interceptors **must** return the response.
  return res;
});

// Setting headers
axiosClient.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify
  // the `headers`.
  req.headers.authorization = "my secret token which may be a test";

  req.headers["Content-Type"] = "application/json";
  return req;
});

// Error handling
axiosClient.interceptors.response.use(
  (res) => {
    console.log("response", res);
    return res;
  },
  (err) => {
    console.log("Error", err);
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found for this endpoint`);
    }
    throw err;
  },
);

// Automatically sets the authorization header because
// of the request interceptor
// const err = await axios.get('https://httpbin.org/status/404').
//   then(() => null, err => err);

// err.message; // "https://httpbin.org/status/404 not found"
