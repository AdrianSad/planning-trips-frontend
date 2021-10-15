import React, { Component } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { avatarIcon, HomePageBackground } from "../../assets";

const styles = {
  paperContainer: {
    backgroundImage: `url(${HomePageBackground})`,
  },
};

class ProfilePage extends Component {
  render() {
    return (
      <Container maxWidth style={{ padding: "0" }}>
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
            Username
          </Typography>
          <Typography justifyContent={"center"} variant={"subtitle1"}>
            Joined 25-01-2021
          </Typography>

          <Grid
            container
            justifyContent={"space-around"}
            alignItems={"center"}
            mt={5}
          >
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
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

export default ProfilePage;
