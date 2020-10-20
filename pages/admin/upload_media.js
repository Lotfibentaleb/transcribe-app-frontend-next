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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import { Typography } from "@material-ui/core";
import {
  IconFlagUS,
  IconFlagUK,
  IconFlagAU,
  IconFlagFR,
  IconFlagDE,
  IconFlagES
} from 'material-ui-flags';
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
import transcribeAPI from "../../apis/transcribe";

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
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#3f51b5",
  },
  uploading: {
    fontWeight: '700',
    color: '#3f51b5'
  },
  uploadSuccess: {
    fontWeight: '700',
    color: 'green'
  },
  uploadFailure: {
    fontWeight: '700',
    color: '#c51162'
  },
  formControl: {
    minWidth: "240px"
  },
  iconBtnTextPos: {
    marginLeft: "10px"
  },
}));


function getJSONP(url, success) {

  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  return req.responseText;
}

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
    return ['Upload File', 'Add Details', 'Transcribe'];
  }
  const steps = getSteps();
  // dropzone variables and handlers
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  // uploaded file informatin
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // transcribed file information
  const [transcribedFiles, setTranscribedFiles] = useState([]);
  const [transcribeStates, setTranscribeStates] = useState([]);
  const [allTranscribeState, setAllTranscribeState] = useState('success');

  const addKeyInAcceptedFiles = (selectedFiles) => {
    setAcceptedFiles(selectedFiles)
  }

  // progress variables and handlers
  const [progress, setProgress] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [loaded, setLoaded] = React.useState([]);
  const [speed, setSpeed] = React.useState([]);
  const [uploadState, setUploadState] = React.useState([]); // initial, loading, success, failure, 

  var startTime;
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
    for (var i = 0; i < tempArray.length; i++) {
      if (acceptedFile.name === tempArray[i].name) {
        position = i;
        break;
      }
    }
    setAcceptedFiles(tempArray.splice(position, 1))
  }

  // spoken language select component
  const [spokenLanguage, setSpokenLanguage] = React.useState("en-US");
  const handleChangeLanguage = (event) => {
    setSpokenLanguage(event.target.value);
  };

  // transcribe handler
  const handleTranscribeStart = () => {
    let state = [];
    setTranscribedFiles([]);
    for (var i = 0; i < uploadedFiles.length; i++) {
      state.push('transcribing');
    }
    setTranscribeStates(state);
    setAllTranscribeState('transcribing');
    setActiveStep(2);
    for (var i = 0; i < uploadedFiles.length; i++) {
      transcribeAPI.multitranscribes(uploadedFiles[i].s3_url, uploadedFiles[i].mediaId, i, spokenLanguage)
        .then(
          response => {
            if (response.success === 'false') {
              state[response.index] = 'failure'
            } else if (response.success === 'true') {
              state[response.index] = 'success'
            }
            var tempArray = [];
            state.forEach(element => {
              tempArray.push(element);
            });
            setTranscribeStates(tempArray);
            let copiedResponse = response;
            var data = getJSONP(copiedResponse.transcribe_url)
            copiedResponse.transcript = JSON.parse(data).results.transcripts[0].transcript;
            setTranscribedFiles(transcribedFiles => [...transcribedFiles, copiedResponse]);
          },
          error => {
            console.log(error)
            setTranscribeStates(state);
          }
        )
    }

  }
  // useEffect method
  useEffect(() => {
    fileUpload();
  }, [acceptedFiles])

  useEffect(() => {
    addDetails();
  }, [uploadState])

  useEffect(() => {
    changeAllTranscribeState();
  }, [transcribeStates])

  // file upload handler
  const fileUpload = () => {
    let progresssArray = [];
    let totalArray = [];
    let loadedArray = [];
    let speedArray = [];
    let state = [];
    let uploadedArray = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      progresssArray.push(0);
      totalArray.push(0);
      loadedArray.push(0);
      speedArray.push(0);
      state.push('loading');
    }
    setUploadState(state);

    for (var i = 0; i < acceptedFiles.length; i++) {
      startTime = new Date();
      if (acceptedFiles.length !== 0) {
        var fileUploadInfo = new FormData();
        fileUploadInfo.append('file', acceptedFiles[i]);
        fileUploadInfo.append('index', i);
        uploadMediaAPI.upload(fileUploadInfo, callbackProgress, i, startTime, progresssArray, totalArray, loadedArray, speedArray)
          .then(
            response => {
              if (response.success === 'false') {
                state[response.index] = 'failure'
              } else if (response.success === 'true') {
                state[response.index] = 'success'
              }
              uploadedArray.push(response);
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
    setUploadedFiles(uploadedArray);
  }

  const addDetails = () => {
    let count = 0;
    for (var i = 0; i < uploadState.length; i++) {
      if (uploadState[i] === 'success') {
        count++;
      }
    }
    if (count === uploadState.length && count !== 0) {
      setMessageType("success");
      setMessage("All files are uploaded successfully!");
      setOpenMessage(true);
      setActiveStep(1);
    }
  }

  const changeAllTranscribeState = () => {
    var count = 0;
    for (var i = 0; i < transcribeStates.length; i++) {
      if (transcribeStates[i] === 'transcribing') {
        count++;
      }
    }
    if (count === 0) {
      setAllTranscribeState('success');
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
                        <div className={classes.root}>
                          <input {...getInputProps()} />
                          <h3><strong>Drag and drop additional audio/video file(s) here</strong></h3>
                          <Grid container alignItems="center">
                            <Typography>We accept most file formats</Typography>
                            <ErrorOutlineIcon className={classes.ErrorOutlineIcon} />
                          </Grid>
                          <Grid container alignItems="center">
                            <Typography>Our max file size is 4GB</Typography>
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
                <div className={classes.stepTitle}>Step 1: Media Upload</div>
                <Grid container>
                  {renderCircularPorgress()}
                  {acceptedFiles.map((acceptedFile, index) => {
                    return (
                      <Grid container key={index}>
                        <Grid item className={classes.root}>
                          <div className={classes.root}>
                            {
                              uploadState[index] === "loading" ?
                                <Box pt={1} className={classes.uploading}>
                                  {acceptedFile.name}
                                </Box> : ''
                            }
                            {
                              uploadState[index] === "success" ?
                                <Box pt={1} className={classes.uploadSuccess}>
                                  {acceptedFile.name}
                                </Box> : ''
                            }
                            {
                              uploadState[index] === "failure" ?
                                <Box pt={1} className={classes.uploadFailure}>
                                  {acceptedFile.name}
                                </Box> : ''
                            }
                            <Box pt={1} pb={1}>
                              {progress[index] !== undefined &&
                                <LinearProgress size={50} className={classes.linearProgress} variant="determinate" value={progress[index]} />
                              }
                            </Box>
                            <GridContainer justify="center">
                              <GridItem item sm={12} md={12}>
                                <div className={classes.spaceBetween}>
                                  {
                                    uploadState[index] === "loading" ?
                                      <Box pb={1} className={classes.uploading}>
                                        <Typography>Uploading ({total[index] !== undefined && total[index].toFixed(2)}MB/{loaded[index] !== undefined && loaded[index].toFixed(2)}MB at {speed[index] !== undefined && speed[index].toFixed(2)}MB/s)</Typography>
                                      </Box> : ''
                                  }
                                  {
                                    uploadState[index] === "success" ?
                                      <Box pb={1} className={classes.uploadSuccess}>
                                        <Typography>Upload Success ({total[index] !== undefined && total[index].toFixed(2)}MB/{loaded[index] !== undefined && loaded[index].toFixed(2)}MB at {speed[index] !== undefined && speed[index].toFixed(2)}MB/s)</Typography>
                                      </Box> : ''
                                  }
                                  {
                                    uploadState[index] === "failure" ?
                                      <Box pb={1} className={classes.uploadFailure}>
                                        <Typography>Upload Failure ({total[index] !== undefined && total[index].toFixed(2)}MB/{loaded[index] !== undefined && loaded[index].toFixed(2)}MB at {speed[index] !== undefined && speed[index].toFixed(2)}MB/s)</Typography>
                                      </Box> : ''
                                  }
                                  <Button variant="contained" color="secondary" size="small" onClick={(event) => handleRemoveFile(event, acceptedFile)}>
                                    <DeleteIcon />
                                    <Typography>Remove</Typography>
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
              {
                activeStep === 1 || activeStep === 2 ?
                  <Grid item className={classes.padding20}>
                    <div className={classes.stepTitle}>Step 2: Details</div>
                    <Grid container>
                      <Grid item>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-customized-select-label">What language was spoken?</InputLabel>
                          <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={spokenLanguage}
                            onChange={handleChangeLanguage}
                          >
                            <MenuItem value="en-US">
                              English
                              <IconButton><IconFlagUS /></IconButton>
                              <IconButton><IconFlagUK /></IconButton>
                              <IconButton><IconFlagAU /></IconButton>
                            </MenuItem>
                            <MenuItem value="fr">
                              French
                              <IconButton><IconFlagFR /></IconButton>
                            </MenuItem>
                            <MenuItem value="de">
                              German
                              <IconButton><IconFlagDE /></IconButton>
                            </MenuItem>
                            <MenuItem value="es">
                              Spanish
                              <IconButton><IconFlagES /></IconButton>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" size="large" onClick={(event) => handleTranscribeStart()}>
                      <RecordVoiceOverIcon />
                      <Typography className={classes.iconBtnTextPos}>Start Transcribing Now</Typography>
                    </Button>
                  </Grid>
                  :
                  ''
              }
              {/* step 3 part */}
              {
                activeStep === 2 ?
                  <Grid item className={classes.padding20}>
                    <div className={classes.stepTitle}>Step 3: Transcribe</div>
                    <Grid container>
                      <Grid item>
                        {
                          allTranscribeState === 'transcribing' ?
                            <div>
                              <CircularProgress size={14} color="secondary" /> {transcribeStates.length}Files are transcribing
                            </div>
                            :
                            ''
                        }
                        {transcribedFiles.map((transcribedFile, index) => {
                          return (
                            <div key={index}>
                              <Box pt={1}>
                                <Button variant="contained" color="secondary" size="small" >
                                  <Typography className={classes.iconBtnTextPos}>View Content of {transcribedFile.file_name}</Typography>
                                </Button>
                              </Box>
                              <Box pt={1}>
                                <div>
                                  {
                                    transcribedFile.transcript !== undefined && transcribedFile.transcript
                                  }
                                </div>
                              </Box>
                            </div>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  :
                  ''
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UploadMedia.layout = Admin;

export default UploadMedia;

