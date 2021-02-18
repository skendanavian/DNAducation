import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import LandingImage from "../images/landingBg.jpg";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    position: "absolute",
    background: `linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center",
  },
  margin: {
    margin: "1.2rem auto",
    alignItems: "center",
    color: "#00296b",
  },

  submit: {
    margin: theme.spacing(3, 3, 2),
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={20}
      >
        <Typography
          variant="h3"
          color="primary"
          align="center"
          className={classes.margin}
        >
          🧬 DNAducation
        </Typography>
        <div>
          <Link href="/register">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              className={classes.margin}
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              className={classes.margin}
            >
              Login
            </Button>
          </Link>
        </div>

        <Typography variant="h6" color="primary" className={classes.margin}>
          Educational assessments driven by the power of typing biometrics!
        </Typography>
      </Box>
    </div>
  );
}
