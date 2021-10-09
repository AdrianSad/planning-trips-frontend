import * as React from "react";
import {
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Snackbar,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { LockRounded } from "@material-ui/icons";
import { LOGIN } from "../../consts/routes";
import { Link as NavigationLink, withRouter } from "react-router-dom";
import HttpService from "../../services/HttpService";
import styles from "./RegisterPage.module.css";
import { GradientButton } from "../../components";
import { validateRegisterForm } from "../../utils/validationUtils";
import { isEmpty } from "lodash";

class RegisterPage extends React.Component {
  state = {
    alert: {
      open: false,
      text: "",
    },
    errors: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { errors } = this.state;
    const newErrors = validateRegisterForm(
      errors,
      data.get("username"),
      data.get("email"),
      data.get("password"),
      data.get("acceptRules")
    );

    console.log(data.get("acceptRules"));
    console.log(newErrors);
    console.log(Object.values(newErrors));
    console.log(Object.values(newErrors).every(Boolean));

    if (Object.values(newErrors).every((it) => it === false)) {
      HttpService.register(
        data.get("username"),
        data.get("email"),
        data.get("password")
      )
        .then(() =>
          this.props.history.push({
            pathname: LOGIN,
            state: {
              errors: null,
              alert: {
                open: true,
                text: "You created account successfully",
              },
            },
          })
        )
        .catch((err) => {
          console.error(err);
          this.setState({
            alert: {
              open: true,
              text: "Account with this email already exists",
            },
          });
        });
    } else {
      this.setState({
        errors: newErrors,
        alert: {
          open: true,
          text: "Form has errors",
        },
      });
    }
  };

  handleClose = () => this.setState({ alert: { open: false } });

  render() {
    const { alert, errors } = this.state;
    return (
      <main className={styles.container}>
        <Snackbar
          open={alert?.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={alert?.text}
          style={{ color: "red" }}
        />
        <Container component="main" maxWidth="xs" className={styles.form}>
          <CssBaseline />
          <LockRounded />
          <Typography component="h1" variant="h5" className={styles.header}>
            Sign up
          </Typography>
          <Grid
            component="form"
            noValidate
            onSubmit={this.handleSubmit}
            sx={{ mt: 5 }}
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
                  variant={"outlined"}
                  autoFocus
                  helperText={errors?.username}
                  error={!isEmpty(errors?.username)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={"outlined"}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors?.email}
                  error={!isEmpty(errors?.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={"outlined"}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors?.password}
                  error={!isEmpty(errors?.password)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={"acceptRules"}
                      id={"acceptRules"}
                      value="acceptRules"
                      color="primary"
                    />
                  }
                  label="I accept application rules and policy."
                />
                {errors?.acceptRules && (
                  <FormHelperText error>
                    You have to accept rules and policy
                  </FormHelperText>
                )}
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
