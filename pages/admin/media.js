import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import CloudUpload from "@material-ui/icons/CloudUpload";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const styles = {
  displayFlex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  cloudUpload: {
    paddingRight: "10px",
  },
  datePicker: {
    marginRight: "20px"
  },
  viewMediaButton: {
    marginTop: "10px",
    height: "40px",
    minWidth: "120px"
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

function Media() {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Media Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <Grid className={`${classes.displayFlex} ${classes.justifyEnd}`}>
                  <Button variant="contained" color="primary">
                    <CloudUpload className={classes.cloudUpload} />
                    Upload File
                  </Button>
                </Grid>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid className={`${classes.displayFlex} ${classes.justifyStart}`}>
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
                    <Button variant="contained" color="primary" className={classes.viewMediaButton}>
                      View Medias
                    </Button>
                  </Grid>
                </MuiPickersUtilsProvider>
              </GridItem>
              <Table
                tableHeaderColor="primary"
                tableHead={["Media ID", "Media File", "Expert Options", "Created On", "Finished On", "Metadata", "Credit Used", "Status"]}
                tableData={[
                  ["001", "001.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                  ["002", "002.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                  ["003", "003.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                  ["004", "004.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                  ["005", "005.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                  ["006", "006.mov", "Download", "10/07/2020 13:00:00", "10/07/2020 13:03:30", "Submitted via Sergey", "10m 43s", "Complete"],
                ]}
              />
              <GridItem xs={12} sm={12} md={12}>
                <Grid className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                  <Button variant="contained" color="primary" disabled>
                    Previous
                  </Button>
                  <Button variant="contained" color="primary">
                    Next
                  </Button>
                </Grid>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Media.layout = Admin;

export default Media;
