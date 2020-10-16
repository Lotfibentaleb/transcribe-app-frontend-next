import React, { useEffect, useState, useCallback } from "react";
import Dropzone from 'react-dropzone';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// @material-ui/icons
import ErrorOutline from "@material-ui/icons/ErrorOutline";
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
  errorOutline: {
    fontSize: "16px",
    marginLeft: "5px",
    marginTop: "-5px"
  },
  padding20: {
    padding: "20px 0"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// stepper handlers
function getSteps() {
  return ['Upload File', 'Add Details', 'We Transcribe'];
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

  // steppers
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // dropzone
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [progress, setProgress] = React.useState(0);

  const addKeyInAcceptedFiles = (selectedFiles) => {
    setAcceptedFiles(selectedFiles)    
  }

  const callbackProgress = (progress) => {
    if(progress > 99){
      progress = 99;
    }
    console.log('progress', progress)
    setProgress(progress);
  }

  // initial method
  useEffect(() => {
  }, [])

  useEffect(() => {
    fileUpload();
  }, [acceptedFiles])

  const fileUpload = () => {
    if(acceptedFiles.length !== 0) {
      var fileUploadInfo = new FormData();
      acceptedFiles.forEach((file) => {
        fileUploadInfo.append('file', file);
      });
      uploadMediaAPI.upload(fileUploadInfo, callbackProgress)
        .then(
          response => {
            console.log(response)
          },
          error => {
            console.log(error)
          }
        )
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
                            <ErrorOutline className={classes.errorOutline} />
                            </Grid>
                          <Grid container alignItems="center">
                            <div>Our max file size is 4GB</div>
                            <ErrorOutline className={classes.errorOutline} />
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
                Step 1: File
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

