import React, { useState, useEffect } from "react";

import axios from "./axios-orders";

import Dashboard from "./containers/Dashboard/Dashboard";
import Loading from "./containers/Loading/Loading";
import Auth from "./containers/Auth/Auth";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/current-session", { withCredentials: true })
      .then(({ data }) => {
        setAuth(data);
      });
  }, []);

  if (auth === null) {
    return <Loading />;
  }
  if (auth) {
    return <Dashboard />;
  }
  return <Auth />;
}

export default App;
