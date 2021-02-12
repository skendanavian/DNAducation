import React from "react";

import { useHistory, useParams } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";

import SubjectIcon from "./SubjectIcon";

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

export default function Nav(props) {
  const { buttonDefs, pageTitle, setToken } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const logout = () => {
    setToken("");
    sessionStorage.removeItem("jwt");
    history.push("/login");
  };
  console.log({ buttonDefs });
  const drawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        {buttonDefs &&
          buttonDefs.map((listSection, index) => {
            return (
              <List key={index}>
                {listSection.map((button, index) => {
                  const { text, navAction } = button;
                  return (
                    <ListItem
                      button
                      key={`${text}${index}`}
                      onClick={navAction}
                    >
                      <ListItemIcon>
                        <SubjectIcon {...{ text }} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
            );
          })}
      </div>
    </>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
          <Box marginLeft="auto">
            <Button variant="contained" onClick={logout} color="secondary">
              {"Logout"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          onClose={handleDrawerToggle}
          open={mobileOpen}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
