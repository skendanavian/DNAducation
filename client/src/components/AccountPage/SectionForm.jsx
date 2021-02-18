import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import { postSection } from "../../helpers/requestHelpers";

const useStyles = makeStyles((theme) => ({
  success: {
    color: "#5cb85c",
  },
}));

export default function SectionForm(props) {
  const { user, classes, setTdnaOpen, handleSectionClick } = props;
  const styles = useStyles();

  const [classCode, setClassCode] = useState("");
  const [studentNumbers, setStudentNumbers] = useState([]);

  const [studentNumbersError, setStudentNumberError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClass = (e) => {
    setClassCode(e.target.value);
  };

  const handleStudentNumbers = (e) => {
    setStudentNumbers(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const splitNumbers = studentNumbers.split(",");
    const validateSNs = splitNumbers.every((sn) => {
      return new RegExp(/^[0-9]{6}$/).test(sn);
    });

    if (!validateSNs) {
      setError("Syntax Error in Student Numbers");
      setStudentNumberError(true);
    } else {
      setError("");
      setStudentNumberError(false);

      postSection({
        classId: classCode,
        studentNumbers: splitNumbers,
        userId: user.id,
      })
        .then((rows) => {
          setSuccess(true);
          const t = setTimeout(() => {
            handleSectionClick();
            setSuccess(false);
            clearTimeout(t);
          }, 1800);
          setTdnaOpen((prev) => !prev);
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <Card>
      <Box display="flex" height="168px" flexDirection="column" m={2}>
        {success && (
          <Box display="flex" justifyContent="center">
            <Typography className={styles.success} variant="p">
              Your section has been created!
            </Typography>
          </Box>
        )}
        <form onSubmit={submitHandler}>
          <Box mb={2} display="flex">
            <Box width="100%">
              <TextField
                helperText="Enter in the Student Numbers to be enrolled in the section, separated by commas and no spaces"
                id="student-numbers"
                label="Student Numbers"
                variant="outlined"
                multiline
                required
                fullWidth
                rows={4}
                rowsMax={4}
                error={studentNumbersError}
                margin="dense"
                onChange={handleStudentNumbers}
              />
            </Box>
            <Box
              className={styles.root}
              ml={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <TextField
                select
                label="Class"
                required
                value={classCode}
                onChange={handleClass}
              >
                {classes &&
                  classes.map((cl) => {
                    const { id, code } = cl;
                    return (
                      <MenuItem key={`${id}${code}`} value={id}>
                        {code}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <Typography
                classes={{ root: styles.error }}
                variant="body2"
                color="error"
              >
                {error}
              </Typography>
              <Box>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
