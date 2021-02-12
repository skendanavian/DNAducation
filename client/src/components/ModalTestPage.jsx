import React from "react";
import TypeDnaModal from "./TypeDnaModal";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

export default function Login({ setToken, setUserId }) {
  return (
    <div>
      <Button>Open Modal</Button>
      <TypeDnaModal />
    </div>
  );
}
