import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  Collapse,
} from "@material-ui/core";
import { useState, useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";

import SectionForm from "./SectionForm";
import ClassForm from "./ClassForm";
import TypeDnaModal from "../TypeDnaModal";

import generateAxios from "../../helpers/generateAxios";

require("dotenv").config({ path: "../../../.env" });

export default function UserDetails(props) {
  const { user, type, setTdnaOpen } = props;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const axios = generateAxios();
    axios.get("/classes").then(({ data: classes }) => {
      setClasses(classes.map((cl) => ({ id: cl.id, code: cl.code })));
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setTdnaOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTdnaOpen(false);
  };

  const handleSectionClick = () => {
    setForm((prev) => (prev === "Section" ? false : "Section"));
  };

  const handleClassClick = () => {
    setForm((prev) => (prev === "Class" ? false : "Class"));
  };

  return (
    <>
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
              <Typography
                display="inline"
                variant="body2"
                color="textSecondary"
              >
                Name:{" "}
              </Typography>
              <Typography display="inline" variant="body2">
                {user && user.name}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                display="inline"
                color="textSecondary"
              >
                Email:{" "}
              </Typography>
              <Typography display="inline" variant="body2">
                {user && user.email}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                display="inline"
                color="textSecondary"
              >
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
              {user && !user.has_recorded_typedna
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
        {type === "Teacher" && (
          <>
            <Divider />
            <Box display="flex" m={1} justifyContent="flex-end">
              <Button
                onClick={handleSectionClick}
                size="small"
                startIcon={<AddIcon />}
              >
                Create Section
              </Button>
              <Box ml={1}>
                <Button
                  onClick={handleClassClick}
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
      <Collapse in={form !== false}>
        <Box mt={2} minHeight={form ? "200px" : "0px"}>
          <Collapse in={form === "Class"}>
            {<ClassForm setClasses={setClasses} />}
          </Collapse>
          <Collapse in={form === "Section"}>
            {<SectionForm user={user} classes={classes} />}
          </Collapse>
        </Box>
      </Collapse>
    </>
  );
}
