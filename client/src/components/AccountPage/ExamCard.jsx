import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogActions from "@material-ui/core/DialogActions";

import AttemptTable from "../AttemptTable";
import SubjectIcon from "../SubjectIcon";
import {
  GREEN,
  PRIMARY,
  RED,
  SECONDARY,
  SNOW_WHITE,
} from "../../constants/colors";

import { getTimeToDue, dateIsPast } from "../../helpers/dateHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
}));

const statusTag = (status, handleAttemptsClick) => {
  const colorRef = {
    Submissions: GREEN,
    Overdue: RED,
    Upcoming: SECONDARY,
  };

  if (status === "Submissions") {
    return (
      <Button onClick={handleAttemptsClick} variant="text" size="small">
        See Submissions
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
        <Typography display="inline" variant="subtitle2" color="inherit">
          {status}
        </Typography>
      </Box>
    );
  }
};

export default function ExamCard(props) {
  const { exam, startExam, hasRecordedProfile } = props;
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);

  const handleAttemptsClick = () => {
    setModal((prev) => !prev);
  };

  const handleStartExamClick = () => {
    startExam();
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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${exam.section.code} - ${exam.title}`}
        subheader={`Due ${inTime}`}
      />
      {}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {exam && exam.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.cardContent }}>
        {statusTag(status, handleAttemptsClick)}
        <Button
          color="secondary"
          variant="contained"
          classes={{ root: classes.startButton }}
          onClick={handleStartExamClick}
          disabled={!hasRecordedProfile}
        >
          START
        </Button>
      </CardActions>
      <Divider />
      <Dialog
        open={modal}
        onClose={handleAttemptsClick}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle>{exam.title} Submissions</DialogTitle>
        <DialogContent>
          {exam.attempts.length && (
            <AttemptTable dueTime={exam.dueTime} attempts={exam.attempts} />
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
