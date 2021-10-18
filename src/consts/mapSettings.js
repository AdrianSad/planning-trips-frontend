export const MAP_SETTINGS = {
  defaultCenter: { lat: 51.06, lng: 17.0159 },
  defaultZoom: 13,
};

export const MAP_STYLES = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: "32",
      },
      {
        lightness: "-3",
      },
      {
        visibility: "on",
      },
      {
        weight: "1.18",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        saturation: "-70",
      },
      {
        lightness: "14",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: "100",
      },
      {
        lightness: "-14",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        lightness: "12",
      },
    ],
  },
];