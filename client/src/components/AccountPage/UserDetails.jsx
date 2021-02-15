import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useEffect, useState } from "react";

import generateAxios from "../../helpers/generateAxios";
import TypeDnaModal from "../TypeDnaModal";

const baseURL = process.env.REACT_APP_REQUEST_URL;
require("dotenv").config({ path: "../../../.env" });

export default function UserDetails() {
  const [user, setUser] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const userId = localStorage.getItem("userId");
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    const axios = generateAxios(token);
    if (userId && token) {
      const userURL = baseURL + `/users/${userId}`;
      axios.get(userURL).then(({ data: userRes }) => {
        setUser(userRes);
      });
    }
  }, [userId, token, open]);

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="1rem"
        margin="1rem"
      >
        <Box marginRight="2rem" minWidth="50%" overflow="hidden">
          <Typography variant="body2">
            <Typography variant="body2" display="inline" color="textSecondary">
              Name:{" "}
            </Typography>
            {user.name}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2" display="inline" color="textSecondary">
              Email:{" "}
            </Typography>
            {user.email}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2" display="inline" color="textSecondary">
              Student Number:{" "}
            </Typography>
            {user.student_number}
          </Typography>
        </Box>
        <Divider flexItem orientation="vertical" />

        <Box
          marginLeft="2rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50%"
        >
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            disabled={user.has_recorded_typedna}
          >
            {user && user.has_recorded_typedna
              ? `Record Your Typing Profile!`
              : `Typing Profile Completed`}
          </Button>
        </Box>

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
