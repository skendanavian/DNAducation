import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import AttemptTable from "./AttemptTable";
import SubjectIcon from "../SubjectIcon";
import {
  GREEN,
  PRIMARY,
  RED,
  SECONDARY,
  SNOW_WHITE,
} from "../../constants/colors";

import {
  getTimeToDue,
  dateIsPast,
  toReadable,
} from "../../helpers/dateHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#00296B",
  },
  detailsOpened: {
    gridRowStart: 1,
    gridColumnStart: 1,
    gridColumnEnd: -1,
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  startButton: {
    marginLeft: "auto",
  },
  statusTag: {
    submissions: { color: GREEN },
    overdue: { color: RED },
    upcoming: { color: PRIMARY },
  },
  avatar: {
    backgroundColor: PRIMARY,
  },
  flexRox: {
    display: "flex",
    justifyContent: "space-between",
  },
  counter: {
    marginLeft: "auto",
    color: "#5cb85c",
    alignContent: "flex-end",
  },
  modalTitile: {
    display: "flex",
    flexDirection: "column",
  },
}));

// shows, Upcoming, overdue, or submissions button
const statusTag = ({
  type,
  status,
  handleAttemptsClick,
  createExam,
  editExam,
  deleteExam,
}) => {
  const colorRef = {
    Submissions: GREEN,
    Overdue: RED,
    Upcoming: SECONDARY,
  };

  if (status === "Submissions" || type === "Teacher") {
    return (
      <Button
        color="primary"
        disabled={status !== "Submissions"}
        onClick={handleAttemptsClick}
        variant="text"
        size="small"
      >
        {status === "Submissions" ? `View ${status}` : "No submissions yet"}
      </Button>
    );
  } else {
    return (
      <Box
        bgcolor={colorRef[status]}
        color={SNOW_WHITE}
        display="inline"
        px={2}
        py={0.4}
        m={1}
        borderRadius="100px"
      >
        <Typography display="block" variant="subtitle2" color="inherit">
          {status}
        </Typography>
      </Box>
    );
  }
};

export default function ExamCard(props) {
  const { exam, user, type, setExamId, updateContentView } = props;
  const classes = useStyles();
  const history = useHistory();
  const [attemptsModal, setAttemptsModal] = useState(false);
  // const [examModal, setExamModal] = useState(false);

  const token = sessionStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");

  const handleAttemptsClick = () => {
    setAttemptsModal((prev) => !prev);
  };

  const handleStartExamClick = () => {
    if (exam && token && userId) {
      setExamId(exam.id);
      history.push("/exam");
    } else {
      console.log("tried to start an exam with storage that didnt exist");
    }
  };

  const isPast = dateIsPast(exam.due_time);
  const inTime = getTimeToDue(exam.due_time);

  let status = "";
  if (exam && exam.attempts.length) {
    status = "Submissions";
  } else if (isPast) {
    status = "Overdue";
  } else {
    status = "Upcoming";
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="assessment" className={classes.avatar}>
            <SubjectIcon text={exam.section.code} />
          </Avatar>
        }
        title={`${exam.section.code} - ${exam.title}`}
        subheader={`Due ${inTime}`}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {exam && exam.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.cardContent }}>
        <Box className={classes.flexRox}>
          {statusTag({ type, status, handleAttemptsClick })}
        </Box>
        {type === "Student" && (
          <Button
            color="secondary"
            variant="contained"
            classes={{ root: classes.startButton }}
            onClick={handleStartExamClick}
            disabled={!(user && user.has_recorded_typedna)}
          >
            START
          </Button>
        )}
      </CardActions>
      <Divider />
      <Dialog
        open={attemptsModal}
        onClose={handleAttemptsClick}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle>
          <Box className={classes.modalTitle}>
            <Typography>{exam.title} Submissions</Typography>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle2" color="textSecondary">
                Exam Due: {exam && toReadable(exam.due_time)}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          {exam.attempts.length && (
            <AttemptTable
              type={type}
              dueTime={exam.dueTime}
              attempts={exam.attempts}
              updateContentView={updateContentView}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.btnGroup}>
          <Button onClick={handleAttemptsClick} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
