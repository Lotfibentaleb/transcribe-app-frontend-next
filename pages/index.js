import React, { Component } from "react";
import Router from "next/router";

export default class Index extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      Router.push("/admin/dashboard");
    }
    Router.push("/signin");
  };

  render() {
    return <div />;
  }
}
