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
  },
});

export default function AttemptTable(props) {
  const { attempts, dueDate, type } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Submitted:</TableCell>
            <TableCell align="right">Status:</TableCell>
            <TableCell align="right">Mark:</TableCell>
            <TableCell align="right">Open:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts &&
            attempts.map((row, index) => {
              let submissionStatus;
              if (row.time_submitted) {
                submissionStatus = datesAreInOrder(row.time_submitted, dueDate)
                  ? "On time"
                  : "Late";
              } else {
                submissionStatus = "Not submitted";
              }
              console.log(row);
              return (
                <TableRow key={`${row.created_at}${index}`}>
                  <TableCell component="th" scope="row">
                    {toReadable(row.time_submitted)}
                  </TableCell>
                  <TableCell align="right">{submissionStatus}</TableCell>
                  <TableCell align="right">
                    {row.marks_earned || "Not marked"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => console.log("Opening attempt: ", row.id)}
                    >
                      <LaunchIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
