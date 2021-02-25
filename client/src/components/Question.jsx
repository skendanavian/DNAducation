import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TypeDNA from "../typeDna/typingdna";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import LoadingButton from "./LoadingButton";

import {
  calculateAnswerConfidence,
  calculateExamConfidence,
} from "../helpers/calculateConfidence";
import generateAxios from "../helpers/generateAxios";
import { formatExamQuestions } from "../helpers/formatExamQuestions";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
  },

  questionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "1.2rem",
  },
  centerText: {
    textAlign: "center",
  },
  question: {
    maxWidth: "70vw",
    margin: "1.2rem auto",
    fontSize: "1.2rem",
    color: "black",
  },
  answerField: {
    width: "60vw",
    margin: "0.5rem auto",
    fontSize: "1.1rem",
  },
  error: {
    color: "#Df2935",
  },
  markValue: {
    padding: "0.5rem",
  },
  success: {
    color: "#5cb85c",
    textAlign: "center",
  },
}));

export default function Question({ examId, userId, token }) {
  const history = useHistory();
  const classes = useStyles();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [questionObject, setQuestionObject] = useState({ questions: [{}] });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState("default");
  const [success, setSuccess] = useState(false);
  const [attemptId, setAttemptId] = useState("");
  const [confidenceArray, setConfidenceArray] = useState([]);

  const axios = generateAxios(token);
  const baseURL = process.env.REACT_APP_REQUEST_URL;

  const changeButtonStatus = (status) => {
    setButtonStatus(status);
    if (status === "error") {
      const timer = setTimeout(() => {
        setButtonStatus("default");
        clearTimeout(timer);
      }, 1000);
    }
  };

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
          setQuestionObject(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [axios, baseURL, examId, userId]);

  // Initiate TypeDNA Listener
  let tdna = new TypeDNA();
  const typingPattern = tdna.getTypingPattern({
    type: 0,
    text: `${answerText}`,
    targetId: "typeDnaAnswer",
  });

  const currentQ = questionObject.questions[questionIndex];
  const apiRoute = baseURL + `/api/${userId}`;
  const submitAnswerUrl = baseURL + `/attempts/${attemptId}/answers`;

  const handleSubmit = (e) => {
    e.preventDefault();
    tdna.stop();
    changeButtonStatus("loading");
    axios
      .post(apiRoute, { userId, typingPattern })
      .then((res) => {
        console.log(res.data);

        const { highConfidence, result, action, statusCode } = res.data;
        let confidenceValue;
        console.log({ action });
        console.log(action.includes("verify"));
        if (!action.includes("verify") || statusCode !== 200) {
          // Error case: values of 0 will be thrown out when calculating average
          confidenceValue = 0;
        } else {
          confidenceValue = calculateAnswerConfidence(result, highConfidence);
        }

        if (currentQ.questionNumber < questionObject.questions.length)
          setConfidenceArray((prev) => [...prev, confidenceValue]);

        const postAnswer = axios.post(submitAnswerUrl, {
          exam_question_id: currentQ.questionId,
          exam_attempt_id: attemptId,
          answer: answerText,
          confidence_level: confidenceValue,
        });

        return Promise.all([
          postAnswer,
          new Promise((res) => res(confidenceValue)),
        ]);
      })
      .then((res) => {
        const [__, confidenceValue] = res;
        console.log(res);
        res.data = confidenceValue;
        // Update exam attempt with avg confidence
        if (currentQ.questionNumber === questionObject.questions.length) {
          const submitExamUrl = baseURL + `/attempts/${attemptId}`;
          const date = new Date(Date.now());
          const updatedArray = [...confidenceArray, confidenceValue];
          const confidencePercentage = calculateExamConfidence(updatedArray);
          return axios
            .patch(submitExamUrl, {
              id: attemptId,
              average_confidence: confidencePercentage,
              time_submitted: date.toISOString(),
            })

            .then(() => {
              const incrementSubmissionURL =
                baseURL + `/exams/${questionObject.examId}`;
              tdna.reset();
              tdna.start();
              return axios.patch(incrementSubmissionURL);
            })
            .then((res) => {
              setSuccess(true);
              changeButtonStatus("success");
              const t = setTimeout(() => {
                setSuccess(false);
                changeButtonStatus("default");
                history.push("/account");
                clearTimeout(t);
              }, 1500);

              return;
            })
            .catch((err) => {
              console.log(err);
              changeButtonStatus("error");
              setErrorMessage(
                "There was a problem submitting this question. Please try again"
              );
            });
        }
        setSuccess(true);
        changeButtonStatus("success");
        const t = setTimeout(() => {
          setSuccess(false);
          changeButtonStatus("default");
          setAnswerText("");
          setQuestionIndex(questionIndex + 1);
          clearTimeout(t);
        }, 1500);
        return;
      })
      .catch((err) => {
        console.log(err);
        changeButtonStatus("error");
        setErrorMessage(
          "There was a problem submitting this question. Please try again"
        );
      });
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
            <Typography className={classes.markValue} color="primary">
              {currentQ.markValue} marks
            </Typography>
            <Divider />
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
              rows={13}
              required
              onChange={(e) => {
                setAnswerText(e.target.value);
              }}
              InputProps={{
                id: "typeDnaAnswer",
              }}
            ></TextField>

            <Box display="flex" justifyContent="space-evenly" padding={5}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="secondary"
                status={buttonStatus}
              >
                {questionIndex === questionObject.questions.length - 1
                  ? "Submit Answer & Finish Exam"
                  : "Submit Answer"}
              </LoadingButton>
            </Box>
          </form>
        </Container>
      )}
    </div>
  );
}
