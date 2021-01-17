import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import WarningIcon from "@atlaskit/icon/glyph/warning";

import "./SearchItems.css";

class SearchResults extends PureComponent {
  static propTypes = {
    matchingResults: PropTypes.arrayOf(PropTypes.object),
    onResultClicked: PropTypes.func,
  };

  render() {
    if (!this.props.matchingResults.length) {
      return <p>Nothing found, keep on searching!</p>;
    }

    return (
      <div>
        <Page>
          <Grid spacing="comfortable">
            {this.props.matchingResults.map((result) => (
              <GridColumn key={result._id} medium={6}>
                <div className="Dummy">
                  <div className="Result">
                    <b>{result.name}</b>
                    <span style={{ display: "block" }}>
                      {result.open_hours}
                    </span>
                  </div>
                  {result.closing ? (
                    <div className="Warning">
                      <WarningIcon />
                      <span style={{ display: "block" }}> Closes soon </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </GridColumn>
            ))}
          </Grid>
        </Page>
      </div>
    );
  }
}

export default SearchResults;
