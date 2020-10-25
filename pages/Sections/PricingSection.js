import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// @material-ui/icons
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Email from "@material-ui/icons/Email";
import Business from "@material-ui/icons/Business";
import LocationCity from "@material-ui/icons/LocationCity";

import styles from "assets/jss/transcribe/sections/pricing_section_style.js";

const useStyles = makeStyles(styles);

export default function SectionPricingCards() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <div className={classes.section}>
      <GridContainer>
        {/* standard pricing card */}
        <GridItem xs={12} sm={6} md={4} className={classes.marginAuto}>
          <Card plain className={classes.pricingCard}>
            <div className={classes.cartTitleSection}>
              <BusinessCenter className={classes.icons, classes.cardTitleIcon} />
              <div>
                <div className={classes.cardTitle}>Standard</div>
                <small className={classes.smallTitle}>PAY-AS-YOU-GO</small>
              </div>
            </div>
            <CardBody className={classes.cardBody}>
              <p className={classes.description}>
                Pay-as-you-go transcription. Perfect for project-based work.
                <br />
                <br />
                $10 / HOUR
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button className={classes.button}>
                <ShoppingCart className={classes.icons} /> Buy Standard
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        {/* premium pricing card */}
        <GridItem xs={12} sm={6} md={4} className={classes.marginAuto}>
          <Card plain className={classes.pricingCard}>
            <div className={classes.cartTitleSection}>
              <Business className={classes.icons, classes.cardTitleIcon} />
              <div>
                <div className={classes.cardTitle}>Premium</div>
                <small className={classes.smallTitle}>SUBSCRIPTION</small>
              </div>
            </div>
            <CardBody className={classes.cardBody}>
              <p className={classes.description}>
                More frequent transcription needs with advanced collaboration tools.
                <br />
                <br />
                $5 / HOUR
                <br />
                PLUS $22 PER USER/MONTH
                <br />
                (SAVE 25% IF BILLED ANNUALLY)
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button className={classes.button}>
                <ShoppingCart className={classes.icons} /> Buy Premium
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        {/* enterprise pricing card */}
        <GridItem xs={12} sm={6} md={4} className={classes.marginAuto}>
          <Card plain className={classes.pricingCard}>
            <div className={classes.cartTitleSection}>
              <LocationCity className={classes.icons, classes.cardTitleIcon} />
              <div>
                <div className={classes.cardTitle}>Enterprise</div>
                <small className={classes.smallTitle}>SUBSCRIPTION</small>
              </div>
            </div>
            <CardBody className={classes.cardBody}>
              <p className={classes.description}>
                PLEASE CONTACT OUR
                <br />
                ENTERPRISE TEAM
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button className={classes.button}>
                <Email className={classes.icons} /> Contact Us
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
