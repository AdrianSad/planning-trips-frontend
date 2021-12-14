import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Check, Clear, Delete, Map } from "@material-ui/icons";

const TripItem = ({
  trip,
  onDone,
  onUndone,
  onDelete,
  navigateToGoogleMaps,
}) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/trip/${trip.id}`}>
        <CardMedia image={trip.image} sx={{ height: "300px" }} />
        <CardContent>
          <Typography variant="h6" color="textSecondary" noWrap>
            {trip.category}
          </Typography>
          <Typography variant="h5" color="textPrimary" noWrap>
            Your trip informations
          </Typography>
          <Typography variant="h6" color="textSecondary" noWrap>
            Estimated time: {trip.estimatedTime.toFixed(2)}h
          </Typography>
          <Typography variant="h6" color="textSecondary" noWrap>
            Estimated length: {trip.estimatedLength.toFixed(2)}km
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-end"
          sx={{ width: "100%" }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            {onDone && (
              <IconButton
                sx={{ color: trip.done ? "#7CFC00" : "gray" }}
                aria-label="add to favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  onDone(trip.id);
                }}
              >
                <Check />
                Done
              </IconButton>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            {onUndone && (
              <IconButton
                sx={{ color: trip.done ? "gray" : "red" }}
                aria-label="share"
                onClick={(e) => {
                  e.stopPropagation();
                  onUndone(trip.id);
                }}
              >
                <Clear />
                Undone
              </IconButton>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            {onDelete && (
              <IconButton
                aria-label="share"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(trip.id);
                }}
              >
                <Delete />
                Delete
              </IconButton>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            {navigateToGoogleMaps && (
              <IconButton
                sx={{ color: "#DD4B3E" }}
                aria-label="share"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToGoogleMaps(trip);
                }}
              >
                <Map />
                Send to Google Maps
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default TripItem;
