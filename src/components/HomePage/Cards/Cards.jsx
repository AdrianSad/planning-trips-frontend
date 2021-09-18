import React from "react";
import { Box, CardContent, CardMedia, Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { MapPin, Scrolling, Sightseeing } from "../../../assets";
import styles from "./Cards.module.css";

const Cards = () => {
  return (
    <Container className={styles.container}>
      <Box sx={{ m: 4 }} className={styles.card}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography variant={"h5"}>Plan your journey</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Add pins on map and watch how we calculate your path!
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component={"img"}
          alt={"sightseeing"}
          sx={{ objectFit: "cover" }}
          height={"300"}
          image={MapPin}
        />
      </Box>
      <Box sx={{ m: 4 }} className={styles.card}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography variant={"h5"}>Sightseeing tours</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Visit as many places as you wish.
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component={"img"}
          alt={"sightseeing"}
          sx={{ objectFit: "cover" }}
          height={"450"}
          image={Sightseeing}
        />
      </Box>
      <Box sx={{ m: 4 }} className={styles.card}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography variant={"h5"}>Review trip history</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Scroll through the list of your previous trips and reminisce about
              how amazing it was.
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component={"img"}
          alt={"sightseeing"}
          sx={{ objectFit: "cover" }}
          height={"300"}
          image={Scrolling}
        />
      </Box>
    </Container>
  );
};

export default Cards;
