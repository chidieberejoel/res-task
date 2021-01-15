import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "styled-components";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import WarningIcon from "@atlaskit/icon/glyph/warning";

const Dummy = styled.div`
  border: 1px solid black;
  margin: 16px 0;
  padding: 20px;
  flex-direction: row !important;
  display: flex !important;
  border: 1px solid #d3d3d3;
  border-radius: 2px;
`;

const Rest = styled.div`
  flex-shrink: 0 !important;
  width: 75%;
  display: block;
`;

const Warning = styled.div`
  flex-shrink: 0 !important;
  width: 25%;
  display: block;
  text-align: center;
  color: #ca0b00;
  padding: 0 10px;
`;

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
                <Dummy>
                  <Rest>
                    <b>{result.name}</b>
                    <span style={{ display: "block" }}>
                      {result.open_hours}
                    </span>
                  </Rest>
                  {result.closing ? (
                    <Warning>
                      <WarningIcon />
                      <span style={{ display: "block" }}> Closes soon </span>
                    </Warning>
                  ) : (
                    ""
                  )}
                </Dummy>
              </GridColumn>
            ))}
          </Grid>
        </Page>
      </div>
    );
  }
}

export default SearchResults;
