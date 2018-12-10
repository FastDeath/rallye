import axios from "axios";

export const Api = axios.create({
  baseURL: "/api/v1",
  headers: {
    // Authorization: "Bearer " + localStorage.token
  }
});

Api.interceptors.request.use(
  config => {
    // console.log("intercept", config.headers);
    if (localStorage.token) {
      config.headers["Authorization"] = "Bearer " + localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
