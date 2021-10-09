import HttpClient from "./HttpClient";
import TokenService from "./TokenService";

class HttpService {
  register = (username, email, password) => {
    return HttpClient.post("/api/v1/user/register", {
      username,
      email,
      password,
    });
  };

  login = (email, password) => {
    return HttpClient.post("/api/v1/user/login", {
      email,
      password,
    }).then((response) => {
      if (response.data.access_token) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
  };

  logout() {
    TokenService.removeUser();
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new HttpService();
