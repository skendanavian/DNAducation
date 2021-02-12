import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SubjectIcon from "./SubjectIcon";

import { getTimeToDue, dateIsPast } from "../helpers/dateHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#Df2935",
  },
}));

export default function ExamCard(props) {
  const { exam } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isPast = dateIsPast(exam.due_time);
  const inTime = getTimeToDue(exam.due_time);

  let status = "";
  if (exam && exam.attempts.length) {
    status = "Submitted";
  } else if (isPast) {
    status = "Overdue";
  } else {
    status = "Upcoming";
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <SubjectIcon text={exam.section.code} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${exam.section.code} - ${exam.title}`}
        subheader={`Due ${inTime && inTime}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {status}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {exam && exam.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            {exam.attempts.length &&
              exam.attempts.map((att) => {
                return JSON.stringify(att);
              })}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
