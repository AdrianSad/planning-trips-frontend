import React, { Component } from "react";
import Hero from "../../components/HomePage/Hero/Hero";
import Cards from "../../components/HomePage/Cards/Cards";
import Typography from "@material-ui/core/Typography";
import styles from "./HomePage.module.css";
import { Button, Container } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

class HomePage extends Component {
  render() {
    return (
      <main>
        <Hero />
        <Cards />
        <Container className={styles.container}>
          <Typography
            variant={"h2"}
            gutterBottom
            color={"primary"}
            align={"center"}
          >
            Create account today!
          </Typography>
          <Button
            variant={"outlined"}
            size={"large"}
            className={styles.button}
            endIcon={<AccountCircle />}
          >
            Sign Up
          </Button>
        </Container>
      </main>
    );
  }
}

export default HomePage;
