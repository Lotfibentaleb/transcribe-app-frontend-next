import React, { useEffect, useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
// @material-ui/core components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// layout for this page
import Transcribe from "layouts/Admin.js";
// core components
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// call api
import userAPI from "apis/user";

// style
import useStyles from "assets/jss/accuscript/admin/price.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Profile(props) {
  // styles
  const classes = useStyles();
  // snackbar variables and handle events
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [openMessage, setOpenMessage] = useState(false);
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };

  const [profileInfo, setProfileInfo] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  const [passwordInfo, setPasswordInfo] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleChange = (prop) => (event) => {
    setProfileInfo({ ...profileInfo, [prop]: event.target.value });
  };

  const handlePasswordChange = (prop) => (event) => {
    setPasswordInfo({ ...passwordInfo, [prop]: event.target.value });
  };

  const handlePasswordReset = () => {
    setPasswordInfo({
      ...passwordInfo,
      current_password: '',
      new_password: '',
      confirm_password: '', 
    });
  }

  const validateEmail = (email) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  }

  // handle edit price
  const handleUpdateProfile = () => {
    if (validateEmail(profileInfo.email) !== true) {
      setMessageType("warning")
      setMessage("Email is not validate. Please insert correct Email.")
      setOpenMessage(true);
    } else if (profileInfo.first_name === "" || profileInfo.last_name === "" || profileInfo.email === "") {
      setMessageType("warning")
      setMessage("Please insert all information.")
      setOpenMessage(true);
    } else {
      userAPI.updateProfile(profileInfo)
      .then(
        response => {
          if (response.msg === 'Request failed with status code 401') {
            setMessageType("error")
            setMessage(response.msg)
            setOpenMessage(true);
            setTimeout(function () { Router.push("/auth/signin"); }, 5000);
          }
          if (response.msg === 'success') {
            setMessageType("success")
            setMessage("Updating Profile success!")
            setOpenMessage(true);
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

  // initial method
  useEffect(() => {
    getProfile();
  }, [])

  const getProfile = () => {
    userAPI.profile()
      .then(
        response => {
          if (response.msg === 'Request failed with status code 401') {
            setMessageType("error")
            setMessage(response.msg)
            setOpenMessage(true);
            setTimeout(function () { Router.push("/auth/signin"); }, 5000);
          } else {
            setProfileInfo(profileInfo => ({
              ...profileInfo,
              email: response.profile[0].email,
              first_name: response.profile[0].first_name,
              last_name: response.profile[0].last_name,
            }));
            console.log(profileInfo.first_name)
            console.log(profileInfo.last_name)
            console.log(profileInfo.email)
          }
        },
        error => {
          setMessageType("error")
          setMessage(error)
          setOpenMessage(true);
        }
      )
  }

  //reset password
  const handleResetPassword = () => {
    if (passwordInfo.current_password === "") {
      setMessageType("warning")
      setMessage("Please insert current password.")
      setOpenMessage(true);
    } else if (passwordInfo.new_password !== passwordInfo.confirm_password) {
      setMessageType("warning")
      setMessage("Incorrect password and confirm password. Please insert corract password and confirm password.")
      setOpenMessage(true);
    } else if (passwordInfo.new_password === "") {
      setMessageType("warning")
      setMessage("Please insert new password.")
      setOpenMessage(true);
    } else if (passwordInfo.confirm_password === "") {
      setMessageType("warning")
      setMessage("Please insert confirm password.")
      setOpenMessage(true);
    } else {
      userAPI.resetPassword(passwordInfo)
      .then(
        response => {
          if (response.msg === 'Request failed with status code 401') {
            setMessageType("error")
            setMessage(response.msg)
            setOpenMessage(true);
            setTimeout(function () { Router.push("/auth/signin"); }, 5000);
          }
          if (response.msg === 'success') {
            setMessageType("success")
            setMessage("Resetting Password success!")
            setOpenMessage(true);
            handlePasswordReset();
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

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
              <h4 className={classes.cardTitleWhite}>User Profile</h4>
              <p className={classes.cardCategoryWhite}>
                This is an user profile page.
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer justify="center" alignItems="center">
                <GridItem xs={12} sm={6} md={12} lg={12} >
                  <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: profileInfo.email,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                        onChange={handleChange('email')}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={12} lg={12} >
                  <CustomInput
                      labelText="First Name"
                      id="first_name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: profileInfo.first_name,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange('first_name')}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={12} lg={12} >
                  <CustomInput
                      labelText="Last Name"
                      id="last_name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: profileInfo.last_name,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange('last_name')}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                </GridItem>                
                {
                  <GridItem xs={12} sm={6} md={8} lg={8} >
                    <Box display="flex" justifyContent="flex-start" alignItems="center" p={1}>
                      <Button variant="contained" color="primary" size="large" onClick={handleUpdateProfile}>
                        Update Profile
                      </Button>
                    </Box>
                  </GridItem>
                }
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
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
              <h4 className={classes.cardTitleWhite}>Setting Password</h4>
              <p className={classes.cardCategoryWhite}>
                This is the page to reset password.
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer justify="center" alignItems="center">
                <GridItem xs={12} sm={6} md={4} lg={4}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center" p={1}>
                    <strong>Current Password: </strong>
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={6} md={8} lg={8} >
                <CustomInput
                      labelText="Password"
                      id="current_password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        value: passwordInfo.current_password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handlePasswordChange('current_password')}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center" p={1}>
                    <strong>New Password: </strong>
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={6} md={8} lg={8} >
                <CustomInput
                      labelText="New Password"
                      id="new_password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        value: passwordInfo.new_password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handlePasswordChange('new_password')}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center" p={1}>
                    <strong>Confirm Password: </strong>
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={6} md={8} lg={8} >
                  <CustomInput
                      labelText="Confirm Password"
                      id="confirm_password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        value: passwordInfo.confirm_password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handlePasswordChange('confirm_password')}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                </GridItem>                
                {
                  <GridItem xs={12} sm={6} md={8} lg={8} >
                    <Box display="flex" justifyContent="flex-start" alignItems="center" p={1}>
                      <Button variant="contained" color="primary" size="large" onClick={handleResetPassword}>
                        Reset Password
                      </Button>
                    </Box>
                  </GridItem>
                }
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
      </GridContainer> */}
    </div>
  );
}

Profile.layout = Transcribe;

export default Profile;
