import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  dateField: {
    marginTop: "0.8rem",
    marginBottom: "3rem",
  },
}));

export default function ExamDetails(props) {
  const classes = useStyles();

  const todayDate = Date.now();

  return (
    <Box>
      <form /* onSubmit={submitLogin} */ className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Exam Title"
          name="title"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="description"
          label="Exam Description"
          id="description"
          // rows={300}
        />
        <TextField
          id="date"
          label="Due Date"
          type="date"
          fullWidth
          className={classes.dateField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </Box>
  );
}
