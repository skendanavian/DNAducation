import React, { useEffect } from "react";
import { useState, useContext } from "react";
import generateAxios from "../helpers/generateAxios";
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
    background: `linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
    transform: "scale(0.8)",
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

require("dotenv").config({ path: "../../.env" });
const baseURL = process.env.REACT_APP_REQUEST_URL;

export default function Login({ setToken, setUserId }) {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();

  const submitLogin = (e) => {
    e.preventDefault();

    const axios = generateAxios();
    localStorage.removeItem("userId");
    sessionStorage.removeItem("jwt");

    axios
      .post(baseURL + "/login", loginForm)
      .then((res) => {
        if (!res.data) {
          console.log(res.data.message);
        } else {
          console.log("Login response: ", res.data);
          setToken(res.data.token);

          localStorage.setItem("userId", res.data.id);
          setUserId(res.data.id);

          sessionStorage.setItem("jwt", res.data.token);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
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

          <Typography color="primary" component="h1" variant="h5">
            🧬 DNAducation{" "}
          </Typography>

          <form onSubmit={submitLogin} className={classes.form}>
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
              inputProps={{ maxLength: 40 }}
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
                <Typography variant="body2">
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
