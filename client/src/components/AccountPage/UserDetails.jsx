import { Box, Button, Divider, Typography, Card } from "@material-ui/core";
import { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import TypeDnaModal from "../TypeDnaModal";

require("dotenv").config({ path: "../../../.env" });

export default function UserDetails(props) {
  const { user, type, createSection } = props;
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
          <Box>
            <Typography display="inline" variant="body2" color="textSecondary">
              Name:{" "}
            </Typography>
            <Typography display="inline" variant="body2">
              {user && user.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" display="inline" color="textSecondary">
              Email:{" "}
            </Typography>
            <Typography display="inline" variant="body2">
              {user && user.email}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" display="inline" color="textSecondary">
              Student Number:{" "}
            </Typography>
            <Typography display="inline" variant="body2">
              {user && user.student_number}
            </Typography>
          </Box>
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
      {type === "Teacher" && (
        <>
          <Divider />
          <Box display="flex" m={1} justifyContent="flex-end">
            <Button
              onClick={createSection}
              size="small"
              startIcon={<AddIcon />}
            >
              Create Section
            </Button>
            <Box ml={1}>
              <Button
                onClick={createSection}
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Create Class
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
}
