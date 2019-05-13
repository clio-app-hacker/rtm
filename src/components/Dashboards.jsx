import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "./dashboards/Dashboard";

const styles = theme => ({
  root: {
    display: "flex",
  },
});

class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: undefined };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>Dashboards Component</div>
        <Dashboard />
      </Fragment>
    );
  }
}

Dashboards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboards);
