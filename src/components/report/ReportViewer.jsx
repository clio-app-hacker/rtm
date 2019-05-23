import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const DBService = require("../../services/dbService");

const styles = theme => ({
  root: {
    display: "flex",
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
  }

  async getData() {
    console.log(this.state.id);
    this.setState({
      isLoading: true,
    });
    const result = await DBService.get(`/rtm/reports/${this.state.id}`);

    return result;
  }

  async saveData() {
    const result = await DBService.post(`/rtm/reports`, {
      "name": "Report One",
      "type": "Report",
      "path": "/reports/report",
      "description": "My first report",
      "actions": "Edit,Share,Delete",
      "content": {
        "title": "",
        "subTitle": "",
        "footer": ""
      },
      "visualization": {
        "size": "fixed"
      },
      "data": {}
    });
    return result;
  }

  componentDidMount() {
    this.getData().then(result => {
      this.setState({
        data: result.data,
        isLoading: false,
      });
    });
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
        <Button onClick={this.saveData}>Save Report</Button>
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
