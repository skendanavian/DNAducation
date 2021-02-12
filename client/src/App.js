import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AccountPage from "./components/AccountPage";
import Register from "./components/Register";
import Question from "./components/Question";
import ModalTestPage from "./components/ModalTestPage";
import DummyAccountPage from "./components/DummyAccountPage";

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
  typography: {
    fontSize: 17,
  },
});

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("jwt") || "");
  const [userId, setUserId] = useState(null);

  // Can then be accessed as prop by exam view (currently defaulting to 1 for testing)
  const [examId, setExamId] = useState(1);

  const passToken = token || sessionStorage.getItem("jwt");
  const passUserId = userId || localStorage.getItem("userId");

  return (
    <Router>
      <CssBaseline />
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
              <AccountPage
                token={passToken}
                userId={passUserId}
                setToken={setToken}
                setUserId={setUserId}
              />
            ) : (
              <Redirect to="/register" />
            )}
          </Route>
          <Route path="/exam">
            {token ? (
              <Question
                examId={examId}
                setToken={setToken}
                setExamId={setExamId}
                userId={passUserId}
                token={passToken}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/modal">
            <ModalTestPage />
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
