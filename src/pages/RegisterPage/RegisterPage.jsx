import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { LockRounded } from "@material-ui/icons";
import { HOME, LOGIN } from "../../consts/routes";
import { Link as NavigationLink, withRouter } from "react-router-dom";
import HttpService from "../../services/HttpService";
import styles from "./RegisterPage.module.css";
import { GradientButton } from "../../components";

class RegisterPage extends React.Component {
  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      HttpService.register(
        data.get("username"),
        data.get("email"),
        data.get("password")
      )
        .then(() =>
          this.props.history.push({
            pathname: LOGIN,
            state: {
              alert: {
                open: true,
                text: "You created account successfully",
              },
            },
          })
        )
        .catch((err) => console.error(err));
    };

    return (
      <main className={styles.container}>
        <Container component="main" maxWidth="xs" className={styles.form}>
          <CssBaseline />
          <LockRounded />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="acceptRules" color="primary" />}
                  label="I accept application rules and policy."
                />
              </Grid>
            </Grid>
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </GradientButton>
            <Grid container justifyContent="center">
              <Grid item>
                <Link variant="body2">
                  <NavigationLink to={LOGIN}>
                    Already have an account? Sign in
                  </NavigationLink>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

export default withRouter(RegisterPage);
