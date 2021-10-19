import HttpClient from "./HttpClient";
import TokenService from "./TokenService";
import HttpClientOpenTrip from "./HttpClientOpenTrip";
import {
  TRIP,
  TRIP_DETAILS_OPEN_API,
  TRIPS_OPEN_API,
} from "../consts/endpoints";

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

  logout = () => TokenService.removeUser();

  getCurrentUser = () => TokenService.getUser();

  createTrip = (trip) => HttpClient.post(TRIP, trip);

  getTrips = () => HttpClient.get(TRIP);

  getTripsFromOpenTripAPI = (lonMin, lonMax, latMin, latMax) =>
    HttpClientOpenTrip.get(TRIPS_OPEN_API(lonMin, lonMax, latMin, latMax));

  getTripDetailsFromOpenTripAPI = (placeId) =>
    HttpClientOpenTrip.get(TRIP_DETAILS_OPEN_API(placeId));
}

export default new HttpService();
