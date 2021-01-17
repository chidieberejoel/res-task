import React, { Component } from "react";
import "@atlaskit/css-reset";
import PropTypes from "prop-types";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import SearchResults from "../../components/SearchItems/SearchItems";
import Layout from "../../hoc/Layout/Layout";

import Loading from "../Loading/Loading";
import axios from "../../axios-orders";

import "./Dashboard.css";

class SearchDrawer extends Component {
  static propTypes = {
    onResultClicked: PropTypes.func,
    onSearchInputRef: PropTypes.func,
  };

  state = {
    searchString: "",
    loading: true,
    results: [],
  };

  componentDidMount() {
    axios
      .get("/dashboard")
      .then((res) => {
        this.setState({ loading: false, results: res.data });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  filterChange = () => {
    this.setState({
      searchString: this.searchInput.value,
    });
  };

  searchResults = () => {
    const { results, searchString } = this.state;

    const matchingResults = results.filter(
      (c) =>
        c.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
        (c.open_hours &&
          c.open_hours.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
    );

    return (
      <SearchResults
        matchingResults={matchingResults}
        onResultClicked={() => {
          this.props.onResultClicked();
          this.searchInput.value = "";
          this.filterChange();
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Layout>
        <ContentWrapper>
          <div>
            <input
              type="text"
              placeholder="Search..."
              onKeyUp={this.filterChange}
              className="SearchInput"
              ref={(el) => {
                this.searchInput = el;
                if (this.props.onSearchInputRef) {
                  this.props.onSearchInputRef(el);
                }
              }}
            />
            {this.searchResults()}
          </div>
        </ContentWrapper>
      </Layout>
    );
  }
}

export default SearchDrawer;
