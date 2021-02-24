import { Box, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import ExamDetails from "./ExamDetails";
import CreateQuestion from "./CreateQuestion";
import ButtonRow from "./ButtonRow";
import createExamAndQuestions from "../../helpers/createExamHelpers";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    margin: "2rem auto",
  },
  error: {
    color: "#Df2935",
    textAlign: "center",
    margin: "auto",
  },
  success: {
    color: "#5cb85c",
    margin: "5rem",
  },
}));

export default function CreateExam(props) {
  const { details, user, token, updateContentView, updateData } = props;
  const { title, code, section_id } = details;
  const classes = useStyles();
  const [questions, setQuestions] = useState([{ question: "", mark: "" }]);
  const [examDetails, setExamDetails] = useState({
    title: "",
    desc: "",
    date: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = { questions, examDetails, section_id };
    console.table("Exam Data to submit:  ", examData);

    createExamAndQuestions(examDetails, questions, section_id, token)
      .then((res) => {
        console.log("Create Exam Response: ", res.data);
        setError(false);
        setExamDetails({
          title: "",
          desc: "",
          date: "",
        });
        setQuestions([{ question: "", mark: "10" }]);
        updateData();
        setSubmitSuccess(true);
        const t = setTimeout(() => {
          setSubmitSuccess(false);
          updateContentView({
            type: "Teacher",
            view: "Section",
            sectionId: section_id,
            attemptId: null,
          });
          clearTimeout(t);
        }, 2000);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const handleInput = (e, index) => {
    if (e.target.name === "examDetails") {
      setExamDetails({
        ...examDetails,
        [e.target.id]: e.target.value,
      });
    } else {
      const updateItem = { ...questions[index], [e.target.id]: e.target.value };
      const copy = [...questions];
      copy[index] = updateItem;
      setQuestions(copy);
    }
  };

  const addQuestion = (e) => {
    setQuestions((prev) => [...prev, { question: "", mark: "0" }]);
  };

  const removeQuestion = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const questionPanels = questions.map((e, index) => {
    return (
      <CreateQuestion
        index={index}
        key={index}
        questionNumber={index + 1}
        handleInput={handleInput}
        removeQuestion={removeQuestion}
        questionData={e}
      />
    );
  });

  return (
    <Card>
      <Box
        minWidth="50%"
        padding="1em"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" display="flex" flexDirection="column">
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {code} / {section_id}
          </Typography>

          <Box>
            <Typography variant="body2" display="inline" color="textSecondary">
              Professor:{" "}
            </Typography>
            <Typography display="inline" color="primary" variant="body2">
              {user.name}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Box display="flex" justifyContent="center">
            <Typography variant="h7" color="primary" className={classes.error}>
              Sorry, there was a problem when submitting. Please try again.
            </Typography>
          </Box>
        )}

        {submitSuccess && (
          <Box className={classes.success}>
            {" "}
            <Typography variant="h6">
              Thanks! We have created your exam!
            </Typography>
          </Box>
        )}

        {!submitSuccess && (
          <Box>
            <form onSubmit={handleSubmit}>
              <ExamDetails
                handleInput={handleInput}
                examDetails={examDetails}
              />
              {questions && questionPanels}
              {error && (
                <Box display="flex" justifyContent="center">
                  <Typography
                    variant="h7"
                    color="primary"
                    className={classes.error}
                  >
                    Sorry, there was a problem when submitting. Please try
                    again.
                  </Typography>
                </Box>
              )}
              <ButtonRow handleSubmit={addQuestion} />
            </form>
          </Box>
        )}
      </Box>
    </Card>
  );
}
