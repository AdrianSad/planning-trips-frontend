import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Component } from "react";
import { isEmpty } from "lodash";
import { CircularProgress, Grid } from "@material-ui/core";

class MapContainer extends Component {
  state = {
    places: [],
  };

  searchNearby = (map, center) => {
    const { google } = this.props;

    const service = new google.maps.places.PlacesService(map);

    // Specify location, radius and place types for your Places API search.
    const request = {
      location: center,
      radius: "500",
      type: ["food"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({ places: results });
    });
  };

  render() {
    const containerStyle = {
      position: "relative",
      width: "100%",
      height: "100vh",
    };

    const mapStyle = [
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#dceafa",
          },
        ],
      },
    ];

    const mapLoaded = (mapProps, map) => {
      map.setOptions({
        styles: mapStyle,
      });
      this.searchNearby(map, map.center);
    };

    return (
      <Map
        google={this.props.google}
        zoom={7}
        containerStyle={containerStyle}
        initialCenter={{
          lat: 52.065162,
          lng: 19.252522,
        }}
        onReady={(mapProps, map) => mapLoaded(mapProps, map)}
        // onClick={this.props.mapClicked}
      >
        {!isEmpty(this.props.markers) &&
          this.props.markers.map((marker) => (
            <Marker
              title={`${marker.title} title`}
              name={"TEST"}
              position={marker.position}
            />
          ))}
      </Map>
    );
  }
}

const Loading = () => (
  <Grid container justifyContent={"center"} alignItems={"center"}>
    <CircularProgress />
  </Grid>
);

export default GoogleApiWrapper({
  apiKey: "",
  libraries: ["places"],
  LoadingContainer: Loading,
})(MapContainer);
