import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DefaultIcon from '@material-ui/icons/QuestionAnswer';
import ShareIcon from '@material-ui/icons/Share';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#4ABFDC",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function getIconByName(name) {
  name = name.toLowerCase();
  switch (name) {
    case "delete":
      return <DeleteIcon />
    case "edit":
      return <EditIcon />
    case "share":
      return <ShareIcon />
    default:
      return <DefaultIcon />
  }
}

function getActionIcons(row) {
  console.log("getActionIcons: ", row.actions);
  const arr = row.actions.split(',');
  console.log("arr.length: ", arr.length);

  return (
    <React.Fragment>
      {arr.length && arr.map((action, index) => {
        console.log("action => button", action);
        return (<IconButton key={index} aria-label={action} component={Link} to={`${row.path}/${action.toLowerCase()}/${row.id}`}>
          {getIconByName(action)}
        </IconButton>)
      })}
    </React.Fragment>
  )
}
function ActionTable(props) {
  const { classes, headers, rows } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow key={0}>
            {headers.map((header, index) => (
              <CustomTableCell key={index}>{header}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              {headers.map((header, index) => {
                if (header === "actions" && row[header].length > 0) {
                  return (
                    <CustomTableCell align="right" colSpan={1} key={index}>
                      {getActionIcons(row)}
                    </CustomTableCell>
                  );

                } else {
                  return (<CustomTableCell key={index}>{row[header]}</CustomTableCell>);
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ActionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionTable);
