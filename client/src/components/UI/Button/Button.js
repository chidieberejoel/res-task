import React, { Component } from "react";

import "./Button.css";

class AuthButton extends Component {
  render() {
    return (
      <a className="LoginLink" href={"/auth/signin"}>
        <svg
          aria-hidden="true"
          version="1.1"
          width="40"
          height="40"
          style={{ display: "inline-block" }}
        >
          <path fill="#f25022" d="M13 11h9v9h-9z" />
          <path fill="#00a4ef" d="M13 21h9v9h-9z" />
          <path fill="#7fba00" d="M23 11h9v9h-9z" />
          <path fill="#ffb900" d="M23 21h9v9h-9z" />
        </svg>
        Sign In with Microsoft
      </a>
    );
  }
}

export default AuthButton;
