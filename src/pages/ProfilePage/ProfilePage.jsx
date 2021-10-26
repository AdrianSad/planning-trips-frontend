import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { avatarIcon, HomePageBackground } from "../../assets";
import HttpService from "../../services/HttpService";
import { Spinner } from "../../components";
import { EDIT_USER } from "../../consts/routes";
import { withRouter } from "react-router-dom";
import CountUp from "react-countup";
import {
  AccessTime,
  DirectionsRun,
  Fireplace,
  Timelapse,
  Whatshot,
} from "@material-ui/icons";

const styles = {
  paperContainer: {
    backgroundImage: `url(${HomePageBackground})`,
  },
};

class ProfilePage extends Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () =>
    HttpService.getCurrentUserData()
      .then(({ data }) => this.setState({ loading: false, user: data }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

  render() {
    const { loading, user } = this.state;

    return (
      <Container maxWidth style={{ padding: "0" }}>
        <Spinner visible={loading} />
        <Paper style={styles.paperContainer} sx={{ height: "30vh" }} />
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ marginTop: "-64px" }}
        >
          <Avatar
            alt={"Profile avatar"}
            src={avatarIcon}
            sx={{ height: "128px", width: "128px" }}
          />
          <Typography justifyContent={"center"} variant={"h3"}>
            {user?.username}
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"}>
            You joined{" "}
            {user?.createdDate && user?.createdDate.toString().split("T")[0]}
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"} mt={3}>
            {user?.weight && `Weight : ${user.weight}kg`}
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"}>
            {user?.height && `Height : ${user.height}cm`}
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"}>
            {user?.age && `Age : ${user.age} years old`}
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"}>
            {user?.gender && `Gender : ${user.gender}`}
          </Typography>
          <Button
            size={"large"}
            variant={"outlined"}
            sx={{ marginTop: "24px" }}
            onClick={() => this.props.history.push(EDIT_USER)}
          >
            Edit your body properties
          </Button>

          <Grid
            container
            justifyContent={"space-around"}
            alignItems={"center"}
            mt={5}
            mb={5}
          >
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Whatshot
                    style={{
                      width: "100%",
                      height: "64px",
                      textAlign: "center",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 32 }}
                    color="text.secondary"
                    gutterBottom
                    textAlign={"center"}
                  >
                    <CountUp
                      end={user?.statistics?.caloriesBurned}
                      duration={5}
                      delay={1}
                    />
                  </Typography>
                  <Typography textAlign={"center"} variant={"h6"}>
                    Calories burnt
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <DirectionsRun
                    style={{
                      width: "100%",
                      height: "64px",
                      textAlign: "center",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 32 }}
                    color="text.secondary"
                    gutterBottom
                    textAlign={"center"}
                  >
                    <CountUp
                      end={user?.statistics?.kilometersTraveled}
                      duration={5}
                      delay={1}
                    />
                  </Typography>
                  <Typography textAlign={"center"} variant={"h6"}>
                    Kilometers traveled
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <AccessTime
                    style={{
                      width: "100%",
                      height: "64px",
                      textAlign: "center",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 32 }}
                    color="text.secondary"
                    gutterBottom
                    textAlign={"center"}
                  >
                    <CountUp
                      end={user?.statistics?.hoursSpent}
                      duration={5}
                      delay={1}
                    />
                  </Typography>
                  <Typography textAlign={"center"} variant={"h6"}>
                    Time spent
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(ProfilePage);
