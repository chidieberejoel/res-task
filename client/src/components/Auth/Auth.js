import React, { PureComponent } from "react";
import Page, { Grid, GridColumn } from "@atlaskit/page";

import Avatar from "../UI/Avatar/Avatar";
import Button from "../UI/Button/Button";
import "./Auth.css";

class AuthVal extends PureComponent {
  render() {
    return (
      <Page>
        <div className="Centered">
          <div className="DivContainer">
            <Grid layout="fluid">
              <GridColumn medium={12}>
                <h2>Welcome!</h2>
                <Avatar />
                <Button />
              </GridColumn>
            </Grid>
          </div>
        </div>
      </Page>
    );
  }
}

export default AuthVal;
