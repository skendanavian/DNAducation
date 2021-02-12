import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function Question({ userId, examId, setExamId }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [questionObject, setQuestionObject] = useState({});
  const [attemptId, setAttemptId] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const axios = useAxios(sessionStorage.getItem("jwt"));
  const baseURL = process.env.REACT_APP_REQUEST_URL;

  const currentQ = Object.keys(questionObject).length
    ? questionObject.questions[questionIndex]
    : "";

  useEffect(() => {
    if (userId) {
      const createAttemptUrl = baseURL + "/attempts";
      const getQuestionsUrl = baseURL + `/exams/${examId}/questions`;
      const date = new Date(Date.now());

      axios
        .post(createAttemptUrl, {
          section_students_id: userId,
          exam_id: examId,
          time_started: date.toISOString(),
        })
        .then((res) => {
          setAttemptId(res.data.id);
          return axios.get(getQuestionsUrl);
        })
        .then((res) => {
          const data = formatExamQuestions(res.data);
          setQuestionObject(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitAnswerUrl = baseURL + `/attempts/${attemptId}/answers`;

    const exam_question_id = currentQ.questionId;

    //Submit individual answers to DB
    // **Confidence Level Currently Hard Coded
    axios
      .post(submitAnswerUrl, {
        exam_question_id,
        exam_attempt_id: attemptId,
        answer: answerText,
        confidence_level: 75,
      })
      .then((res) => {
        if (currentQ.questionNumber === questionObject.questions.length) {
          //Submit Full Exam Attempt Update on last question
          const submitExamUrl = baseURL + `/attempts/${attemptId}`;
          const date = new Date(Date.now());
          return axios
            .patch(submitExamUrl, {
              id: attemptId,
              average_confidence: 75,
              time_submitted: date.toISOString(),
            })
            .then((res) => {
              // Increment total in DB
              const incrementSubmissionURL =
                baseURL + `/exams/${questionObject.examId}`;
              return axios.patch(incrementSubmissionURL);
            })
            .then((res) => {
              history.push("/account");
              return;
            });
        }
        setAnswerText("");
        setQuestionIndex(questionIndex + 1);
        return;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" noWrap>
            🧬 DNAducation
          </Typography>
          {!loading && (
            <Box marginLeft="auto">
              <Typography color="secondary">
                {questionObject.classCode} - {questionObject.classTitle} - EXAM{" "}
                {questionObject.examId}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {loading ? (
        <Typography color="secondary" margin="auto">
          LOADING....
        </Typography>
      ) : (
        <Container className={classes.questionContainer}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.centerText}
          >
            Question {currentQ.questionNumber}
            <Typography color="secondary">
              {currentQ.markValue} marks
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            className={`${classes.centerText} ${classes.question}`}
          >
            {currentQ.question}
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
              required
              onChange={(e) => {
                setAnswerText(e.target.value);
              }}
            ></TextField>

            <Box display="flex" justifyContent="space-evenly" padding={5}>
              <Button type="submit" variant="contained" color="secondary">
                {questionIndex === questionObject.questions.length - 1
                  ? "Submit Answer & Finish Exam"
                  : "Submit Answer"}
              </Button>
            </Box>
          </form>
        </Container>
      )}
    </div>
  );
}
