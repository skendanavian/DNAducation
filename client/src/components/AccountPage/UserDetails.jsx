import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useState } from "react";

import TypeDnaModal from "../TypeDnaModal";

require("dotenv").config({ path: "../../../.env" });

export default function UserDetails(props) {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            {user && user.name}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2" display="inline" color="textSecondary">
              Email:{" "}
            </Typography>
            {user && user.email}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2" display="inline" color="textSecondary">
              Student Number:{" "}
            </Typography>
            {user && user.student_number}
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
            disabled={(user && user.has_recorded_typedna) || false}
          >
            Record Your TypeDNA Profile!
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
