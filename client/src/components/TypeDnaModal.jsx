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
}));

export default function TypeDnaModal({ open, handleClickOpen, handleClose }) {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");

  // tdna.getTypingPattern({ type: 0, length: 180 });
  // const textArea = document.getElementById("typeDna");
  // tdna.getTypingPattern(20, "Hello World");

  // console.log(typeDna.getTypingPattern({ id: "typeDna" }));
  // console.log(TypeDNA);
  const tdna = new TypeDNA();

  const testString = "Type this line to set up your typing dna authorization";

  const typingCode = TypeDNA.getTypingPattern({
    type: 0,
    text: `${testString}`,
    targetId: "typeDna",
  });

  const tooLong = textValue.length > testString.length;
  const matchedText = textValue === testString;

  if (matchedText || textValue.length === testString.length) {
    TypeDNA.stop();
    console.log(typingCode);
  }
  const handleTyping = (e) => {
    setTextValue(e.target.value);
  };

  //This line may have some potential.  Currently console.logs the counter for key presses.
  // console.log(tdna.auto({ id: "123456", tp: "hello world" }));
  // console.log(tdna);
  // tdna.addTarget("typeDna");
  // console.log(tdna);

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
                {testString}
              </DialogContentText>
              <div
                className={
                  textValue.length === testString.length && matchedText
                    ? classes.success
                    : classes.failure
                }
              >
                {!matchedText && textValue.length === testString.length
                  ? "Sentence does not match - "
                  : ""}
                {tooLong && "too many characters  ||  "}
                {matchedText
                  ? "Exact Match - Please submit your profile"
                  : `${textValue.length} of ${testString.length}`}
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
                  //added custom id for type dna to grab value
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
          <Button onClick={handleClose} variant="contained" color="secondary">
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
