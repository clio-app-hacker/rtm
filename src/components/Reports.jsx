import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ActionTable from "./ActionTable";

const DBService = require("../services/dbService");

const styles = theme => ({
  root: {
    display: "flex",
  },
});

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getData().then(result => {
      console.log("Result:", result);
    });
  }

  async getData() {
    console.log(this.state.id);
    this.setState({
      isLoading: true,
    });
    const result = await DBService.get(`/rtm/reports`);
    this.setState({
      data: result.data,
      isLoading: false,
    });
    return result;
  }

  render() {
    const { data } = this.state;
    const headers = ["id", "name", "description", "actions"];
    return (
      <Fragment>
        <ActionTable headers={headers} rows={data} />
      </Fragment>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Reports);
