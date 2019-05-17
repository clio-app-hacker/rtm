import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import { DBService } from "../../services/dbService";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: "flex",
  },
});

class DashboardViewer extends Component {
  constructor(props) {
    super(props);
    console.log("props in DashboardViewer: ", props)
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
    const result = await DBService.get(`/rtm/dashboards/${this.state.id}`);
    return result;
  }

  async saveData() {
    const result = await DBService.post(`/rtm/dashboards`, {
      "name": "dashboard three",
      "actions": "Edit,Delete",
      "type": "Dashboard",
      "path": "/dashboards/dashboard",
      "description": " My Third Dashboard",
      "reports": [
        1
      ],
      "layout": "",
      "title": "My Third Dashboard"
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
        <div className={classes.root}>DashboardViewer {data.name}</div>
        <Button onClick={this.saveData}>Save Dashboard</Button>
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
