import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateRangeIcon from "@material-ui/icons/DateRange";

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

export default function ExamDetails({
  handleInput,
  handleDateTimePicker,
  examDetails,
  error,
}) {
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
          inputVariant="outlined"
          required
          clearable
          minutesStep={5}
          value={examDetails.date}
          label="Due Date"
          disablePast
          error={!examDetails.date && error && error.includes("date")}
          className={classes.dateField}
          onChange={handleDateTimePicker}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}
