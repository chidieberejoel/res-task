const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("../config");

module.exports = {
  init: (app) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(
      cors({
        credentials: true,
        origin: config.clientHost,
      }),
    );
  },
};
