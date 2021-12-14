/*global google*/

import { Component, createRef } from "react";
import { DirectionsRenderer, Marker, InfoWindow } from "react-google-maps";
import { isEmpty } from "lodash";
import styles from "./AttractionsMap.module.css";
import { CircularProgress } from "@material-ui/core";
import HttpService from "../../../services/HttpService";
import { Grid, Link, Typography } from "@mui/material";
import { WebAsset } from "@material-ui/icons";
import MapContainer from "../MapContainer/MapContainer";

class AttractionsMap extends Component {
  state = {
    attractions: [],
    selectedAttraction: null,
    loading: true,
  };

  fetchAttractions = (lonMin, lonMax, latMin, latMax) =>
    HttpService.getTripsFromOpenTripAPI(lonMin, lonMax, latMin, latMax)
      .then(({ data }) =>
        this.setState({ attractions: data.features, loading: false })
      )
      .catch(console.error);

  setSelectedAttraction = (item) => {
    console.log(item);
    const { markerMode, onAttractionClick } = this.props;
    this.setState({ loading: true });

    if (item) {
      if (markerMode) {
        onAttractionClick(item);
      } else {
        HttpService.getTripDetailsFromOpenTripAPI(item.properties.xid)
          .then(({ data }) => {
            this.setState({ selectedAttraction: data, loading: false });
          })
          .catch(console.error);
      }
    }
    this.setState({ selectedAttraction: item, loading: false });
  };

  mapRef = createRef();

  handleBoundsChanged = () => {
    this.props.setMapBounds(this.mapRef.current.getBounds());
    const northEast = this.mapRef.current.getBounds().getNorthEast();
    const southWest = this.mapRef.current.getBounds().getSouthWest();

    this.fetchAttractions(
      southWest.lng(),
      northEast.lng(),
      southWest.lat(),
      northEast.lat()
    );
  };

  render() {
    const loadingElement = (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );

    const { attractions, selectedAttraction, loading } = this.state;
    const { directions, markers, onMapClick } = this.props;

    const attractionLabel = () => (
      <InfoWindow onCloseClick={() => this.setSelectedAttraction(null)}>
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant={"h3"} textAlign={"center"}>
            {selectedAttraction.name}
          </Typography>
          {selectedAttraction?.wikipedia && (
            <>
              {selectedAttraction?.preview?.source && (
                <img
                  src={selectedAttraction.preview.source}
                  alt={"attraction preview source"}
                />
              )}
              <Typography variant={"h6"} mt={3}>
                Wikipedia:
              </Typography>
              {selectedAttraction.wikipedia_extracts.title}
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedAttraction.wikipedia_extracts.html,
                }}
              />
              <Link>
                <Grid container alignItems={"center"}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={selectedAttraction.wikipedia}
                  >
                    View Wikipedia article
                  </a>
                  <WebAsset />
                </Grid>
              </Link>
            </>
          )}
        </Grid>
      </InfoWindow>
    );

    return (
      <MapContainer
        containerElement={<div className={styles.mapContainer} />}
        mapElement={<div className={styles.map} />}
        loadingElement={loadingElement}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}`}
        onMapClick={(e) => {
          onMapClick(e);
          this.setSelectedAttraction(null);
        }}
        onBoundsChanged={this.handleBoundsChanged}
        mapRef={this.mapRef}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {!isEmpty(markers) &&
          markers.map((marker) => (
            <Marker
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              title={marker.title}
              name={marker.title}
              position={marker.position}
            />
          ))}

        {!isEmpty(attractions) &&
          attractions.map((marker) => (
            <Marker
              title={marker.properties.name}
              name={marker.properties.name}
              position={{
                lat: marker.geometry.coordinates[1],
                lng: marker.geometry.coordinates[0],
              }}
              onClick={() => this.setSelectedAttraction(marker)}
            >
              {!loading &&
                selectedAttraction &&
                selectedAttraction.point?.lat &&
                selectedAttraction.point?.lon &&
                marker.properties.xid === selectedAttraction.xid &&
                attractionLabel()}
            </Marker>
          ))}
      </MapContainer>
    );
  }
}

export default AttractionsMap;
