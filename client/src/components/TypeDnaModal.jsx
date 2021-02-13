import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TypeDNA from "../typeDna/typingdna";
import highlightWords from "highlight-words";
import generateAxios from "../helpers/generateAxios";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    minWidth: "80vw",
    position: "absolute",
    backgroundColor: "#00296b",
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
    color: "#8CDD81",
    textAlign: "center",
  },
  failure: {
    color: "#Df2935",
    textAlign: "center",
  },

  highlight: {
    backgroundColor: "#fdc500",
  },
}));

export default function TypeDnaModal({ open, handleClickOpen, handleClose }) {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");
  const [profileAttempt, setProfileAttempt] = useState(1);

  let tdna = useRef(new TypeDNA());

  const testStrings = [
    "Type out this line to begin setting up your typing dna profile",
    "Here is another sentence that will be used to record your typing characteristics",
    "This is the last phrase that you will need to write out before your typing dna profile is completed",
  ];

  const testString = testStrings[profileAttempt - 1];

  //typing dna config
  const typingCode = tdna.current.getTypingPattern({
    type: 0,
    text: `${testString}`,
    targetId: "typeDna",
  });

  const inputLength = textValue.length;
  const testStringLength = testString.length;
  const tooLong = inputLength > testStringLength;
  const matchedText = textValue === testString;

  if (matchedText || inputLength === testStringLength) {
    tdna.current.stop();
    console.log(typingCode);
  }

  //set text highlighing config
  let chunks = highlightWords({
    text: testString,
    query: textValue,
    matchExactly: true,
  });

  const handleTyping = (e) => {
    setTextValue(e.target.value);
  };

  const userId = localStorage.getItem("userId");
  const token = sessionStorage.getItem("jwt");
  const axios = generateAxios(token);

  const handleButton = (e) => {
    if (profileAttempt === 3) handleClose();
    setProfileAttempt(profileAttempt + 1);

    const apiRoute = process.env.REACT_APP_REQUEST_URL + `/api/${userId}`;
    axios
      .post(apiRoute, { user_id: userId, tdnaProfile: typingCode })
      .then((res) => {
        console.log(res);
        tdna.current.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Record Your TypeDNA Profile
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="body"
        maxWidth="xl"
        modalProps={{ className: classes.root }}
      >
        <DialogContent>
          <Box
            className={classes.input}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="auto"
          >
            <Box flexGrow="1">
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
                {!matchedText && textValue.length === testStringLength
                  ? "Sentence does not match - "
                  : ""}
                {tooLong && "too many characters  ||  "}
                {matchedText
                  ? "Exact Match - Please submit your profile"
                  : `${textValue.length} of ${testStringLength}`}
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
        </DialogContent>
        <DialogActions className={classes.btnGroup}>
          <Button
            onClick={(e) => {
              handleButton(e);
            }}
            variant="contained"
            color="secondary"
            disabled={!matchedText && inputLength !== testStringLength}
          >
            Submit TypeDNA Profile
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
