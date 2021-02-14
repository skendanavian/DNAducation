import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { datesAreInOrder, toReadable } from "../helpers/dateHelpers";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function AttemptTable(props) {
  const { attempts, dueDate } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date:</TableCell>
            <TableCell align="right">Status:</TableCell>
            <TableCell align="right">Mark:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts &&
            attempts.map((row) => {
              let submissionStatus;
              if (row.submitted_at) {
                submissionStatus = datesAreInOrder(row.submitted_at, dueDate)
                  ? "On time"
                  : "Late";
              } else {
                submissionStatus = "Not submitted";
              }
              return (
                <>
                  <TableRow key={row.created_at}>
                    <TableCell component="th" scope="row">
                      {toReadable(row.created_at)}
                    </TableCell>
                    <TableCell align="right">{submissionStatus}</TableCell>
                    <TableCell align="right">
                      {row.average_mark || "Not marked"}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
