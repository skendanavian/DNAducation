import React, { Component } from "react";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { themeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00296b",
    },
    secondary: {
      main: "#fdc500",
    },
    light: {
      main: "#FFFBFE",
    },
  },
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
