import axios from "axios";

const HttpClientOpenTrip = axios.create({
  baseURL: "https://api.opentripmap.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default HttpClientOpenTrip;
