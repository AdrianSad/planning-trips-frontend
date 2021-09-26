import HttpClient from "./HttpClient";
import TokenService from "./TokenService";

class AuthService {
  login(username, password) {
    return HttpClient.post(
      "/auth/realms/PlanningTrips/protocol/openid-connect/token",
      {
        username,
        password,
      }
    ).then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return HttpClient.post("/auth/realms/PlanningTrips/users", {
      username,
      email,
      credentials: [
        {
          value: password,
          temporary: false,
          type: "PASSWORD",
        },
      ],
    });
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();
