const express = require("express");
const msal = require("@azure/msal-node");
const config = require("./config");
const loader = require("./loaders");
const session = require("./loaders/session");
const routes = require("./loaders/route");
const logger = require("./config/winstonlog");
const Database = require("./config/dbConnection");

// Works with require statement

const app = express();

// Initialize app with dependencies
loader.init(app);

// Initialize app with sessions connections
session.init(app);

// Load routes and error handlers
routes.init(app);

// MSAL config
const msalConfig = {
  auth: {
    clientId: config.clientId,
    authority: config.authority,
    clientSecret: config.clientSecret,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message) {
        logger.info(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);

// Initialize database connection
const db = new Database();
db.connect(config.DbUrl);

module.exports = app;
