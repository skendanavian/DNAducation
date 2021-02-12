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
  useHistory,
  browserHistory,
} from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AccountPage from "./components/AccountPage";
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
  console.table();
  const [token, setToken] = useState(sessionStorage.getItem("jwt") || "");
  const [userId, setUserId] = useState(""); // This will be passed to Class View and set exam Id on Exam start. // Can then be accessed as prop by exam view (currently defaulting to 1 for testing)
  /*   const userId = 1;
   */ const [examId, setExamId] = useState(1);

  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/login">
            {token ? (
              <Redirect to="/account" />
            ) : (
              <Login setToken={setToken} setUserId={setUserId} token={token} />
            )}
          </Route>
          <Route exact path="/register">
            {token ? (
              <Redirect to="/account" />
            ) : (
              <Register setToken={setToken} setUserId={setUserId} />
            )}
          </Route>
          <Route exact path="/account">
            {token ? (
              <AccountPage
                setToken={setToken}
                setUserId={setUserId}
                userId={userId}
                token={token}
              />
            ) : (
              <Redirect to="/register" />
            )}
          </Route>
          <Route exact path="/exam">
            {token ? (
              <Question
                examId={examId}
                setToken={setToken}
                setExamId={setExamId}
                userId={userId}
                token={token}
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
