import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import HttpService from "../../services/HttpService";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { HOME, REGISTER } from "../../consts/routes";
import { actions } from "../../store/reducer/authReducer";
import styles from "./LoginPage.module.css";
import { GradientButton, Spinner } from "../../components";

class LoginPage extends React.Component {
  state = {
    alert: {
      open: false,
      text: "",
    },
    loading: false,
  };

  componentDidMount() {
    if (this.props.location?.state) {
      this.setState({
        alert: this.props.location.state.alert,
      });
    }
  }

  handleClose = () => this.setState({ alert: { open: false } });

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    this.setState({ loading: true });

    HttpService.login(data.get("email"), data.get("password"))
      .then((response) => {
        this.props.setUserData(response);
        this.props.history.push({
          pathname: HOME,
          state: {
            alert: {
              open: true,
              text: "You logged in successfully",
            },
          },
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          alert: {
            open: true,
            text: "Something went wrong",
          },
          loading: false,
        });
      });
  };

  render() {
    const { alert, loading } = this.state;
    return (
      <main>
        <Spinner visible={loading} />
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={alert?.text}
          style={{ color: "white" }}
        />
        <Grid container component="main" sm={{ mt: 4 }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1632772196297-39ab1598668a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM3NjI2OQ&ixlib=rb-1.2.1&q=80&w=1080)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh",
            }}
          >
            <img
              src={
                "https://images.unsplash.com/photo-1632772196297-39ab1598668a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM3NjI2OQ&ixlib=rb-1.2.1&q=80&w=1080"
              }
              alt={""}
              style={{ height: "100vh", width: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 20,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LockOutlined />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 5 }}
                >
                  Sign In
                </GradientButton>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link to={REGISTER} className={styles.link}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>
    );
  }
}

const mapDispatchToProps = {
  setUserData: actions.setUserData,
};

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));
