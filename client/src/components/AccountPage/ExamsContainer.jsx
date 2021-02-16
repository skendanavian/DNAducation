import React from "react";
import { Typography, Box } from "@material-ui/core";

import ExamCard from "./ExamCard";

export default function ExamsContainer(props) {
  const { exams, type, setExamId, user } = props;

  console.log(user);

  if (!exams.length) {
    return <Typography>Nothing Here...</Typography>;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(360px, 1fr))"
      gridGap="1rem"
    >
      {exams.map((exam, index) => {
        return (
          <ExamCard
            setExamId={setExamId}
            key={`${exam.title}${index}`}
            type={type}
            exam={exam}
            user={user}
          />
        );
      })}
    </Box>
  );
}
