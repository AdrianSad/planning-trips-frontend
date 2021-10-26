import React, { Component } from "react";
import { Grid } from "@mui/material";
import { Spinner, TripItem } from "../../components";
import { isEmpty } from "lodash";
import HttpService from "../../services/HttpService";
import { Snackbar } from "@material-ui/core";

class TripsPage extends Component {
  state = {
    trips: [],
    loading: true,
    alert: {
      open: false,
      text: "",
    },
  };

  componentDidMount() {
    if (this.props.location?.state) {
      this.setState({
        alert: this.props.location.state.alert,
      });
    }
    this.fetchTrips();
  }

  fetchTrips = () =>
    HttpService.getTrips()
      .then(({ data }) => this.setState({ loading: false, trips: data.trips }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

  deleteTrip = (tripId) => {
    this.setState({ loading: true });

    HttpService.deleteTrip(tripId)
      .then(() => this.fetchTrips())
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  markTripAsDone = (tripId) => {
    this.setState({ loading: true });

    HttpService.markTripAsDone(tripId)
      .then(() => this.fetchTrips())
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  markTripAsUndone = (tripId) => {
    this.setState({ loading: true });

    HttpService.markTripAsUndone(tripId)
      .then(() => this.fetchTrips())
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  handleClose = () => this.setState({ alert: { open: false } });

  render() {
    const { trips, loading, alert } = this.state;

    return (
      <Grid
        container
        spacing={3}
        mt={5}
        mb={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "0 25px" }}
      >
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={alert?.text}
          style={{ color: "white" }}
        />
        <Spinner visible={loading} />
        {!loading &&
          !isEmpty(trips) &&
          trips.map((trip) => (
            <Grid item xs={10} md={4} lg={3} key={trip.id}>
              <TripItem
                trip={trip}
                onDone={this.markTripAsDone}
                onUndone={this.markTripAsUndone}
                onDelete={this.deleteTrip}
              />
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default TripsPage;
