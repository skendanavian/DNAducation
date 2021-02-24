import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { getNow } from "../../helpers/dateHelpers";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import { makeStyles } from "@material-ui/styles";
// require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  dateField: {
    marginTop: "0.8rem",
    marginBottom: "3rem",
  },
}));

export default function ExamDetails({ handleInput, examDetails }) {
  const classes = useStyles();

  return (
    <Box>
      <TextField
        id="title"
        value={examDetails.title}
        label="Exam Title"
        name="examDetails"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus
        onChange={handleInput}
      />
      <TextField
        id="desc"
        value={examDetails.desc}
        name="examDetails"
        label="Exam Description"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleInput}
      />
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <DateTimePicker
          id="date"
          value={examDetails.date}
          label="Due Date"
          name="examDetails"
          disablePast
          className={classes.dateField}
          initialFocusedDate={getNow()}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInput}
        />
      </MuiPickersUtilsProvider>
      {/* <TextField
        id="date"
        value={examDetails.date}
        label="Due Date"
        name="examDetails"
        type="datetime-local"
        fullWidth
        className={classes.dateField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInput}
      /> */}
    </Box>
  );
}
