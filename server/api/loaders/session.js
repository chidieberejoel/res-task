const session = require("express-session");
const User = require("../models/user");
const store = require("../config/store");
const config = require("../config");

const isDevMode = config.nodeEnv === "development";

module.exports = {
  init: (app) => {
    if (!isDevMode) {
      app.set("trust proxy", 1);
    }

    // Session middleware
    app.use(
      session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: true,
          httpOnly: true,
          secure: !isDevMode,
        },
      }),
    );

    app.use((req, res, next) => {
      res.locals.isAuthenticated = req.session.isLoggedIn;
      next();
    });

    // Set up local vars for template layout
    app.use((req, res, next) => {
      if (!req.session.user) {
        return next();
      }
      // eslint-disable-next-line no-underscore-dangle
      User.findById(req.session.user._id)
        .then((user) => {
          if (!user) {
            return next();
          }
          req.user = user;
          next();
        })
        .catch((err) => {
          next(new Error(err));
        });
    });
  },
};
