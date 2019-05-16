import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import { DBService } from "../../services/dbService";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "red",
  },
});

class ReportViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      data: { name: "undefined" },
      isLoading: false,
    };
    this.getData().then(result => {
      console.log(result);
    });
  }

  async getData() {
    console.log(this.state.id);
    this.setState({
      isLoading: true,
    });
    const result = await DBService.get(`/api/reports/${this.state.id}`);
    this.setState({
      data: result.data,
      isLoading: false,
    });
    return result;
  }

  render() {
    const { classes } = this.props;
    const { data, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <Fragment>
        <div className={classes.root}>ReportViewer {data.name}</div>
      </Fragment>
    );
  }
}

ReportViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReportViewer);
