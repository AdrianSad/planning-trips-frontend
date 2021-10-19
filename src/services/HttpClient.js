import axios from "axios";
import TokenService from "./TokenService";
import { LOGIN, REFRESH_TOKEN, REGISTER } from "../consts/endpoints";

const HttpClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();

    if (token && config.url !== LOGIN && config.url !== REGISTER) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HttpClient;
