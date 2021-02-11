import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { formatExamQuestions } from "../helpers/formatExamQuestions";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "2rem",
    margin: "auto",
  },
  centerText: {
    textAlign: "center",
  },
  question: {
    margin: "1.2rem",
  },
  answerField: {
    width: "80vw",
    margin: "1rem auto",
  },
}));

//Sample Test Data
const examQuestionObject = {
  classCode: "STA 220",
  examId: "2",
  questions: [
    {
      questionId: 1,
      questionNumber: 1,
      markValue: 20,
      question:
        "Describe the difference between a unimodal and bimodal distribution.",
    },
    {
      questionId: 2,
      questionNumber: 2,
      markValue: 20,
      question:
        "Describe the difference between a unimodal and bimodal distribution",
    },
    {
      questionId: 3,
      questionNumber: 3,
      markValue: 20,
      question:
        "Describe the difference between a unimodal and bimodal distribution",
    },
    {
      questionId: 4,
      questionNumber: 4,
      markValue: 20,
      question:
        "Describe the difference between a unimodal and bimodal distribution",
    },
  ],
};

export default function Question({ examId, setToken, setExamId }) {
  const { classCode, questions } = examQuestionObject;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const axios = useAxios();
  const baseURL = process.env.REACT_APP_REQUEST_URL;
  console.log(baseURL);
  const userId = localStorage.getItem("userId");

  // useEffect -> axios request -> store exam questions in session storage?
  useEffect(() => {
    if (userId) {
      const examUrl = baseURL + `/exams/${examId}/questions`;
      console.log(examUrl);

      axios
        .get(examUrl)
        .then((res) => {
          // const classCodes = sections.map((sec) => sec.code);
          // const sectionIds = sections.map((sec) => sec.section_id);
          // setClassCodes(classCodes);
          console.table(res.data);
          // console.table(formatExamQuestions(res.data));
          // return axios.get(examUrl, { params: { sectionIds } });
        })
        .then(({ data: exams }) => {
          // setExams(exams);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit axios post request here
    console.log(answerText);
    setAnswerText("");
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" noWrap>
            🧬 DNAducation
          </Typography>

          <Box marginLeft="auto">
            <Typography color="secondary">
              {classCode} - EXAM {examId}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Container className={classes.questionContainer}>
        <Typography variant="h5" color="primary" className={classes.centerText}>
          Question {questions[questionIndex].question_number}
          <Typography color="secondary">
            {questions[questionIndex].markValue} marks
          </Typography>
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className={`${classes.centerText} ${classes.question}`}
        >
          {questions[questionIndex].question}
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.questionContainer}
        >
          <TextField
            className={classes.answerField}
            variant="outlined"
            placeholder="Write Answer Here....."
            value={answerText}
            multiline
            rows={25}
            onChange={(e) => {
              setAnswerText(e.target.value);
            }}
          ></TextField>

          <Box display="flex" justifyContent="space-evenly" padding={5}>
            <Button type="submit" variant="contained" color="secondary">
              Submit Answer
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
