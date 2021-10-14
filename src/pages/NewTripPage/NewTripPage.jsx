import React, { Component } from "react";
import { MapContainer } from "../../components";
import { CssBaseline, Grid } from "@material-ui/core";
import styles from "./NewTripPage.module.css";
import { withScriptjs } from "react-google-maps";

class NewTripPage extends Component {
  state = {
    markers: [],
  };

  mapClicked = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const position = { lat, lng };

    console.log(clickEvent);

    this.setState((prevState) => ({
      markers: [
        ...prevState.markers,
        { position, title: prevState.markers.length + 1 },
      ],
    }));
  };

  render() {
    const { markers } = this.state;
    const MapLoader = withScriptjs(MapContainer);

    return (
      <Grid container>
        <Grid item md={8}>
          <MapLoader
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRDJDdcCXe56R7a0gwtqGKN1KmgPrusbI"
            loadingElement={<div style={{ height: `100%` }} />}
          />
        </Grid>
        <Grid item md={4} className={styles.rightContainer}>
          <Grid
            container
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={8}>
              container 1
            </Grid>
            <CssBaseline />
            <Grid item md={4}>
              container 2
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewTripPage;
