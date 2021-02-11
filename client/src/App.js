import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { UserIdProvider } from "./contexts/UserIdContext";

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
  const [userId, setUserId] = useState(null);
  const UserIdContext = React.createContext();

  return (
    <Router>
      <CssBaseline />
      <UserIdProvider value={userId}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/login">
              {token ? (
                <Redirect to="/account" />
              ) : (
                <Login setToken={setToken} setUserId={setUserId} />
              )}
            </Route>
            <Route path="/register">
              {token ? (
                <Redirect to="/account" />
              ) : (
                <Register setToken={setToken} setUserId={setUserId} />
              )}
            </Route>
            <Route path="/account">
              {token ? (
                <AccountPage setToken={setToken} setUserId={setUserId} />
              ) : (
                <Redirect to="/register" />
              )}
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </ThemeProvider>
      </UserIdProvider>
    </Router>
  );
}

export default App;
