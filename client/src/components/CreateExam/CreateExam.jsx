import { Box, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect, useRef } from "react";

import { toReadable } from "../../helpers/dateHelpers";

import ExamDetails from "./ExamDetails";
import CreateQuestion from "./CreateQuestion";
import ButtonRow from "./ButtonRow";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    margin: "2rem auto",
  },
}));

export default function CreateExam(props) {
  const { type, details, user } = props;
  const { title, teacher_user_id, code, description, section_id } = details;
  const classes = useStyles();

  // const [questionCount, setQuestionCount] = useState(1);
  const [examDetails, setExamDetails] = useState({
    title: "",
    desc: "",
    dueDate: "",
  });
  const [questions, setQuestions] = useState([{ question: "", mark: "10" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  const handleInput = (e, index) => {
    if (e.target.name === "examDetails") {
      setExamDetails({
        ...examDetails,
        [e.target.id]: [e.target.value],
      });
      console.table(examDetails);
    } else {
      const updateItem = { ...questions[index], [e.target.id]: e.target.value };
      const updatedArray = [...questions];
      updatedArray[index] = updateItem;

      //Can use this for removing items
      // const updatedQuestions = [
      //   ...questions.slice(0, index),
      //   updateItem,
      //   ...questions.slice(index),
      // ];

      setQuestions(updatedArray);
      console.log({ questions });
    }
  };

  const addQuestion = (e) => {
    // setQuestionCount((prev) => prev + 1);
    // console.log({ questionCount });
    setQuestions((prev) => [...prev, { question: "", mark: "0" }]);
  };

  const removeQuestion = (e, index) => {
    // const updatedQuestions = [
    //   ...questions.slice(0, index),

    //   ...questions.slice(index + 1),
    // ];
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    console.log(e);
    setQuestions(updatedQuestions);
  };

  useEffect(() => {}, [questions]);

  const questionPanels = questions.map((e, index) => {
    return (
      <CreateQuestion
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
        mr="2em"
        minWidth="50%"
        padding="1em"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column" /* className={classes.btnContainer} */
        >
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
        <Box>
          <form onSubmit={handleSubmit}>
            <ExamDetails handleInput={handleInput} examDetails={examDetails} />
            {/* <CreateQuestion handeleInput={handleInput} questions={questions} /> */}
            {questionPanels}
            <ButtonRow handleSubmit={addQuestion} />
          </form>
        </Box>
      </Box>
    </Card>
  );
}
