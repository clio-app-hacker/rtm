import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
  },
});

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: undefined };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>Scheduler Component</div>
      </Fragment>
    );
  }
}

Scheduler.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Scheduler);
