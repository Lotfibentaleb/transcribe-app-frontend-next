import { cardTitle, title } from "assets/jss/nextjs-material-kit.js";
import imagesStyle from "assets/jss/nextjs-material-kit/imagesStyles.js";

const pricingCardStyle = {
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  pricingCard: {
    padding: " 20px 0px",
    border: "2px #cbe5f5 solid",
    transition: "all .3s ease-in-out",
    position: "relative",
    willChange: "transform",
    "&:hover": {
      webkitTransform: "scale(1.02)",
      transform: "scale(1.02)",
      webkitBoxShadow: "0 20px 35px 0 rgba(0,0,0,.1)",
      boxShadow: "0 20px 35px 0 rgba(0,0,0,.1)",
    },
    "&:hover:after, &:after": {
      width: "100%",
    },
    "&:after": {
      content: "''",
      position: "absolute",
      top: "0",
      left: "0",
      width: "0",
      height: "5px",
      backgroundColor: "#2a93d5",
      webkitTransition: ".5s",
      transition: ".5s",
    },
  },
  section: {
    padding: "70px 50px",
    textAlign: "center"
  },
  ...imagesStyle,
  itemGrid: {
    margin: "30px auto 20px auto",
  },
  cartTitleSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: "20px",
  },
  cardTitleIcon: {
    fontSize: "50px",
    color: "#2276aa",
    marginRight: "20px"
  },
  cardTitle: {
    color: "#2276aa",
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.5"
  },
  smallTitle: {
    color: "#2276aa",
    fontSize: "14px"
  },
  cardBody: {
    minHeight: "200px",
    padding: "20px 40px",
  },
  description: {
    display: "flex",
    textAlign: "start",
    color: "#333"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  button: {
    backgroundColor: "#2276aa",
    "&:hover": {
      backgroundColor: "#2276aa",
    },
    "&:focus": {
      backgroundColor: "#2276aa",
    }
  },
};

export default pricingCardStyle;
