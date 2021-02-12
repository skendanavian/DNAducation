import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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
  // const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
        <DialogTitle id="form-dialog-title">
          <Typography color="primary" className={classes.heading}>
            Please type the provided text in the input box and then submit
            profile.{" "}
          </Typography>
        </DialogTitle>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                corporis et culpa libero eligendi quam reiciendis provident
                omnis ad beatae facere.
              </DialogContentText>
            </Box>
            <Box flexGrow="1">
              <form
              // onSubmit={(e) => handleSubmit(e)}
              // className={classes.questionContainer}
              >
                <TextField
                  // className={classes.answerField}
                  variant="outlined"
                  placeholder="Type the above paragraph here....."
                  // value={answerText}
                  multiline
                  rows={10}
                  width="xl"
                  required
                  onChange={(e) => {
                    // setAnswerText(e.target.value);
                  }}
                  InputProps={{ className: classes.input }}
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
