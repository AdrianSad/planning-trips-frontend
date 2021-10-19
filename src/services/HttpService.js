import HttpClient from "./HttpClient";
import TokenService from "./TokenService";
import HttpClientOpenTrip from "./HttpClientOpenTrip";
import {
  TRIP,
  TRIP_DELETE,
  TRIP_DETAILS_OPEN_API,
  TRIP_DONE,
  TRIP_UNDONE,
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

  deleteTrip = (tripId) => HttpClient.delete(TRIP_DELETE(tripId));

  markTripAsDone = (tripId) => HttpClient.patch(TRIP_DONE(tripId));

  markTripAsUndone = (tripId) => HttpClient.patch(TRIP_UNDONE(tripId));

  getTripsFromOpenTripAPI = (lonMin, lonMax, latMin, latMax) =>
    HttpClientOpenTrip.get(TRIPS_OPEN_API(lonMin, lonMax, latMin, latMax));

  getTripDetailsFromOpenTripAPI = (placeId) =>
    HttpClientOpenTrip.get(TRIP_DETAILS_OPEN_API(placeId));
}

export default new HttpService();
