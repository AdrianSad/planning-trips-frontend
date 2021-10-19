import { isEmpty } from "lodash";

export const parsePathToStaticMap = (
  markers,
  directionResponse,
  bounds,
  mapDim
) => {
  const zoom = getZoom(bounds, mapDim);

  if (isEmpty(markers) || isEmpty(directionResponse)) {
    return null;
  }

  let url = `https://maps.google.com/maps/api/staticmap?center=${markers[0].position.lat},${markers[0].position.lng}`;
  url =
    url +
    `&markers=${markers.map(
      (marker) => `${marker.position.lat},${marker.position.lng}|`
    )}`;

  url = url.slice(0, -1);
  url =
    url +
    `&path=color:blue|enc:${directionResponse.routes[0].overview_polyline}&zoom=${zoom}&size=1024x1024&maptype=roadmap&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`;

  url = url.replaceAll("|,", "|");
  return url;
};

const getZoom = (bounds, mapDim) => {
  const WORLD_DIM = { height: 400, width: 400 };
  const ZOOM_MAX = 21;

  function latRad(lat) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  const lngDiff = ne.lng() - sw.lng();
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};
