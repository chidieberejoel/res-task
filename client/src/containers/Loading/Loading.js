import React, { Component } from "react";
import Spinner from "@atlaskit/spinner";

import "./Loading.css";

const size = 100;

class Spin extends Component {
  render() {
    return (
      <div className="Center">
        <span>
          <Spinner size={size} />
        </span>
      </div>
    );
  }
}

export default Spin;
