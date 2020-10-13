import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import { DataGrid } from '@material-ui/data-grid';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// call api
import userAPI from "../../apis/user";

const styles = {
  displayFlex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  personAdd: {
    paddingRight: "10px",
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
};

const useStyles = makeStyles(styles);

function User() {
  const classes = useStyles();
  // dialog variable
  const [openDialog, setOpenDialog] = React.useState(false);
  // dialog handle event
  const handleOpenDialog = () => { setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); };
  const [userInfo, setuserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const handleAddNewUser = () => {
    if (validateEmail(userInfo.email) !== true) {
      alert("Email is not validate. Please insert correct Email.")
    } else if(userInfo.first_name === "" || userInfo.last_name === "" || userInfo.email === "") {
      alert("Please insert all information.")
    } else {
      userAPI.addUser(userInfo)
        .then(
          response => {
            console.log(response)
            if(response.data.message === 'success') {
              alert("Adding new user success!")
            } else {
              alert("adding new user failed!")
            }
            setOpenDialog(false)
          },
          error => {
            console.log(error)
          }
        )
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  const [rows, setRows] = useState([]);
  const getUsers = () => {
    userAPI.users()
      .then(
        response => {
          console.log(response.users)
          setRows(response.users)
        },
        error => {
          console.log(error)
        }
      )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.getValue('first_name') || ''} ${params.getValue('last_name') || ''}`,
    },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'permission', headerName: 'Permission', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 250 },
    { field: 'updatedAt', headerName: 'Updated At', width: 250 },
  ];

  const handleInputChange = (event) => {
    switch(event.target.id){
      case "firstName":
        userInfo.first_name = event.target.value
        break;
      case "lastName":
        userInfo.last_name = event.target.value
        break;
      case "email":
        userInfo.email = event.target.value
        break;
    }
  }

  const validateEmail = (email) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>User List</h4>
              <p className={classes.cardCategoryWhite}>
                This is a user list page.
              </p>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <Grid className={`${classes.displayFlex} ${classes.justifyEnd}`}>
                  <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    <PersonAdd className={classes.personAdd} />
                    Add new user
                  </Button>
                </Grid>
              </GridItem>
              <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection fullWidth />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* User add dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">User Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert all information to add user.
          </DialogContentText>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

User.layout = Admin;

export default User;
