import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";
const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function SectionDetails(props) {
  const { details, height } = props;
  const { title, teacher_user_id, code, description } = details;
  const axios = useAxios(sessionStorage.getItem("jwt"));

  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    if (teacher_user_id) {
      const userURL = baseURL + `/users/${teacher_user_id}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setTeacher(userRes);
      });
    }
  }, [axios, teacher_user_id]);

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
        margin="1rem"
        height={height}
      >
        <Box mr="2em">
          <Typography color="textSecondary" variant="overline">
            {code}
          </Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Professor:
            <Typography color="textPrimary" variant="subtitle2">
              {teacher && teacher.name}
            </Typography>
          </Typography>
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box ml="2em">
          <Typography color="textSecondary">{description}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
