import { useEffect, useState } from "react";
import { Box, Divider, Typography, Card, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import generateAxios from "../../helpers/generateAxios";
const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function SectionDetails(props) {
  const { details, type, user, editSection, updateContentView } = props;
  const {
    title,
    teacher_user_id,
    code,
    description,
    section_id: sectionId,
  } = details;

  const [teacher, setTeacher] = useState(type === "Teacher" ? user : {});
  const token = sessionStorage.getItem("jwt");

  // will only request user data if this is a student view, uses teacher object if not
  useEffect(() => {
    const axios = generateAxios(token);
    if (type !== "Teacher" && teacher_user_id) {
      const userURL = baseURL + `/users/${teacher_user_id}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setTeacher(userRes);
      });
    }
  }, [teacher_user_id, token, type]);

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent=""
        padding="1rem"
        margin="1rem"
      >
        <Box mr="2em" minWidth="50%">
          <Typography color="textSecondary" variant="body2">
            {code}
          </Typography>
          <Typography variant="h6">{title}</Typography>
          <Box>
            <Typography variant="body2" display="inline" color="textSecondary">
              Professor:{" "}
            </Typography>
            <Typography display="inline" color="textPrimary" variant="body2">
              {teacher && teacher.name}
            </Typography>
          </Box>
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box ml="2em">
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </Box>
      {type === "Teacher" && (
        <>
          <Divider />
          <Box m={1} display="flex" justifyContent="flex-end">
            {/* <Button
              onClick={editSection}
              size="small"
              // variant="outlined"
              startIcon={<EditIcon />}
            >
              Edit Section
            </Button> */}
            <Box ml={1}>
              <Button
                size="small"
                startIcon={<AddIcon />}
                variant="contained"
                color="secondary"
                onClick={() =>
                  updateContentView({
                    type: "Teacher",
                    view: "createExam",
                    sectionId,
                    attemptId: null,
                  })
                }
              >
                Create Exam
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
}
