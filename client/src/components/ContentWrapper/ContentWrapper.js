import React from "react";
import styled from "styled-components";
import { Grid, GridColumn } from "@atlaskit/page";
import { gridSize } from "@atlaskit/theme";

const Padding = styled.div`
  margin: ${gridSize() * 4}px ${gridSize() * 8}px;
  padding-bottom: ${gridSize() * 3}px;
`;

const gridValue = ({ children }) => (
  <Grid>
    <GridColumn>
      <Padding>{children}</Padding>
    </GridColumn>
  </Grid>
);

export default gridValue;
