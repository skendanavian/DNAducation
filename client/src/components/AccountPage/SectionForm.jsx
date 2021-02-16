import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import generateAxios from "../../helpers/generateAxios";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "12ch",
    },
  },
}));

export default function SectionForm(props) {
  const { user, classes } = props;
  const styles = useStyles();

  const token = sessionStorage.getItem("jwt");
  const [classCode, setClassCode] = useState("");
  const [studentNumbers, setStudentNumbers] = useState([]);

  const axios = generateAxios(token);

  const handleClass = (e) => {
    setClassCode(e.target.value);
  };

  const handleStudentNumbers = (e) => {
    setStudentNumbers(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/sections", { classCode, studentNumbers, userId: user.id });
  };

  return (
    <Card>
      <Box display="flex" height="168px" flexDirection="column" m={2}>
        <form onSubmit={submitHandler}>
          <Box mb={2} display="flex">
            <Box width="100%">
              <TextField
                helperText="Enter in the Student Numbers to be enrolled in the section, separated by commas"
                id="student-numbers"
                label="Student Numbers"
                variant="outlined"
                multiline
                required
                fullWidth
                rows={4}
                rowsMax={4}
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
