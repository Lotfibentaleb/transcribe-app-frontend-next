import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// @material-ui/icons
// import BusinessCenter from "@material-ui/icons/BusinessCenter";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
// import Email from "@material-ui/icons/Email";
// import Business from "@material-ui/icons/Business";
// import LocationCity from "@material-ui/icons/LocationCity";

import styles from "assets/jss/accuscript/sections/pricing_section_style.js";

const useStyles = makeStyles(styles);

export default function PricingSection() {
  const classes = useStyles();
  const check_png = require('assets/img/check.png');
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
        <div className={classes.sectionTitle}>Pricing</div>
      </GridItem>
      {/* standard pricing card */}
      <GridItem xs={12} sm={6} md={4} className={classes.marginAuto}>
        <Card plain className={classes.pricingCard}>
          <div className={classes.cartTitleSection}>
            {/* <BusinessCenter className={classes.icons, classes.cardTitleIcon} /> */}
            <div>
              <div className={classes.cardTitle}>Pay as you go</div>
            </div>
          </div>
          <CardBody className={classes.cardBody}>
            <p className={classes.priceFont}>
              <b>$0.05</b> / minute  
            </p>
            <p className={classes.description}>
              Rounded to nearest 15 seconds
            </p>
            <Grid container className={classes.liTextMargin}>
              <Grid item xs={2}>
                <img src={check_png} className={classes.checkImgSize}/>
              </Grid>
              <Grid item xs={10}>
                No usage limits
              </Grid>
            </Grid>
            <Grid container className={classes.liTextMargin}>
              <Grid item xs={2}>
                <img src={check_png} className={classes.checkImgSize}/>
              </Grid>
              <Grid item xs={10}>
                Handles all media types
              </Grid>
            </Grid>
            <Grid container className={classes.liTextMargin}>
              <Grid item xs={2}>
                <img src={check_png} className={classes.checkImgSize}/>
              </Grid>
              <Grid item xs={10}>
                Email support
              </Grid>
            </Grid>
          </CardBody>
          <CardFooter className={classes.justifyCenter}>
            <Button className={classes.button}>
              <ShoppingCart className={classes.icons} /> Get Started
              </Button>
          </CardFooter>
        </Card>
      </GridItem>
      {/* premium pricing card */}
      <GridItem xs={12} sm={6} md={8} className={classes.marginAuto}>
      {/* <Card plain className={classes.pricingCard}> */}
        <div className={classes.backgroundImg}>
          <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvBVWMjSNfNI45Co7Hh0b-m8wsidji2nzxw&usqp=CAU'} className={classes.paypalImg}/>
        </div> 
      {/* </Card> */}
      </GridItem>
    </GridContainer>
  );
}
