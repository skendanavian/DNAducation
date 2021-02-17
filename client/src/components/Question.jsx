import React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TypeDNA from "../typeDna/typingdna";

import {
  calculateAnswerConfidence,
  calculateExamConfidence,
} from "../helpers/calculateConfidence";
import generateAxios from "../helpers/generateAxios";
import { formatExamQuestions } from "../helpers/formatExamQuestions";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

require("dotenv").config({ path: "../../../.env" });

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
    maxWidth: "70vw",
    margin: "1rem auto",
    fontSize: "1.2rem",
    color: "black",
  },
  answerField: {
    width: "70vw",
    margin: "0.5rem auto",
    fontSize: "1.2rem",
  },
  error: {
    color: "#Df2935",
  },
}));

export default function Question({ examId, userId, token }) {
  const history = useHistory();
  const classes = useStyles();
  const [confidenceArray, setConfidenceArray] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [questionObject, setQuestionObject] = useState({ questions: [{}] });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [attemptId, setAttemptId] = useState("");
  const axios = generateAxios(token);
  const baseURL = process.env.REACT_APP_REQUEST_URL;

  useEffect(() => {
    if (userId) {
      const createAttemptUrl = baseURL + "/attempts";
      const getQuestionsUrl = baseURL + `/exams/${examId}/questions`;
      const date = new Date(Date.now());

      axios
        .post(createAttemptUrl, {
          user_id: userId,
          exam_id: examId,
          time_started: date.toISOString(),
        })
        .then((res) => {
          setAttemptId(res.data.id);
          return axios.get(getQuestionsUrl);
        })
        .then((res) => {
          const data = formatExamQuestions(res.data);
          console.log("setting question object");
          setQuestionObject(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [examId, userId]);

  // Initiate TypeDNA Listener
  let tdna = new TypeDNA();
  const typingPattern = tdna.getTypingPattern({
    type: 0,
    text: `${answerText}`,
    targetId: "typeDnaAnswer",
  });

  const currentQ = questionObject.questions.length
    ? questionObject.questions[questionIndex]
    : "";

  // const currentQ = questionObject.questions[questionIndex];
  const apiRoute = baseURL + `/api/${userId}`;
  const submitAnswerUrl = baseURL + `/attempts/${attemptId}/answers`;
  /// look into bug here. Cannot read property id of undefined
  // console.log(currentQ);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ e });

    tdna.stop();

    axios.post(apiRoute, { userId, typingPattern }).then((res) => {
      console.log(res.data);
      console.log("ConfArray at start of submit", confidenceArray);
      const { highConfidence, result, action, statusCode } = res.data;
      let confidenceValue;
      console.log({ action });
      console.log(action.includes("verify"));
      if (!action.includes("verify") || statusCode !== 200) {
        // Error case: values of 0 will be thrown out when calculating average
        confidenceValue = 0;
        console.log("failed response - confidence set to 0");
      } else {
        confidenceValue = calculateAnswerConfidence(result, highConfidence);
        console.log(
          `successful typingDNA response, confidence set at ${confidenceValue}`
        );
      }

      console.log(confidenceValue);
      console.log(typingPattern);

      // const prevArray = localStorage.getItem("confArray");
      // console.log({ prevArray });

      // localStorage.setItem("confArray", [...prevArray, confidenceValue]);
      // const postArray = localStorage.getItem("confArray");

      // console.log({ postArray });
      // if (!confidenceArray.length) {
      //   setConfidenceArray([confidenceValue]);
      console.log("ConfArray before state update in submit", confidenceArray);

      // } else {
      setConfidenceArray((prev) => [...prev, confidenceValue]);
      // }

      console.log("ConfArray after state update in submit", confidenceArray);

      return axios
        .post(submitAnswerUrl, {
          exam_question_id: currentQ.questionId,
          exam_attempt_id: attemptId,
          answer: answerText,
          confidence_level: confidenceValue,
        })
        .then((res) => {
          console.log(res);
          // Update exam attempt with avg confidence
          if (currentQ.questionNumber === questionObject.questions.length) {
            const submitExamUrl = baseURL + `/attempts/${attemptId}`;
            const date = new Date(Date.now());
            const confidencePercentage = calculateExamConfidence([
              ...confidenceArray,
            ]);
            return axios
              .patch(submitExamUrl, {
                id: attemptId,
                average_confidence: confidencePercentage,
                time_submitted: date.toISOString(),
              })
              .then((res) => {
                const incrementSubmissionURL =
                  baseURL + `/exams/${questionObject.examId}`;
                tdna.reset();
                tdna.start();
                return axios.patch(incrementSubmissionURL);
              })
              .then((res) => {
                history.push("/account");
                return;
              });
          }
          // setConfidenceArray((prev) => [...prev, confidenceValue]);
          console.log("confArray at end", confidenceArray);

          setAnswerText("");
          setQuestionIndex(questionIndex + 1);
          return;
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            "There was a problem submitting this question. Please try again"
          );
        });
    });
  };

  const handleChange = (e) => {
    setAnswerText(e.target.value);
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
          <Typography className={`${classes.centerText} ${classes.question}`}>
            {currentQ.question}
          </Typography>
          <Typography className={classes.error}>
            {errorMessage && errorMessage}
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
              rows={15}
              required
              onChange={handleChange}
              InputProps={{
                id: "typeDnaAnswer",
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
