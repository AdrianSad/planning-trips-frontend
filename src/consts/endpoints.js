export const LOGIN = "/api/v1/user/login";
export const REGISTER = "/api/v1/user/register";
export const REFRESH_TOKEN = "/api/v1/user/refreshtoken";

export const TRIP = "/api/v1/trip";
export const TRIP_DELETE = (tripId) => `/api/v1/trip/${tripId}/delete`;
export const TRIP_DONE = (tripId) => `/api/v1/trip/${tripId}/done`;
export const TRIP_UNDONE = (tripId) => `/api/v1/trip/${tripId}/undone`;

export const TRIPS_OPEN_API = (lonMin, lonMax, latMin, latMax) =>
  `/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&kinds=interesting_places&src_attr=wikidata&apikey=${process.env.REACT_APP_OPEN_TRIP_API}`;
export const TRIP_DETAILS_OPEN_API = (placeId) =>
  `/0.1/en/places/xid/${placeId}?apikey=${process.env.REACT_APP_OPEN_TRIP_API}`;
