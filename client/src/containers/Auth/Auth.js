import React, { Component } from "react";

import AuthPage from "../../components/Auth/Auth";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

class Auth extends Component {
  render() {
    return (
      <ContentWrapper>
        <div>
          <AuthPage />
        </div>
      </ContentWrapper>
    );
  }
}

export default Auth;
