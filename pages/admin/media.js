import React, { useEffect, useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// @material-ui/icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import mediaData from "assets/data/media.json";

// styles
const useStyles = makeStyles((theme) => ({
  cloudUploadIcon: {
    paddingRight: "10px",
  },
  cloudUploadButton: {
    marginBottom: "10px",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  datePicker: {
    marginRight: "20px"
  },
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750,
  },
  head: {
    backgroundColor: "#3d58ec",
    color: "white"
  },
  headSortLabel: {
    color: "white"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

// table variables
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'media_file', label: 'Media File' },
  { id: 'export_options', label: 'Export Options' },
  { id: 'created_on', label: 'Created On' },
  { id: 'finished_on', label: 'Finished On' },
  { id: 'metadata', label: 'Meta Data' },
  { id: 'credit_used', label: 'Credit Used' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];
// table functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.head}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Media() {
  // styles
  const classes = useStyles();
  // snackbar variables and handle events
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [openMessage, setOpenMessage] = React.useState(false);
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };
  // data picker varialbles
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());
  // data picker handlers
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  // functions
  const handleGotoUploadMedia = () => {
    Router.push("/admin/dashboard");
  }
  // table variables
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  // table handle event
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // handle edit media
  const handleEditMedia = () => {
    // add delete method
  }

  // handle delete media
  const handleDeleteMedia = (event, id) => {
    if (confirm("Do you want to delete this media?")) {
      // add delete method
    }
  }

  // initial method
  useEffect(() => {
    getMedias();
  }, [])

  const getMedias = () => {
    setRows(mediaData)
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* snackbar component */}
          <Snackbar
            open={openMessage}
            autoHideDuration={5000}
            onClose={handleMessageClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Alert onClose={handleMessageClose} severity={messageType}>
              {message}
            </Alert>
          </Snackbar>
          {/* page content */}
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Media List</h4>
              <p className={classes.cardCategoryWhite}>
                This is a media list page.
              </p>
            </CardHeader>
            <CardBody>
              <Grid container justify="flex-end">
                <Button className={classes.cloudUploadButton} variant="contained" color="primary" onClick={handleGotoUploadMedia}>
                  <CloudUploadIcon className={classes.cloudUploadIcon} />
                    Upload new media
                  </Button>
              </Grid>
              <Grid container alignItems="center">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="From"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="To"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Button variant="contained" color="primary" className={classes.viewMediaButton}>
                  View Medias
                </Button>
              </Grid>
              {/* table part */}
              <div className={classes.root}>
                <Paper className={classes.paper}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size="medium"
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return (
                              <TableRow key={row.id}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                >
                                  {row.id}
                                </TableCell>
                                <TableCell>{row.media_file}</TableCell>
                                <TableCell>{row.export_options}</TableCell>
                                <TableCell>{row.created_on}</TableCell>
                                <TableCell>{row.finished_on}</TableCell>
                                <TableCell>{row.metadata}</TableCell>
                                <TableCell>{row.credit_used}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="center">
                                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={(event) => handleEditMedia(event, row.id)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={(event) => handleDeleteMedia(event, row.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Media.layout = Admin;

export default Media;

