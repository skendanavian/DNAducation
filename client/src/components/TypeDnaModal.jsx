import React from "react";
import { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import TypeDNA from "../typeDna/typingdna";
import highlightWords from "highlight-words";
import generateAxios from "../helpers/generateAxios";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    minWidth: "80vw",
    position: "absolute",
    backgroundColor: "rgba(221,237,255,0.75)",
    padding: "0.5rem",
  },
  input: {
    width: "70vw",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  heading: {
    fontSize: "1.3rem",
    textAlign: "center",
  },
  success: {
    color: "#5cb85c",
    textAlign: "center",
  },
  failure: {
    color: "#Df2935",
    textAlign: "center",
  },

  highlight: {
    backgroundColor: "#fdc500",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
}));

require("dotenv").config({ path: "../../.env" });
const baseURL = process.env.REACT_APP_REQUEST_URL;

export default function TypeDnaModal({ open, handleClickOpen, handleClose }) {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");
  const [profileAttempt, setProfileAttempt] = useState(0);
  const [profileError, setProfileError] = useState("");
  const [view, setView] = useState("INTRO");

  const testStrings = [
    "Please type out this line to begin recording your typing biometrics profile",
    "Here is another sentence that will be used to help record your unique typing style",
    "This is the last sample that you will need to type out before your typing biometrics profile is completed",
  ];

  const testString = testStrings[profileAttempt - 1];

  //typing dna config
  let tdna = new TypeDNA();
  const typingPattern = tdna.getTypingPattern({
    type: 0,
    text: `${testString}`,
    targetId: "typeDna",
  });

  const inputLength = textValue.length;
  const testStringLength = testString ? testString.length : 0;
  const tooLong = inputLength > testStringLength;
  const matchedText = textValue === testString;

  let chunks = highlightWords({
    text: testString,
    query: textValue,
    matchExactly: true,
  });

  const handleTyping = (e) => {
    if (profileError && inputLength === 0) setProfileError("");
    setTextValue(e.target.value);
  };

  const userId = localStorage.getItem("userId");
  const token = sessionStorage.getItem("jwt");
  const axios = generateAxios(token);
  const submissionError = "Failed to record profile. Please try again.";

  const handleButton = (e) => {
    if (view === "INTRO") {
      setProfileAttempt(1);
      setView("PROFILE");
      return;
    }
    const apiRoute = process.env.REACT_APP_REQUEST_URL + `/api/${userId}`;
    axios
      .post(apiRoute, { userId, typingPattern })
      .then((res) => {
        console.log(res.data);
        tdna.stop();
        tdna.reset();
        tdna.start();

        if (!res.data.statusCode || res.data.statusCode !== 200) {
          setProfileError(submissionError);
          console.log(profileError);
          setTextValue("");
        } else {
          /* Updating Typing Profile Flag For User In DB */
          if (profileAttempt === 3) {
            const data = { userId, status: true };
            axios
              .patch(`${baseURL}/users/${userId}`, data)
              .then((res) => {
                console.log("Update Typingdna: ", res.data);
                handleClose();
              })
              .catch((e) => {
                console.log(e);
                setProfileError(submissionError);
              });
          }
          if (profileAttempt < 3) setProfileAttempt(profileAttempt + 1);
          setTextValue("");
        }
      })
      .catch((err) => {
        console.log(err);
        setProfileError(submissionError);
        setTextValue("");
      });
  };

  return (
    <div>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="body"
        maxWidth="xl"
      >
        <DialogContent>
          {view === "INTRO" && (
            <Box
              className={classes.input}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              margin="auto"
            >
              <Typography color="primary" component="h1" variant="h5">
                🧬 DNAducation{" "}
              </Typography>

              <hr />
              <Typography>
                - DNAduction uses an advanced typing biometrics software
                provided by{" "}
                <Link href="https://www.typingdna.com/" target="_blank">
                  Typingdna
                </Link>{" "}
                to help promote academic honesty in remote learning
                environments.{" "}
              </Typography>
              <Typography>
                - In order to take any online assessments, students must first
                record a typing biometric reference. Please type out the
                upcoming sentences as you would in your everyday life.
              </Typography>
            </Box>
          )}

          {view === "PROFILE" && (
            <Box
              className={classes.input}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              margin="auto"
            >
              <Typography color="primary" component="h1" variant="h5">
                🧬 DNAducation{" "}
              </Typography>
              <hr />
              <Box flexGrow="1">
                <Typography
                  color="primary"
                  className={classes.title}
                >{`Step ${profileAttempt} of 3`}</Typography>
                <DialogContentText color="primary">
                  {chunks.map(({ text, match, key }) =>
                    match ? (
                      <span className={classes.highlight} key={key}>
                        {text}
                      </span>
                    ) : (
                      <span key={key}>{text}</span>
                    )
                  )}
                </DialogContentText>
                <div
                  className={
                    textValue.length === testStringLength && matchedText
                      ? classes.success
                      : classes.failure
                  }
                >
                  {profileError && profileError}
                  {!matchedText && textValue.length === testStringLength
                    ? "Sentence does not match"
                    : ""}
                  {tooLong && "Too many characters"}
                  {matchedText ? "Exact Match - Please Submit Profile" : ""}
                </div>
              </Box>
              <Box flexGrow="1">
                <form>
                  <TextField
                    variant="outlined"
                    placeholder="Type the above line here....."
                    value={textValue}
                    multiline
                    rows={5}
                    width="xl"
                    required
                    onChange={(e) => {
                      handleTyping(e);
                    }}
                    InputProps={{
                      className: classes.input,
                      id: "typeDna",
                    }}
                  ></TextField>
                </form>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions className={classes.btnGroup}>
          <Button
            onClick={(e) => {
              handleButton(e);
            }}
            variant="contained"
            color="secondary"
            disabled={
              view === "RECORD" &&
              !matchedText &&
              inputLength !== testStringLength
            }
          >
            {view === "INTRO" && "Begin Recording Profile"}
            {view === "PROFILE" && "Submit Biometrics"}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
