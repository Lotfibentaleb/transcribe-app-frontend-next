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
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// @material-ui/icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreIcon from '@material-ui/icons/More';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// call api
import mediaAPI from "../../apis/media";
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
  },
  iconBtnTextPos: {
    marginLeft: "10px"
  },
  notTranscirbed: {
    display: "flex",
    alignItems: "center",
    color: '#f50057',
    fontSize: "16px",
    fontWeight: "700",
    paddingRight: "20px"
  },
  transcribed: {
    marginLeft: "10px"
  },
  transcirbed: {
    display: "flex",
    alignItems: "center",
    color: '#3f51b4',
    fontSize: "16px",
    fontWeight: "700",
    paddingRight: "20px"
  },
}));

// table variables
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'file_name', label: 'File Name' },
  { id: 'export_options', label: 'Export Options' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  { id: 'metadata', label: 'Meta Data' },
  { id: 'credit_used', label: 'Credit Used' },
  { id: 'transcribe_status', label: 'Status' },
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
    Router.push("/admin/upload_media");
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

  // handle delete media
  const handleDeleteMedia = (event, id) => {
    if (confirm("Do you want to delete this media?")) {
      mediaAPI.deleteMedia(id)
        .then(
          response => {
            if (response.success === 'true') {
              setMessageType("success")
              setMessage(response.msg)
              setOpenMessage(true);
              setPage(0);
              setRows(response.media_list)
            } else {
              setMessageType("error")
              setMessage(response.msg)
              setOpenMessage(true);
            }
          },
          error => {
            setMessageType("error")
            setMessage(error)
            setOpenMessage(true);
          }
        )
    }
  }

  // dialog variables and handle events
  const [openDialog, setOpenDialog] = React.useState(false);
  const [mediaInfo, setMediaInfo] = React.useState();
  // handle show more media information
  const handleShowMedia = (event, id) => {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        setMediaInfo(rows[i]);
      }
    }
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // initial method
  useEffect(() => {
    getMedias();
  }, [])

  const getMedias = () => {
    mediaAPI.medias()
      .then(
        response => {
          setRows(response.media_list)
        },
        error => {
          setMessageType("error")
          setMessage(error)
          setOpenMessage(true);
        }
      )
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
                    id="date-picker-from"
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
                    id="date-picker-to"
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
                                <TableCell>{row.file_name}</TableCell>
                                <TableCell>{row.export_options}</TableCell>
                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.updatedAt}</TableCell>
                                <TableCell>{row.metadata}</TableCell>
                                <TableCell>{row.credit_used}</TableCell>
                                {/* <TableCell>{row.transcribe_status}</TableCell> */}
                                <TableCell>
                                  {
                                    row.transcribe_status === 0 ?
                                      <Tooltip title="Start Transcribe" arrow>
                                        <IconButton variant="contained" color="secondary" className={classes.viewMediaButton}>
                                          <RecordVoiceOverIcon />
                                        </IconButton>
                                      </Tooltip>
                                      :
                                      <Tooltip title="Preview Transcribe" arrow>
                                        <IconButton variant="contained" color="primary" className={classes.viewMediaButton}>
                                          <VisibilityIcon />
                                        </IconButton>
                                      </Tooltip>
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  <Tooltip title="Show more media information" arrow>
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={(event) => handleShowMedia(event, row.id)}>
                                      <MoreIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete current media" arrow>
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={(event) => handleDeleteMedia(event, row.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
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
      {/* dialog part */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Media Information</DialogTitle>
        <DialogContent>
          {console.log(mediaInfo)}
          <Grid container>
            <Grid item md={4}>
              <strong>Media ID</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.id}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>User ID</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.userId}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Media Name</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.file_name}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>File Path</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.s3_url}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Created At</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.createdAt}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Updated At</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.updatedAt}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Meta Data</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.updatedAt}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Credit Used</strong>
            </Grid>
            <Grid item md={8}>
              {mediaInfo !== undefined && mediaInfo.updatedAt}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <strong>Status</strong>
            </Grid>
            <Grid item md={8}>
              {
                mediaInfo !== undefined && mediaInfo.transcribe_status !== 0 ?
                  <Grid container>
                    <Grid item className={classes.notTranscirbed}>Not Transcribed</Grid>
                    <Grid item>
                      <Button variant="contained" color="secondary" size="small" className={classes.viewMediaButton}>
                        <RecordVoiceOverIcon />
                        <div className={classes.iconBtnTextPos}>Start Transcribe</div>
                      </Button>
                    </Grid>
                  </Grid>
                  :
                  <Grid container>
                    <Grid item className={classes.transcirbed}>Transcribed</Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" size="small" className={classes.viewMediaButton}>
                        <VisibilityIcon />
                        <div className={classes.iconBtnTextPos}>Preview Transcribe</div>
                      </Button>
                    </Grid>
                  </Grid>
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Media.layout = Admin;

export default Media;

