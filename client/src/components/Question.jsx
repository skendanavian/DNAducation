import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import FunctionsIcon from "@material-ui/icons/Functions";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Question(props) {
  const { classCodes, pageTitle, user, setToken } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            🧬 DNAducation
          </Typography>
          <Box marginLeft="auto">
            {/* <Button variant="contained" onClick={logout} color="secondary">
              {"Logout"}
            </Button> */}
            <Typography color="secondary">
              STA 220 - EXAM 1 - Question 1
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
