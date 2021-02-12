import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";
import TypeDnaModal from "../TypeDnaModal";

const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function UserDetails() {
  const axios = useAxios(sessionStorage.getItem("jwt"));
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId) {
      const userURL = baseURL + `/users/${userId}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setUser(userRes);
      });
    }
  }, [userId, axios]);

  return (
    <Card>
      <Box display="flex" justifyContent="center" padding="1rem" margin="1rem">
        <Box marginRight="auto">
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Student Number: {user.student_number}</Typography>
        </Box>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          marginLeft="0.5rem"
          onClick={handleClickOpen}
          disabled={user.has_recorded_typedna}
        >
          Record Your TypeDNA Profile!
        </Button>

        {open && (
          <TypeDnaModal
            open
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Card>
  );
}
