import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";

import generateAxios from "../../helpers/generateAxios";
const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function SectionDetails(props) {
  const { details } = props;
  const { title, teacher_user_id, code, description } = details;

  const [teacher, setTeacher] = useState({});

  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    const axios = generateAxios(token);
    if (teacher_user_id) {
      const userURL = baseURL + `/users/${teacher_user_id}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setTeacher(userRes);
      });
    }
  }, [teacher_user_id, token]);

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
          <Typography variant="body2">{title}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Professor:
            <Typography color="textPrimary" variant="subtitle2">
              {teacher && teacher.name}
            </Typography>
          </Typography>
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box ml="2em">
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
