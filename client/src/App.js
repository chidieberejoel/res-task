import React, { Component } from "react";

import axios from "./axios-orders";

import Dashboard from "./containers/Dashboard/Dashboard";
import Loading from "./containers/Loading/Loading";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  state = {
    auth: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/auth/current-session", { withCredentials: true })
      .then((res) => {
        this.setState({ loading: false, auth: res.data });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.auth) {
      return <Dashboard />;
    }
    return <Auth />;
  }
}

export default App;
