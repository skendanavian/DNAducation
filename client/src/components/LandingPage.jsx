import React from "react";
import AccountPage from "./AccountPage";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

const LandingPage = (props) => {
  return (
    <>
      <h1>Welcome to DNAducation!</h1>
      <p>
        This is a prototype of an education site using typeDNA authenication.
      </p>
      <p>
        Try logging in <Link href={"/login"}>HERE</Link> with credentials:
        email: test@test.com, password: test, to see it in action.
      </p>
    </>
  );
};

export default LandingPage;
