import { Box, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
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
  const { details, user } = props;
  const { title, code, section_id } = details;
  const classes = useStyles();

  const [questions, setQuestions] = useState([{ question: "", mark: "" }]);
  const [examDetails, setExamDetails] = useState({
    title: "",
    desc: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = { questions, examDetails, section_id, class_id: code };
    console.table(examData);

    setExamDetails({
      title: "",
      desc: "",
      dueDate: "",
    });
    setQuestions([{ question: "", mark: "10" }]);
  };

  const handleInput = (e, index) => {
    if (e.target.name === "examDetails") {
      setExamDetails({
        ...examDetails,
        [e.target.id]: [e.target.value],
      });
    } else {
      const updateItem = { ...questions[index], [e.target.id]: e.target.value };
      const copy = [...questions];
      copy[index] = updateItem;
      setQuestions(copy);
      console.table(questions);
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

  useEffect(() => {}, [questions]);

  const questionPanels = questions.map((e, index) => {
    return (
      <CreateQuestion
        index={index}
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
        <Box>
          <form onSubmit={handleSubmit}>
            <ExamDetails handleInput={handleInput} examDetails={examDetails} />
            {questions && questionPanels}
            <ButtonRow handleSubmit={addQuestion} />
          </form>
        </Box>
      </Box>
    </Card>
  );
}
