import React from "react";
import { useState, useEffect } from "react";
import generateAxios from "../helpers/generateAxios";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LandingImage from "../images/landingBg.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    position: "absolute",
    background: `linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0.5rem",
    backgroundColor: "rgba(255,255,255,1)",
    padding: "1rem",
  },
  avatar: {
    margin: theme.spacing(1),
    color: "#FFFBFE",
    backgroundColor: "#00296b",
    transform: "scale(0.8)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  regContainer: {
    maxWidth: "60vw",
  },
}));

require("dotenv").config({ path: "../../.env" });
const baseURL = process.env.REACT_APP_REQUEST_URL;

export default function Register({ setToken, setUserId }) {
  const history = useHistory();
  const classes = useStyles();
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
    isTeacher: false,
  });
  const submitRegistration = (e) => {
    e.preventDefault();

    const axios = generateAxios();
    localStorage.removeItem("userId");
    sessionStorage.removeItem("jwt");

    const { firstName, lastName, studentId, isTeacher } = registrationForm;
    const name = `${firstName} ${lastName}`;
    const data = { name, ...registrationForm };

    axios
      .post(baseURL + "/register", data)
      .then((res) => {
        console.log("Register response: ", res.data);
        setToken(res.data.token);
        setUserId(res.data.userId);
        localStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("jwt", res.data.token);
        history.push("/account");
      })
      .catch((e) => console.log(e));
  };

  const handleInput = (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  const checkboxHandler = () => {
    setRegistrationForm((prev) => ({
      ...registrationForm,
      isTeacher: !prev.isTeacher,
    }));
  };

  return (
    <div className={classes.root}>
      <Container
        component="main"
        // maxWidth="xs"
        className={classes.regContainer}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography color="primary" component="h1" variant="h5">
            🧬 DNAducation{" "}
          </Typography>

          <form onSubmit={submitRegistration} className={classes.form}>
            <TextField
              className={classes.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={handleInput}
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              className={classes.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              onChange={handleInput}
              inputProps={{ maxLength: 40 }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="studentId"
              label="Student Id"
              name="studentId"
              autoFocus
              inputProps={{ maxLength: 8 }}
              onChange={handleInput}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInput}
              inputProps={{ maxLength: 40 }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInput}
              inputProps={{ maxLength: 40 }}
            />
            <FormGroup row>
              <FormControlLabel
                label="Teacher Account:"
                control={
                  <Checkbox
                    name="isTeacher"
                    checked={registrationForm.isTeacher}
                    onChange={checkboxHandler}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    color="secondary"
                  />
                }
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="/login" variant="body2">
                <Typography variant="body2">
                  {"Already have an account? Login"}
                </Typography>
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
}
