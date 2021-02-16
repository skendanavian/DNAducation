import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

import { toReadable } from "../../helpers/dateHelpers";

import ExamDetails from "./ExamDetails";
import CreateQuestion from "./CreateQuestion";
import ButtonRow from "./ButtonRow";

import AddIcon from "@material-ui/icons/Add";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    margin: "2rem auto",
  },
}));

export default function CreateExam(props) {
  const { type, details, user } = props;
  const { title, teacher_user_id, code, description, section_id } = details;
  const classes = useStyles();
  console.log({ type });
  console.log({ details });
  console.log({ user });
  // console.log(user.name);
  return (
    <Card>
      <Box
        mr="2em"
        minWidth="50%"
        padding="1em"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column" /* className={classes.btnContainer} */
        >
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {code} / {section_id}
          </Typography>

          <Box>
            <Typography variant="body2" display="inline" color="textSecondary">
              Professor:{" "}
            </Typography>
            <Typography display="inline" color="primary" variant="body2">
              {user.name}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ExamDetails />
          <CreateQuestion />
          <ButtonRow />
        </Box>
      </Box>
    </Card>
  );
}
