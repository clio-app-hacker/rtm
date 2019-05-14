import React from "react";
import { Router, Link } from "@reach/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
// themes
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import companyBaseTheme from "./themes/companyBaseTheme";

// components
import AppBar from "@material-ui/core/AppBar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import ReportIcon from "@material-ui/icons/InsertChart";
import SettingsIcon from "@material-ui/icons/Settings";
import ResourceCenterIcon from "@material-ui/icons/PlaylistAdd";
import SchedulerIcon from "@material-ui/icons/Schedule";
// components
import Dashboards from "./components/Dashboards";
import DashboardViewer from "./components/dashboard/DashboardViewer";
import Reports from "./components/Reports";
import ReportViewer from "./components/report/ReportViewer";
import DashboardDesigner from "./components/DashboardDesigner";
import ReportDesigner from "./components/ReportDesigner";
import ResourceCenter from "./components/ResourceCenter";
import Scheduler from "./components/Scheduler";
import Settings from "./components/Settings";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#0D95B7",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#E6F0F3",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#E6F0F3",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MuiThemeProvider theme={companyBaseTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Reports That Matter
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to="reports">
                <ListItem button key="Reports">
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                </ListItem>
              </Link>
              <Link to="dashboards">
                <ListItem button key="Dashboards">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboards" />
                </ListItem>
              </Link>
            </List>
            <Link to="resourceCenter">
              <ListItem button key="Resource Center">
                <ListItemIcon>
                  <ResourceCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Resource Center" />
              </ListItem>
            </Link>
            <Link to="scheduler">
              <ListItem button key="Scheduler">
                <ListItemIcon>
                  <SchedulerIcon />
                </ListItemIcon>
                <ListItemText primary="Scheduler" />
              </ListItem>
            </Link>
            <Divider />
            <List>
              <Link to="settings">
                <ListItem button key="Settings">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Router>
              <Dashboards path="/dashboards" />
              <DashboardViewer path="/dashboards/dashboard/:id" />
              <Reports path="/reports" />
              <ReportViewer path="/reports/report/:id" />
              <DashboardDesigner path="/dashboardDesigner" />
              <ReportDesigner path="/reportDesigner" />
              <ResourceCenter path="/resourceCenter" />
              <Scheduler path="/scheduler" />
              <Settings path="/settings" />
            </Router>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
