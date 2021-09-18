import React from "react";
import { HomePageBackground } from "../../../assets";
import styles from "./Hero.module.css";
import Bike from "../Bike/Bike";
import { Button } from "@material-ui/core";
import { MapOutlined, TripOrigin } from "@material-ui/icons";

const Hero = () => {
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
