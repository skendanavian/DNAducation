import React from "react";

import { useHistory } from "react-router-dom";

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

import SubjectIcon from "../SubjectIcon";
import { LIGHT_GRAY } from "../../constants/colors";

const drawerWidth = 200;

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
    backgroundColor: "#ddedff",
    minHeight: "100vh",
    backgroundImage: `url(
      "https://www.transparenttextures.com/patterns/light-aluminum.png"
    )`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  listSelected: {
    backgroundColor: "#fdc500",
  },
  listUnSelected: {
    backgroundColor: "white",
  },
}));

export default function Nav(props) {
  const { navButtons, pageTitle, setToken, contentView } = props;
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
    localStorage.removeItem("userId");
    history.push("/login");
  };
  const drawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        {navButtons &&
          Object.values(navButtons).map((listSection, index) => {
            return (
              <Box key={`B${index}`}>
                {index > 0 && listSection.length > 0 && <Divider />}
                <List>
                  {listSection.map((button, index) => {
                    const { text, navAction, type, sectionId } = button;
                    const isHighlighted =
                      (sectionId === contentView.sectionId &&
                        type === contentView.type) ||
                      text === contentView.view;
                    return (
                      <ListItem
                        button
                        key={`${text}${index}`}
                        onClick={navAction}
                        className={
                          isHighlighted
                            ? classes.listSelected
                            : classes.listUnSelected
                        }
                      >
                        <ListItemIcon>
                          <SubjectIcon {...{ text, type }} />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
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
            <Button
              variant="contained"
              onClick={logout}
              disableElevation
              color="primary"
            >
              {"Logout"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden smDown implementation="css">
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
      <Hidden lgUp implementation="css">
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
