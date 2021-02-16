import { useEffect, useState } from "react";
import { Box, Divider, Typography, Card, Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SchoolIcon from "@material-ui/icons/School";

import SectionForm from "./SectionForm";

import generateAxios from "../../helpers/generateAxios";
const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function SectionDetails(props) {
  const { details, type, user, createExam, setTdnaOpen } = props;

  const { title, teacher_user_id, code, description } = details;

  const [teacher, setTeacher] = useState(type === "Teacher" ? user : {});
  const [form, setForm] = useState(false);

  const token = sessionStorage.getItem("jwt");

  // will only request user data is this is a student view, uses teacher object if not
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
    <>
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
              <Typography
                variant="body2"
                display="inline"
                color="textSecondary"
              >
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
              <Box mr="auto" ml={2} display="flex" alignItems="center">
                <SchoolIcon color="primary" />
              </Box>
              <Button
                onClick={setForm((prev) => !prev)}
                size="small"
                startIcon={<EditIcon />}
                variant={form === "Section" ? "contained" : "text"}
              >
                Change Enrollment
              </Button>
              <Box ml={1}>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={createExam}
                >
                  Create Exam
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Card>
      {/* <Collapse in={form !== false}>
        <Box mt={2} minHeight={form ? "200px" : "0px"}>
          <Collapse in={form === "Section"}>
            {<SectionForm setTdnaOpen={setTdnaOpen} user={user} />}
          </Collapse>
        </Box>
      </Collapse> */}
    </>
  );
}
