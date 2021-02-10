import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AccountPage from "./components/AccountPage";
import Register from "./components/Register";

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
  const [token, setToken] = useState(sessionStorage.getItem("jwt") || "");
  console.log({token});
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login">
            {token ? <Redirect to="/account" /> : <Login setToken={setToken}/>}
          </Route>
          <Route path="/register">
            {token ? <Redirect to="/account" /> : <Register setToken={setToken}/>}
          </Route>
          <Route path="/account">
            {token ? <AccountPage setToken={setToken}/> : <Redirect to="/register" />}
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
