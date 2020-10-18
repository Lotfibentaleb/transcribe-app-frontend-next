import React, { useEffect, useState, useCallback } from "react";
import Dropzone from 'react-dropzone';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
// @material-ui/icons
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// call api
import uploadMediaAPI from "../../apis/upload-media";

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  displayFlex: {
    display: "flex"
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
  dropzone: {
    minHeight: "148px",
    border: "4px dashed #3d58ec",
    padding: "10px 50px 40px 50px"
  },
  dropzoneContent: {
    width: "100%",
  },
  ErrorOutlineIcon: {
    fontSize: "16px",
    marginLeft: "5px",
    marginTop: "-5px"
  },
  padding20: {
    padding: "20px 0"
  },
  circularProgress: {
    fontSize: "20px"
  },
  spaceBetween: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
}));

function UploadMedia() {
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
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // stepper variables and handlers
  const [activeStep, setActiveStep] = React.useState(0);

  const getSteps = () => {
    return ['Upload File', 'Add Details', 'We Transcribe'];
  }
  const steps = getSteps();
  // dropzone variables and handlers
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const addKeyInAcceptedFiles = (selectedFiles) => {
    setAcceptedFiles(selectedFiles)
  }

  // progress variables and handlers
  const [progress, setProgress] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [loaded, setLoaded] = React.useState([]);
  const [speed, setSpeed] = React.useState([]);
  const [uploadState, setUploadState] = React.useState([]); // initial, loading, success, failure, 

  var startTime = [];
  const callbackProgress = (index, progressArray, totalArray, loadedArray, speedArray) => {
    var tempArray = [];
    progressArray.forEach(element => {
      tempArray.push(element);
    });
    setProgress(tempArray);
    tempArray = [];
    totalArray.forEach(element => {
      tempArray.push(element);
    });
    setTotal(tempArray);
    tempArray = [];
    loadedArray.forEach(element => {
      tempArray.push(element)
    });
    setLoaded(tempArray);
    tempArray = [];
    speedArray.forEach(element => {
      tempArray.push(element)
    });
    setSpeed(tempArray);
  }

  const handleRemoveFile = (event, acceptedFile) => {
    var position = 0;
    var tempArray = acceptedFiles;
    console.log('length:', tempArray.length)
    for (var i = 0; i < tempArray.length; i++) {
      console.log("file name: ", acceptedFile.name)
      console.log("temp name: ", tempArray[i].name)
      if (acceptedFile.name === tempArray[i].name) {
        position = i;
        console.log('found position', position);
        break;
      }
    }
    setAcceptedFiles(tempArray.splice(position, 1))
  }

  // initial method
  useEffect(() => {
  }, [])

  useEffect(() => {
    fileUpload();
  }, [acceptedFiles])

  const fileUpload = () => {
    let progresssArray = [];
    let totalArray = [];
    let loadedArray = [];
    let speedArray = [];
    let state = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      progresssArray.push(0);
      totalArray.push(0);
      loadedArray.push(0);
      speedArray.push(0);
      state.push('loading');
    }
    setUploadState(state);

    for (var i = 0; i < acceptedFiles.length; i++) {
      console.log("file upload function start");
      startTime = new Date();
      if (acceptedFiles.length !== 0) {
        var fileUploadInfo = new FormData();
        fileUploadInfo.append('file', acceptedFiles[i]);
        uploadMediaAPI.upload(fileUploadInfo, callbackProgress, i, startTime, progresssArray, totalArray, loadedArray, speedArray)
          .then(
            response => {
              console.log(response);
              if (response.message === 'failure') {
                state[response.index] = 'failure'
              } else {
                state[i] = 'success'
              }
              var tempArray = [];
              state.forEach(element => {
                tempArray.push(element);
              });
              setUploadState(tempArray);
            },
            error => {
              console.log(error)
              setUploadState(state);
            }
          )
      }
    }
  }

  const renderCircularPorgress = () => {
    for (var i = 0; i < uploadState.length; i++) {
      if (uploadState[i] === 'initial') {
        return null;

      } else if (uploadState[i] === "loading") {
        return <div className={classes.root}>
          <Grid container>
            <Grid item className={classes.displayFlex}>
              <Box>
                <CircularProgress size={14} color="secondary" />
              </Box>
              <Box ml={1}>
                {acceptedFiles.length} file{acceptedFiles.length === 1 ? '' : 's'} uploading
              </Box>
            </Grid>
          </Grid>
        </div>
      } else if (uploadState[i] === "failure") {
        return <div className={classes.root}>
          <Grid container>
            <Grid item className={classes.displayFlex}>
              <Box ml={1}>
                Uploading Failure.
              </Box>
            </Grid>
          </Grid>
        </div>
      } else {
        return <Box ml={1}>
          {acceptedFiles.length} file{acceptedFiles.length === 1 ? '' : 's'} uploaded
        </Box>;
      }
    }
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
              <h4 className={classes.cardTitleWhite}>Upload Audio/Video Files</h4>
              <p className={classes.cardCategoryWhite}>
                This is a subscription page.
              </p>
            </CardHeader>
            <CardBody>
              {/* Stepper part */}
              <Grid item sm={12} md={10} lg={6}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Grid>
              {/* dropzone part */}
              <Grid item sm={12} md={12} lg={8} className={classes.padding20}>
                <Dropzone
                  onDrop={selectedFiles => { addKeyInAcceptedFiles(selectedFiles) }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div className={classes.dropzone} {...getRootProps()}>
                        <div className={classes.dropzoneContent}>
                          <input {...getInputProps()} />
                          <h3><strong>Drag and drop additional audio/video file(s) here</strong></h3>
                          <Grid container alignItems="center">
                            <div>We accept most file formats</div>
                            <ErrorOutlineIcon className={classes.ErrorOutlineIcon} />
                          </Grid>
                          <Grid container alignItems="center">
                            <div>Our max file size is 4GB</div>
                            <ErrorOutlineIcon className={classes.ErrorOutlineIcon} />
                          </Grid>
                          <div><strong>{acceptedFiles.map((acceptedFile, index) => <div key={index}>{acceptedFile.path}</div>)}</strong></div>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Grid>
              {/* step 1 part */}
              <Grid item className={classes.padding20}>
                <div>Step 1: File</div>
                <Grid container>
                  {renderCircularPorgress()}
                  {acceptedFiles.map((acceptedFile, index) => {
                    return (
                      <Grid container key={index}>
                        <Grid item className={classes.root}>
                          <div className={classes.root}>
                            <Box pt={1}>
                              {acceptedFile.name}
                            </Box>
                            <Box pt={1} pb={1}>
                              {progress[index] !== undefined &&
                                <LinearProgress size={50} className={classes.linearProgress} variant="determinate" value={progress[index]} />
                              }

                            </Box>
                            <GridContainer justify="center">
                              <GridItem item sm={12} md={12}>
                                <div className={classes.spaceBetween}>
                                  <Box pb={1}>
                                    {
                                      uploadState[index] === "loading" ? 'Uploading' : ''
                                    }
                                    {
                                      uploadState[index] === "success" ? 'Uploading Success' : ''
                                    }
                                    {
                                      uploadState[index] === "failure" ? 'Uploading Failure' : ''
                                    }
                                    ({total[index] !== undefined && total[index].toFixed(2)}MB/{loaded[index] !== undefined && loaded[index].toFixed(2)}MB at {speed[index] !== undefined && speed[index].toFixed(2)}MB/s)
                                  </Box>
                                  <Button variant="contained" color="secondary" size="small" onClick={(event) => handleRemoveFile(event, acceptedFile)}>
                                    <DeleteIcon />
                                    Remove
                                  </Button>
                                </div>
                              </GridItem>
                            </GridContainer>
                          </div>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {/* step 2 part */}
              <Grid item className={classes.padding20}>
                Step 2: Details
              </Grid>
              {/* step 3 part */}
              <Grid item className={classes.padding20}>
                Step 3: Transcirbe
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UploadMedia.layout = Admin;

export default UploadMedia;

