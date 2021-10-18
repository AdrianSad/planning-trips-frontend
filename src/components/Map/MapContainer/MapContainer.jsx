import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { MAP_SETTINGS, MAP_STYLES } from "../../../consts/mapSettings";

const MapContainer = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultCenter={MAP_SETTINGS.defaultCenter}
      defaultZoom={MAP_SETTINGS.defaultZoom}
      defaultOptions={{ styles: MAP_STYLES }}
      onClick={props.onMapClick}
      ref={props.mapRef}
      onIdle={props.onBoundsChanged}
    >
      {props.children}
    </GoogleMap>
  ))
);

export default MapContainer;
