import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { getAttemptData } from "../../helpers/requestHelpers";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

require("dotenv").config({ path: "../../../.env" });

export default function AttemptView(props) {
  const { attemptId, token } = props;
  console.log({ props });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id: attemptsId } = attemptData.attempt;
    const { id: examId } = attemptData.exam;
    const markData = { marks };
    console.log("clicked");
  };

  const markHandler = (e, answerId, index) => {
    setMarks({
      ...marks,
      [answerId]: e.target.value,
    });
    console.log(marks);
  };

  const { attempt, exam, questions, answers } = attemptData;

  let displayAttempt = answers.map((answer, index) => {
    return { a: answer, q: questions[index] };
  });

  console.log(displayAttempt);

  return (
    <Box margin="auto">
      <form onSubmit={handleSubmit}>
        <Paper>
          <Box margin="1rem" padding="1rem" textAlign="center">
            <Typography variant="h5" color="primary">
              Title: {exam && exam.title}
            </Typography>

            <hr />
            <Typography color="primary" variant="p">
              Attempt Id: {attempt && attempt.id}
            </Typography>

            <hr />
            <Typography color="primary" variant="p">
              TypingDNA Authentication Rating:{" "}
              {attempt && attempt.average_confidence} / 100
            </Typography>
            <hr />
          </Box>

          {displayAttempt &&
            displayAttempt.map((dAtt, index) => {
              return (
                <Box
                  margin="auto"
                  display="flex"
                  flexDirection="column"
                  width="80%"
                  key={index}
                >
                  <Typography color="primary" variant="h6">
                    Question {dAtt.q.question_number}
                  </Typography>
                  <Box margin="1rem auto">
                    <Typography>{dAtt.q.question}</Typography>
                    <Box margin="1rem auto">
                      <Typography color="primary" variant="h6">
                        Answer {dAtt.q.question_number}
                      </Typography>
                    </Box>
                    <Typography>{dAtt.a.answer}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      margin="2rem auto 2rem auto"
                    >
                      <TextField
                        id="mark"
                        type="number"
                        label="Marks"
                        variant="outlined"
                        required
                        // value={marks[dAtt.a.id]}
                        name="marks"
                        InputProps={{
                          inputProps: { min: 0, max: 100 },
                        }}
                        autoFocus
                        onChange={(e) => markHandler(e, dAtt.a.id)}
                      />
                      <Box ml={2}>
                        <Typography m={10} color="primary" variant="h6">
                          / {dAtt.q.mark_value}
                        </Typography>
                      </Box>
                    </Box>
                    <hr />
                  </Box>
                </Box>
              );
            })}
          <Box
            // margin="1rem auto"
            padding="3rem"
            display="flex"
            justifyContent="center"
          >
            <Button type="submit" variant="contained" color="secondary">
              Submit Grade
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}
