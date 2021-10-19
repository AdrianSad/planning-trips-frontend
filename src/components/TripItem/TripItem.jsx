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
import { Check, Delete, RemoveCircle } from "@material-ui/icons";

const TripItem = ({ trip, onDone, onUndone, onDelete }) => {
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
            Estimated time: {trip.estimatedTime}
          </Typography>
          <Typography variant="h6" color="textSecondary" noWrap>
            Estimated length: {trip.estimatedLength}
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
                aria-label="share"
                onClick={(e) => {
                  e.stopPropagation();
                  onUndone(trip.id);
                }}
              >
                <RemoveCircle />
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
        </Grid>
      </CardActions>
    </Card>
  );
};

export default TripItem;
