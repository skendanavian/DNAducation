import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import { postClass } from "../../helpers/requestHelpers";

const useStyles = makeStyles((theme) => ({
  select: {
    "& .MuiTextField-root": {
      width: "10ch",
    },
  },
  groupHelper: {
    fontSize: "0.8rem",
    marginBottom: "-0.6rem",
    fontStyle: "italic",
    marginLeft: "0.5rem",
  },
  error: {
    fontSize: "0.8rem",
  },
  success: {
    color: "#5cb85c",
  },
}));

export default function ClassForm(props) {
  const { setClasses, user, handleClassClick } = props;
  const styles = useStyles();

  const [subject, setSubject] = useState("");
  const [numberCode, setNumberCode] = useState(100);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleSubject = (e) => {
    setSubject(e.target.value.toUpperCase());
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleNumberCode = (e) => {
    setNumberCode(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const code = `${subject} ${numberCode}`;
    postClass({ title, description, code })
      .then((res) => {
        const { data: classRes } = res;
        setCodeError(false);
        setError("");
        setClasses((prev) => [...prev, { code, id: classRes[0].id }]);
        setSuccess(true);
        const t = setTimeout(() => {
          handleClassClick();
          setSuccess(false);
          clearTimeout(t);
        }, 1800);
      })
      .catch((err) => {
        console.error(err);
        if (err.message && err.message.search(409)) {
          setError(`Error: Code and subject must be unique`);
        } else {
          setError(err.message);
        }
        setCodeError(true);
      });
  };

  return (
    <Card>
      {success && (
        <Box m={2} display="flex" justifyContent="center">
          <Typography className={styles.success} variant="p">
            Your new class has been created!
          </Typography>
        </Box>
      )}
      <Box display="flex" height="168px" flexDirection="column" m={2}>
        <form onSubmit={submitHandler}>
          <Box>
            <Box display="flex" alignItems="flex-start">
              <Box width="9rem" mb={1}>
                <TextField
                  label="Subject"
                  inputProps={{ maxLength: 4 }}
                  variant="outlined"
                  value={subject}
                  onChange={handleSubject}
                  error={codeError}
                  margin="dense"
                  size="small"
                  required
                />
              </Box>
              <Box width="8rem" mx={1}>
                <TextField
                  inputProps={{ maxLength: 4 }}
                  id="number-code"
                  label="Code"
                  variant="outlined"
                  error={codeError}
                  required
                  margin="dense"
                  onChange={handleNumberCode}
                />
              </Box>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                onChange={handleTitle}
              />
            </Box>
          </Box>
          <Box display="flex">
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              maxrows={3}
              fullWidth
              margin="none"
              onChange={handleDescription}
            />
            <Box
              ml={2}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              maxWidth="90px"
            >
              <Typography
                classes={{ root: styles.error }}
                variant="body2"
                color="error"
              >
                {error}
              </Typography>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
