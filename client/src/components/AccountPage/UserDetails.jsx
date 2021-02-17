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
import SchoolIcon from "@material-ui/icons/School";

import SectionForm from "./SectionForm";
import ClassForm from "./ClassForm";
import TypeDnaModal from "../TypeDnaModal";

import { fetchClasses } from "../../helpers/dataFetchers";

export default function UserDetails(props) {
  const { user, type, setTdnaOpen } = props;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses()
      .then(({ data: classes }) => {
        setClasses(classes.map((cl) => ({ id: cl.id, code: cl.code })));
      })
      .catch((err) => console.error(err));
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
            <Box
              display="flex"
              m={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box mr="auto" ml={2} display="flex" alignItems="center">
                <SchoolIcon color="primary" />
              </Box>
              <Box minWidth="180px">
                <Button
                  onClick={handleSectionClick}
                  size="small"
                  variant={form === "Section" ? "contained" : "text"}
                  startIcon={<AddIcon />}
                >
                  Create Section
                </Button>
              </Box>
              <Box ml={1} minWidth="180px">
                <Button
                  onClick={handleClassClick}
                  size="small"
                  variant={form === "Class" ? "contained" : "text"}
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
            {
              <SectionForm
                setTdnaOpen={setTdnaOpen}
                user={user}
                classes={classes}
              />
            }
          </Collapse>
        </Box>
      </Collapse>
    </>
  );
}
