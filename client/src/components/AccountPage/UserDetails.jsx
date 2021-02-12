import { Box, Button, Divider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";

const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function UserDetails(props) {
  const axios = useAxios(sessionStorage.getItem("jwt"));
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userId) {
      const userURL = baseURL + `/users/${userId}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setUser(userRes);
      });
    }
  }, [userId, axios]);

  return (
    <Box>
      <Typography>Name: {user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Student Number: {user.student_number}</Typography>
      <Button>Record Your TypeDNA Profile!</Button>
    </Box>
  );
}
