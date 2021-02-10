import React from "react";
import { useState } from "react";
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
import axios from "axios";
import "./LoginRegister.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(193, 8, 8)",
    color: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    color: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: "white",
    padding: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(193, 8, 8)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);

  const userAuthenticated = () => {
    axios
      .get("http://localhost:8080/api/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const submitLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/login", loginForm)
      .then((res) => {
        if (!res.data.auth) {
          setLoginStatus(false);
        } else {
          console.log(res.data);
          localStorage.setItem("token", "Bearer" + res.data.token);
          setLoginStatus(true);
        }
      })
      .catch((e) => console.log(e));

    userAuthenticated();
  };

  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
    console.log(loginForm);
  };

  return (
    <div className="page-container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
}
