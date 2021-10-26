import React, { Component } from "react";
import Hero from "../../components/HomePage/Hero/Hero";
import Cards from "../../components/HomePage/Cards/Cards";
import styles from "./HomePage.module.css";
import { Button, Container, Snackbar, Typography } from "@mui/material";
import { AccountCircle } from "@material-ui/icons";

class HomePage extends Component {
  state = {
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
  }

  handleClose = () => this.setState({ alert: { open: false } });

  render() {
    const { alert } = this.state;
    return (
      <main>
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={alert?.text}
          className={styles.snackbar}
        />
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
            sx={{ marginBottom: "50px" }}
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
