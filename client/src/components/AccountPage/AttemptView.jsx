import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getAttemptData } from "../../helpers/requestHelpers";

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

  const { attempt, exam, questions, answers } = attemptData;
  return (
    <Box>
      <Typography>Title: {exam && exam.title}</Typography>
      <Typography>Attempt Id:{attempt && attempt.id}</Typography>
      {questions &&
        questions.map((q) => {
          return <Typography>{q.question}</Typography>;
        })}
      {answers &&
        answers.map((ans) => {
          return <Typography>{ans.answer}</Typography>;
        })}
    </Box>
  );
}
