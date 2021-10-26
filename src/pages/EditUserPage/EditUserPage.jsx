import React, { Component } from "react";
import HttpService from "../../services/HttpService";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Spinner } from "../../components";
import { validateUserBodyForm } from "../../utils/validationUtils";
import { PROFILE } from "../../consts/routes";
import { withRouter } from "react-router-dom";

const steps = [
  "Insert your body weight",
  "How tall are you?",
  "How old are you?",
  "Choose your gender",
];

class EditUserPage extends Component {
  state = {
    loading: true,
    user: {},
    activeStep: 0,
    form: {
      age: null,
      weight: null,
      height: null,
      gender: null,
    },
    errors: {
      age: null,
      weight: null,
      height: null,
    },
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () =>
    HttpService.getCurrentUserData()
      .then(({ data }) =>
        this.setState({
          loading: false,
          user: data,
          form: {
            age: data.age,
            weight: data.weight,
            height: data.height,
            gender: data.gender,
          },
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

  handleNext = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        activeStep: prevState.activeStep + 1,
      }),
      this.submitForm
    );
  };

  handleBack = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  validate = () => {
    const { errors } = this.state;
    const { weight, height, age, gender } = this.state.form;

    this.setState({
      errors: validateUserBodyForm(errors, weight, height, age, gender),
    });
  };

  handleFieldChange = (e) =>
    this.setState(
      (prevState) => ({
        ...prevState,
        form: { ...prevState.form, [e.target.name]: e.target.value },
      }),
      this.validate
    );

  submitForm = () => {
    const { errors, form, activeStep } = this.state;

    if (
      Object.values(errors).every((it) => it === false) &&
      activeStep === steps.length
    ) {
      this.setState({ loading: true });

      HttpService.editUserData(form)
        .then(() => this.props.history.push(PROFILE))
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const renderForm = (step) => {
      switch (step) {
        case 0:
          return (
            <TextField
              label="Your weight in kg"
              id="weight"
              name={"weight"}
              value={this.state.form?.weight || ""}
              sx={{ m: 1, width: "25ch" }}
              onChange={this.handleFieldChange}
              type={"number"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
              error={this.state.errors?.weight}
              helperText={this.state.errors?.weight}
            />
          );
        case 1:
          return (
            <TextField
              label="Your height in cm"
              id="height"
              name={"height"}
              value={this.state.form?.height || ""}
              onChange={this.handleFieldChange}
              sx={{ m: 1, width: "25ch" }}
              type={"number"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
              error={this.state.errors?.height}
              helperText={this.state.errors?.height}
            />
          );
        case 2:
          return (
            <TextField
              label="Your age"
              id="age"
              name={"age"}
              value={this.state.form?.age || ""}
              onChange={this.handleFieldChange}
              sx={{ m: 1, width: "25ch" }}
              type={"number"}
              error={this.state.errors?.age}
              helperText={this.state.errors?.age}
            />
          );
        case 3:
          return (
            <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name={"gender"}
                value={this.state.form?.gender}
                label="Gender"
                onChange={this.handleFieldChange}
              >
                <MenuItem value={"MALE"}>Male</MenuItem>
                <MenuItem value={"FEMALE"}>Female</MenuItem>
              </Select>
            </FormControl>
          );
        default:
          return <div />;
      }
    };

    const { loading, user, activeStep, errors } = this.state;

    return (
      <Container maxWidth={"md"}>
        <Spinner visible={loading} />
        <Grid
          sx={{ height: "100vh" }}
          direction={"columns"}
          alignItems={"center"}
          justifyContent={"center"}
          container
        >
          <Box sx={{ width: "100%" }}>
            <Card sx={{ padding: "25px" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed -
                    <b>
                      {!Object.values(errors).every((it) => it === false)
                        ? " Form has errors!"
                        : " you finished"}
                    </b>
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={this.handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  <Grid display={"flex"} justifyContent={"center"}>
                    {renderForm(activeStep)}
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Card>
          </Box>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(EditUserPage);
