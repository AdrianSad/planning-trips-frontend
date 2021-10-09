import axios from "axios";
import TokenService from "./TokenService";

const HttpClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const LOGIN_ROUTE = "/api/v1/user/login";
const REGISTER_ROUTE = "/api/v1/user/register";

HttpClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    console.log(config);

    if (token && config.url !== LOGIN_ROUTE && config.url !== REGISTER_ROUTE) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== LOGIN_ROUTE && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await HttpClient.post("/api/v1/user/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return HttpClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default HttpClient;
