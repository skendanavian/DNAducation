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

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import PageContainer from "./components/PageContainer";
import Register from "./components/Register";
import Question from "./components/Question";

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
  const [userId, setUserId] = useState(1);
  // This will be passed to Class View and set exam Id on Exam start.
  // Can then be accessed as prop by exam view (currently defaulting to 1 for testing)
  const [examId, setExamId] = useState(1);

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
              <AccountPage setToken={setToken} setUserId={setUserId} userId={userId} />
            ) : (
              <Redirect to="/register" />
            )}
          </Route>
          <Route path="/exam">
            {token ? (
              <Question
                userId={userId}
                examId={examId}
                setToken={setToken}
                setExamId={setExamId}
              />
            ) : (
              <Redirect to="/" />
            )}
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
