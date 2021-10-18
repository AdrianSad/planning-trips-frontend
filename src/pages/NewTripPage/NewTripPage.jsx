/*global google*/

import React, { Component } from "react";
import { DraggableList, Spinner } from "../../components";
import {
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { reorder } from "../../utils/arrayUtils";
import { last } from "lodash/array";
import { TRAVEL_MODES } from "../../consts/travelMode";
import { AccessTime, DirectionsWalk, Info, Map } from "@material-ui/icons";
import AttractionsMap from "../../components/Map/AttractionsMap/AttractionsMap";
import HttpService from "../../services/HttpService";
import { Snackbar } from "@material-ui/core";

class NewTripPage extends Component {
  state = {
    markers: [],
    markerMode: false,
    travelMode: "",
    directions: null,
    center: null,
    coordsResult: [],
    loading: false,
    alert: {
      open: false,
      text: "",
    },
  };

  mapClicked = (clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const position = { lat, lng };

    if (this.state.markerMode) {
      this.setState((prevState) => ({
        markers: [
          ...prevState.markers,
          {
            position,
            title: `Marker number ${prevState.markers.length + 1}`,
            id: `item ${prevState.markers.length}`,
          },
        ],
      }));
    }
  };

  addAttractionMapMarker = (attraction) => {
    this.setState((prevState) => ({
      markers: [
        ...prevState.markers,
        {
          position: {
            lat: attraction.geometry.coordinates[1],
            lng: attraction.geometry.coordinates[0],
          },
          title: attraction.properties.name,
          id: attraction.id,
        },
      ],
    }));
  };

  calculateDirections = () => {
    const { markers, travelMode } = this.state;
    this.setState({ loading: true });

    if (markers.length < 2) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    const origin = markers[0].position;
    const destination = last(markers).position;

    const waypoints = markers.slice(1, -1).map((item) => ({
      location: new google.maps.LatLng(item.position.lat, item.position.lng),
    }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[travelMode?.value || "WALKING"],
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
        this.setState({ loading: false });
      }
    );
  };

  onSwitchChange = (e) =>
    this.setState((prevState) => ({
      [e.target.name]: !prevState[e.target.name],
    }));

  onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;

    const { markers } = this.state;
    const newItems = reorder(markers, source.index, destination.index);

    this.setState({ markers: newItems });
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  createTrip = () => {
    this.setState({ loading: true });

    const { directions, travelMode, markers } = this.state;

    HttpService.createTrip({
      estimatedTime: parseFloat(directions?.routes[0]?.legs[0]?.duration?.text),
      estimatedLength: parseFloat(
        directions?.routes[0]?.legs[0]?.distance?.text
      ),
      route: JSON.stringify(directions || ""),
      travelMode: travelMode?.value || TRAVEL_MODES[0].value,
      markers: markers.map((marker) => ({
        ...marker,
        position: {
          latitude: marker.position.lat,
          longitude: marker.position.lng,
        },
      })),
    })
      .then(() =>
        this.setState({
          loading: false,
          alert: {
            open: false,
            text: "",
          },
        })
      )
      .catch((error) => {
        console.error(error?.response?.data);
        this.setState({
          loading: false,
          alert: {
            open: true,
            text: `Error occured while creating trip: ${JSON.stringify(
              error?.response?.data?.errors
            )}`,
          },
        });
      });
  };

  handleClose = () => this.setState({ alert: { open: false } });

  render() {
    const { markers, markerMode, directions, travelMode, alert, loading } =
      this.state;

    return (
      <Grid container>
        <Spinner visible={loading} />
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={alert?.text}
          style={{ color: "red" }}
        />
        <Grid item md={8}>
          <AttractionsMap
            markers={markers}
            directions={directions}
            markerMode={markerMode}
            onAttractionClick={this.addAttractionMapMarker}
            onMapClick={this.mapClicked}
          />
        </Grid>
        <Grid item md={4}>
          <Grid
            container
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={2}
          >
            <Grid
              item
              md={8}
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ maxHeight: "250px", overflowY: "scroll", height: "250px" }}
            >
              <DraggableList items={markers} onDragEnd={this.onDragEnd} />
            </Grid>
            <CssBaseline />
            <Grid
              item
              md={4}
              container
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ padding: "0 24px", gap: "20px" }}
            >
              <Grid justifyContent={"center"} container>
                <Info />
                <Typography variant={"subtitle2"} textAlign={"center"}>
                  In marker mode you can add pins on map. Otherwise you can
                  check details of chosen attraction.
                </Typography>
              </Grid>
              <FormControlLabel
                control={
                  <Switch
                    id={"markerMode"}
                    name={"markerMode"}
                    checked={markerMode}
                    onChange={this.onSwitchChange}
                    size={"medium"}
                  />
                }
                label="Marker mode"
              />
              <FormControl fullWidth sx={{ margin: "24px 0" }}>
                <InputLabel id="travel-mode">Travel mode</InputLabel>
                <Select
                  labelId="travel-mode"
                  id="travelMode"
                  name={"travelMode"}
                  value={travelMode}
                  label="Age"
                  onChange={this.handleChange}
                >
                  {TRAVEL_MODES.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant={"outlined"}
                onClick={this.calculateDirections}
                size={"large"}
              >
                Calculate Route
              </Button>
              <Button
                variant={"contained"}
                size={"large"}
                onClick={this.createTrip}
              >
                Create Trip
              </Button>
            </Grid>
            {directions && (
              <Grid
                container
                direction={"column"}
                alignItems={"center"}
                sx={{ marginTop: "24px" }}
              >
                <Typography variant={"h6"}>Informacje o trasie</Typography>

                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{ marginTop: "16px" }}
                >
                  <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    flex={1}
                  >
                    <AccessTime />
                    <Grid item>
                      <Typography variant={"subtitle2"}>
                        Czas trwania trasy
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={"subtitle1"} color={"blue"}>
                        {directions?.routes[0]?.legs[0]?.duration?.text ||
                          "Brak czasu trwania trasy"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    flex={1}
                  >
                    <DirectionsWalk />
                    <Grid item>
                      <Typography variant={"subtitle2"}>
                        Długość trasy
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={"subtitle1"} color={"blue"}>
                        {directions?.routes[0]?.legs[0]?.distance?.text ||
                          "Brak długości trasy"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewTripPage;
