import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  TextField,
  TextareaAutosize,
  IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import ButtonRow from "./ButtonRow";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  dateField: {
    margin: " 0.8rem auto",
  },

  questionCard: {
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
  question: {
    width: "100%",
    backgroundColor: "white",
  },
  date: {
    backgroundColor: "white",
  },
  deleteColor: {
    color: "#Df2935",
  },
}));

export default function CreateQuestion(props) {
  const classes = useStyles();

  const todayDate = Date.now();

  return (
    <Box>
      <Card className={classes.questionCard}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" color="primary">
            Question 1
          </Typography>
          <TextField
            className={classes.date}
            variant="outlined"
            required
            type="number"
            id="mark"
            label="Marks"
            value="10"
            name="marks"
            InputProps={{ inputProps: { min: 0, max: 100, width: "50%" } }}
            autoFocus
          />
        </Box>
        <TextField
          className={classes.question}
          rows={5}
          width="100%"
          variant="outlined"
          margin="normal"
          required
          multiline
          fullWidth
          placeholder="Type Question Here"
          value=""
          type="text"
          id="title"
          label="Exam Question"
          name="title"
          autoFocus
        />
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="delete"
            className={classes.margin}
            className={classes.deleteColor}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}
