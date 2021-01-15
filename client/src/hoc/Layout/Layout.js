import React, { Component } from "react";

import Aus from "../Aus/Aus";
import classes from "./Layout.css";
import Navigation from "../../components/Navigation/Navigation";

class Layout extends Component {
  render() {
    return (
      <Aus>
        <Navigation />
        <main className={classes.Content}>{this.props.children}</main>
      </Aus>
    );
  }
}

export default Layout;
