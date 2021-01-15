import express from "express";
import config from "./config";
import loader from "./loaders";
import session from "./loaders/session";
import routes from "./loaders/route";
import logger from "./config/winstonlog";
import Database from "./config/dbConnection";

// Works with require statement
const msal = require("@azure/msal-node");

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

export default app;
