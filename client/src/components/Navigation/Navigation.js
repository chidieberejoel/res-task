import React from "react";
import {
  AtlassianNavigation,
  CustomProductHome,
  generateTheme,
  SignIn,
} from "@atlaskit/atlassian-navigation";

import customIcon from "../UI/Assets/Images/logo123.jpg";

const theme = generateTheme({
  name: "high-contrast",
  backgroundColor: "#272727",
  highlightColor: "#E94E34",
});

const CustomHome = () => (
  <CustomProductHome
    href="/"
    iconAlt="Sign Out"
    iconUrl={customIcon}
    logoAlt="Sign Out"
    logoUrl={customIcon}
  />
);

const SignInExample = () => {
  return (
    <a href={"/auth/signout"}>
      <SignIn tooltip="Sign Out" />
    </a>
  );
};

const ThemingExample = () => (
  <AtlassianNavigation
    label="site"
    renderProductHome={CustomHome}
    testId="themed"
    renderSignIn={SignInExample}
    theme={theme}
  />
);

export default ThemingExample;
