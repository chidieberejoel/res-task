import React, { Component } from "react";
import {
  AtlassianNavigation,
  CustomProductHome,
  generateTheme,
  SignIn,
} from "@atlaskit/atlassian-navigation";

import customIcon from "../../Assets/Images/logo123.jpg";

class Layout extends Component {
  theme = generateTheme({
    name: "high-contrast",
    backgroundColor: "#272727",
    highlightColor: "#E94E34",
  });

  CustomHome = () => (
    <CustomProductHome
      href="/"
      iconAlt="Sign Out"
      iconUrl={customIcon}
      logoAlt="Sign Out"
      logoUrl={customIcon}
    />
  );

  SignInExample = () => {
    return (
      <a href={"/auth/signout"}>
        <SignIn tooltip="Sign Out" />
      </a>
    );
  };

  render() {
    return (
      <AtlassianNavigation
        label="site"
        renderProductHome={this.CustomHome}
        testId="themed"
        renderSignIn={this.SignInExample}
        theme={this.theme}
      />
    );
  }
}

export default Layout;
