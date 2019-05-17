import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: "flex",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: undefined };
  }

  render() {

    return (
      <Fragment>
        <Button>
          <a href="http://localhost:3001/oauth">Authenticate with CLIO</a>
        </Button>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
