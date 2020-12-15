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

  const handleChange = (prop) => (event) => {
    setProfileInfo({ ...profileInfo, [prop]: event.target.value });
  };

  // handle edit price
  const handleUpdateProfile = () => {
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
            setMessage("Editing User success!")
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
            // setPriceValue(priceValue => ({
            //   ...priceValue,
            //   price_per_half_minute: response.price.price_per_half_minute,
            //   price_per_minute: response.price.price_per_minute,
            //   minimum_price: response.price.minimum_price,
            // }));
          }
        },
        error => {
          setMessageType("error")
          setMessage(error)
          setOpenMessage(true);
        }
      )
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                        onChange={handleChange('email')}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={6} md={4} lg={4}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center" p={1}>
                    <strong>First Name: </strong>
                  </Box>
                </GridItem> */}
                <GridItem xs={12} sm={6} md={12} lg={12} >
                <CustomInput
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
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
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
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
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange('email')}
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
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange('email')}
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
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Lock className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                </GridItem>                
                {
                  <GridItem xs={12} sm={6} md={8} lg={8} >
                    <Box display="flex" justifyContent="flex-start" alignItems="center" p={1}>
                      <Button variant="contained" color="primary" size="large" onClick={handleUpdateProfile}>
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
