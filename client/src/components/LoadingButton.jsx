import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    disable: (props) => {
      let override = theme.palette.primary.main;
      if (props.error) override = theme.palette.error.main;
      if (props.success) override = theme.palette.success.main;
      return {
        "&:hover": {
          backgroundColor: override,
        },
        cursor: "default",
        root: {
          cursor: "default",
        },
      };
    },
    icon: {
      color: "white",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    buttonSuccess: {
      backgroundColor: theme.palette.success.main,
    },
    buttonError: {
      backgroundColor: theme.palette.error.main,
    },
    loadingProgress: {
      color: theme.palette.success.main,
    },
    hideText: {
      visibility: "hidden",
    },
  };
});

export default function LoadingButton(props) {
  const {
    label = "Button",
    color = "primary",
    variant = "contained",
    size = "medium",
    handleClick = () => {
      console.log("clicked");
    },
    loading = false,
    success = false,
    error = false,
  } = props;
  const classes = useStyles({ loading, success, error });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error,
    [classes.disable]: error || loading || success,
  });
  const labelClassname = clsx({
    [classes.hideText]: error || success,
  });

  const onClick = () => {
    if (!success && !loading && !error) {
      handleClick();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant={variant}
          color={color}
          className={buttonClassname}
          onClick={onClick}
          size={size}
          disableElevation={loading || error || success}
        >
          <Typography className={labelClassname}>{label}</Typography>
        </Button>
        {loading && (
          <CircularProgress
            thickness={5}
            size={24}
            className={clsx(classes.loadingProgress, classes.icon)}
          />
        )}
        {success && (
          <Fade in={success}>
            <CheckIcon size={24} className={classes.icon} />
          </Fade>
        )}
        {error && (
          <Fade in={error}>
            <ErrorIcon size={24} className={classes.icon} />
          </Fade>
        )}
      </div>
    </div>
  );
}
