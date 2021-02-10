import React, { Component } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <h1>Landing Page?</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
