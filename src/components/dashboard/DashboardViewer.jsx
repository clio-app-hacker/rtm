import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "red",
  },
});

class DashboardViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.id };
    this.fetch();
  }

  fetch() {
    console.log(this.state.id);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>DashboardViewer Component</div>
      </Fragment>
    );
  }
}

DashboardViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashboardViewer);
