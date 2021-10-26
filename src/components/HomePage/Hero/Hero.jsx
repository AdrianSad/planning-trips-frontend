import React from "react";
import { HomePageBackground } from "../../../assets";
import styles from "./Hero.module.css";
import Bike from "../Bike/Bike";
import { Button } from "@material-ui/core";
import { MapOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { NEW_TRIP } from "../../../consts/routes";
import { useHistory } from "react-router";

const Hero = () => {
  const history = useHistory();

  const navigateToCreateTripPage = () => history.push(NEW_TRIP);

  return (
    <div className={styles.container}>
      <img
        src={HomePageBackground}
        alt={"Home page hero"}
        className={styles.backgroundImg}
      />
      <Button
        variant={"outlined"}
        size={"large"}
        className={styles.button}
        color={"white"}
        onClick={navigateToCreateTripPage}
        endIcon={<MapOutlined />}
      >
        Plan your first trip
      </Button>
      <Bike reversed />
      <Bike />
    </div>
  );
};

export default Hero;
