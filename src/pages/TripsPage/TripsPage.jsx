import React, { Component } from "react";
import { Grid } from "@mui/material";
import { Spinner, TripItem } from "../../components";
import { isEmpty } from "lodash";
import HttpService from "../../services/HttpService";

class TripsPage extends Component {
  state = {
    trips: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchTrips();
  }

  fetchTrips = () =>
    HttpService.getTrips()
      .then(({ data }) => this.setState({ loading: false, trips: data.trips }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

  render() {
    const { trips, loading } = this.state;

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
        <Spinner visible={loading} />
        {!loading &&
          !isEmpty(trips) &&
          trips.map((trip) => (
            <Grid item xs={10} md={4} lg={3} key={trip.id}>
              <TripItem
                trip={trip}
                onDone={"test"}
                onUndone={"test"}
                onDelete={"test"}
              />
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default TripsPage;
