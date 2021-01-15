import session from "express-session";
import User from "../models/user";
import store from "../config/store";
import config from "../config";

export default {
  init: (app) => {
    // Session middleware
    app.use(
      session({
        maxAge: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
          maxAge: 7 * 24 * 60 * 60 * 1000,
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
