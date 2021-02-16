import { Box, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

require("dotenv").config({ path: "../../../.env" });

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    margin: "2rem auto",
  },
}));

export default function ButtonRow({ handleSubmit }) {
  const classes = useStyles();

  return (
    <Box className={classes.btnContainer}>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        marginRight="1rem"
        startIcon={<AddIcon />}
        onClick={() => handleSubmit()}
      >
        Add Question
      </Button>
      <Button
        type="submit"
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<SaveIcon />}
      >
        Save And Publish{" "}
      </Button>
    </Box>
  );
}
