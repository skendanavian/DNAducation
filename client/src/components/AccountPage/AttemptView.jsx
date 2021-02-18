import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getAttemptData, markAnswers } from "../../helpers/requestHelpers";
import { Button, TextField } from "@material-ui/core";

export default function AttemptView(props) {
  const { attemptId } = props;
  // we need exam, questions, attempt, attempt answers
  const [attemptData, setAttemptData] = useState({
    attempt: {},
    exam: {},
    questions: [],
    answers: [],
  });
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (attemptId) {
      getAttemptData(attemptId)
        .then(({ data }) => {
          const attempt = data[0][0];
          const answers = data[1];
          const exam = data[2][0];
          const questions = data[3];

          console.table(questions);
          console.table(answers);

          setAttemptData({
            attempt,
            exam,
            questions,
            answers,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [attemptId]);

  if (!attemptData) {
    return <Typography>Loading...</Typography>;
  }

  const submitHandler = () => {
    // [{mark, examAnswerId}]
    const fixtures = [
      { mark: 20, examAnswerId: 37 },
      { mark: 30, examAnswerId: 38 },
      { mark: 40, examAnswerId: 39 },
    ];

    markAnswers(fixtures);
  };

  const { attempt, exam, questions, answers } = attemptData;

  let displayAttempt = answers.map((answer, index) => {
    return { a: answer, q: questions[index] };
  });

  return (
    <Box>
      <Typography>Title: {exam && exam.title}</Typography>
      <Typography>Attempt Id:{attempt && attempt.id}</Typography>
      {displayAttempt &&
        displayAttempt.map((dAtt, index) => {
          return (
            <Box display="flex" key={dAtt}>
              <Typography>{dAtt.q.question}</Typography>
              <Typography>{dAtt.a.answer}</Typography>
              <TextField value={marks[index]}></TextField>
              <Typography>Out of: {}</Typography>
            </Box>
          );
        })}
      <Button onClick={submitHandler}>Submit</Button>
    </Box>
  );
}
