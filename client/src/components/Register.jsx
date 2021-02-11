import React from "react";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LandingImage from "../images/landingBg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    position: "absolute",
    background: `linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${LandingImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0.5rem",
    backgroundColor: "rgba(255,255,255,1)",
  },
  avatar: {
    margin: theme.spacing(2),
    color: "#FFFBFE",
    backgroundColor: "#00296b",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5, 4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({ setToken }) {
  const history = useHistory();
  const classes = useStyles();
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
  });
  const axios = useAxios();

  const submitRegistration = (e) => {
    e.preventDefault();

    const { firstName, lastName, studentId } = registrationForm;
    const name = `${firstName} ${lastName}`;
    // const studentId = Number(studentId);
    const data = { name, ...registrationForm };

    axios
      .post("http://localhost:3001/register", data)
      .then((res) => {
        console.log("Register response: ", res.data);
        setToken(res.data.token);
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

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            onSubmit={submitRegistration}
            className={classes.form}
            // noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={handleInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              onChange={handleInput}
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
              validate
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
              inputProps={{ maxLength: 10 }}
              onChange={handleInput}
            />

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
                <Typography variant="body1">
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
