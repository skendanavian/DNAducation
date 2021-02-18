import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LaunchIcon from "@material-ui/icons/Launch";

import { datesAreInOrder, toReadable } from "../helpers/dateHelpers";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    backgroundColor: "#f5f5f5",
  },
});

export default function AttemptTable(props) {
  const { attempts, type, updateContentView } = props;
  const classes = useStyles();

  const clickAttemptHandler = (attemptId) => {
    updateContentView({
      view: "Attempt",
      type: "Teacher",
      sectionId: null,
      attemptId,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead color="primary">
          <TableRow>
            {type === "Teacher" && <TableCell align="left">Name:</TableCell>}
            <TableCell>Submitted:</TableCell>
            {type === "Teacher" && <TableCell>Verification:</TableCell>}
            <TableCell align="right">Grade:</TableCell>
            {type === "Teacher" && <TableCell align="right">Open:</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts &&
            attempts.map((row, index) => {
              return (
                <TableRow key={`${row.created_at}${index}`}>
                  {type === "Teacher" && (
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {row.time_submitted
                      ? toReadable(row.time_submitted)
                      : "Not Submitted"}
                  </TableCell>
                  {type === "Teacher" && (
                    <TableCell align="center">
                      {row.average_confidence}%
                    </TableCell>
                  )}
                  <TableCell align="right">
                    {row.marks_earned || "In Progress"}
                  </TableCell>
                  {type === "Teacher" && (
                    <TableCell align="right">
                      <IconButton
                        onClick={() => clickAttemptHandler(row.exam_attempt_id)}
                      >
                        <LaunchIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
