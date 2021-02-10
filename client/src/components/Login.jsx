import React from "react";
import { useState } from "react";

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
import axios from "axios";

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
    marginTop: theme.spacing(8),
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

export default function Login(props) {
  const { setToken } = props;
  const classes = useStyles();
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);

  // const userAuthenticated = () => {
  // axios
  //   .get("http://localhost:8080/api/isUserAuth", {
  //     headers: { "x-access-token": localStorage.getItem("token") },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  // };

  const submitLogin = (e) => {
    e.preventDefault();

    setToken("Logged in");
    console.log("logged in");
    history.push("/account");
    console.log(history);

    // axios
    //   .post("http://localhost:8080/api/login", loginForm)
    //   .then((res) => {
    //     if (!res.data.auth) {
    //       setLoginStatus(false);
    //     } else {
    //       console.log(res.data);
    //       localStorage.setItem("token", "Bearer" + res.data.token);
    //       setLoginStatus(true);
    //     }
    //   })
    //   .catch((e) => console.log(e));
    // userAuthenticated();
  };

  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
    console.log(loginForm);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="primary" component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={submitLogin} className={classes.form} noValidate>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              <Typography color="primary"> Sign In</Typography>
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="/register" variant="body2">
                <Typography variant="body1">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
}
