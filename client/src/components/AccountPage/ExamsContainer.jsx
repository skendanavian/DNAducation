import React from "react";
import { Grid, Typography } from "@material-ui/core";

import ExamCard from "./ExamCard";

export default function ExamsContainer(props) {
  const { exams } = props;

  if (!exams.length) {
    return <Typography>No exams!</Typography>;
  }

  return (
    <Grid>
      {exams.map((exam) => {
        return <ExamCard key={exam.title} exam={exam} />;
      })}
    </Grid>
  );
}
