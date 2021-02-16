import { Box, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

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

  const [questionCount, setQuestionCount] = useState(1);
  const [examDetails, setExamDetails] = useState({
    title: "",
    desc: "",
    dueDate: "",
  });
  const [questions, setQuestions] = useState([]);

  console.log({ type });
  console.log({ details });
  console.log({ user });
  // console.log(user.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  const handleInput = (e) => {
    if (e.target.name === "examDetails") {
      setExamDetails({
        ...examDetails,
        [e.target.id]: [e.target.value],
      });
      console.table(examDetails);
    }
    // console.log(e.target.id);
    console.log(e.target.value);
    console.log(e.target.id);

    console.log("text field inputs");
  };

  const addQuestion = (e) => {
    console.log(e);
    console.log("Add question clicked");
  };

  const questionPanels = questions ? (
    questions.map((e, index) => {
      return (
        <CreateQuestion
          key={index + 1}
          handeleInput={handleInput}
          questionData={e}
        />
      );
    })
  ) : (
    <CreateQuestion key={1} handeleInput={handleInput} questions={questions} />
  );

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
