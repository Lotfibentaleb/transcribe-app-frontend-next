import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

// @material-ui/icons
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TelegramIcon from "@material-ui/icons/Telegram";

import styles from "assets/jss/transcribe/landing.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Transcribe"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter responsive image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Transcribe</h1>
              <h4>
                Transcribing and editing speeches is painful.
                We make it fast, simple, and affordable.
              </h4>
              <br />
              <Button
                color="success"
                size="lg"
                href="#"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
                Try transcribe for free
              </Button>
              <Button
                color="danger"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayArrowIcon />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
