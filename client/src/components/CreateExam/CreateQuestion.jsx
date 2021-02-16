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

export default function CreateQuestion({
  questionNumber,
  handleInput,
  questionData,
  removeQuestion,
  index,
}) {
  const classes = useStyles();
  const { question, mark } = questionData;

  const todayDate = Date.now();

  return (
    <Box>
      <Card className={classes.questionCard}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" color="primary">
            Question {questionNumber}
          </Typography>
          <TextField
            props
            className={classes.date}
            id="mark"
            type="number"
            label="Marks"
            variant="outlined"
            required
            // value={mark}
            name="marks"
            InputProps={{ inputProps: { min: 0, max: 100, width: "50%" } }}
            autoFocus
            onChange={(e) => handleInput(e, index)}
          />
        </Box>
        <TextField
          className={classes.question}
          id="question"
          type="text"
          label="Exam Question"
          name="question"
          rows={5}
          width="100%"
          variant="outlined"
          margin="normal"
          // placeholder={question}
          required
          multiline
          fullWidth
          placeholder="Type Question Here"
          // value={question}
          autoFocus
          onChange={(e) => handleInput(e, index)}
        />
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="delete"
            className={classes.margin}
            className={classes.deleteColor}
            onClick={(e) => removeQuestion(e, index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}
