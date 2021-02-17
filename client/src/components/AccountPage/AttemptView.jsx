import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getAttemptData } from "../../helpers/requestHelpers";
import { TextField } from "@material-ui/core";

export default function AttemptView(props) {
  const { attemptId } = props;
  console.log(props);
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

  // const markHandler = (markIndex) => {
  //   setMarks((prev) => {
  //     // prev[markIndex] = ;
  //     return prev;
  //   });
  // };

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
    </Box>
  );
}
