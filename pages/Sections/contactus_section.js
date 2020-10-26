import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/transcribe/sections/contactus_section_style.js";

const useStyles = makeStyles(styles);

export default function ContactusSection() {
  const classes = useStyles();
  const photo_url = require('assets/img/faces/marc.jpg');
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.sectionTitle}>Contact Us</div>
      </GridItem>
      {/* photo part */}
    </GridContainer>
  );
}
