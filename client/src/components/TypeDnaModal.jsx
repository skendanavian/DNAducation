import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

//Currently importing from NPM package
import TypingDnaClient from "typingdnaclient";

// Alternate ways to import typedna
// import TypingDNA from "../typeDna/typingdna";
// import "../typeDna/typingdna";

const tdna = new TypingDnaClient(
  process.env.REACT_APP_TYPEDNA_API_KEY,
  process.env.REACT_APP_TYPEDNA_SECRET
);

console.log(tdna);

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
}));

export default function TypeDnaModal({ open, handleClickOpen, handleClose }) {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");

  // tdna.getTypingPattern({ type: 0, length: 180 });
  // const textArea = document.getElementById("typeDna");
  // tdna.getTypingPattern(20, "Hello World");

  const testString = "Type this line to set up your typing dna authorization.";

  const tooLong = textValue.length > testString.length;
  const matchedText = textValue === testString;

  const handleTyping = (e) => {
    setTextValue(e.target.value);
  };

  //This line may have some potential.  Currently console.logs the counter for key presses.
  console.log(tdna.auto());

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
              <DialogContentText color="primary">
                {matchedText && "Exact Match"}
              </DialogContentText>
              <DialogContentText color="error">
                {!matchedText && textValue.length === testString.length
                  ? "sentence does not match  ||   "
                  : ""}
                {tooLong && "too many characters  ||  "}
                {textValue.length} / {testString.length} characters
              </DialogContentText>
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
