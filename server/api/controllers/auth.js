const graph = require("../graph");
const config = require("../config");
const logger = require("../config/winstonlog");

class Auth {
  static async getSignIn(req, res) {
    if (req.session.isLoggedIn) {
      return res.redirect("/");
    }
    const urlParameters = {
      scopes: config.scopes.split(),
      redirectUri: config.redirectUri,
    };

    try {
      const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(
        urlParameters,
      );
      res.redirect(authUrl);
    } catch (error) {
      logger.info(`Error: ${error}`);
      res.redirect("/");
    }
  }

  // Callback Snippet
  static async getCallback(req, res) {
    const tokenRequest = {
      code: req.query.code,
      scopes: config.scopes.split(),
      redirectUri: config.redirectUri,
    };

    try {
      const response = await req.app.locals.msalClient.acquireTokenByCode(
        tokenRequest,
      );

      await graph.getUserDetails(response.accessToken, req);
    } catch (error) {
      logger.info(`Error: ${error}`);
      res.redirect("/");
    }
    res.redirect("/");
  }

  // Check if a user session exist
  static async currentSession(req, res) {
    const { user } = req.session;
    if (!user) {
      res.send(false);
    } else {
      res.send(true);
    }
  }

  static async getSignOut(req, res) {
    // Sign out
    if (req.session.userId) {
      // Look up the user's account in the cache
      const accounts = await req.app.locals.msalClient
        .getTokenCache()
        .getAllAccounts();

      const userAccount = accounts.find(
        (a) => a.homeAccountId === req.session.user.homeAccountId,
      );

      // Remove the account
      if (userAccount) {
        req.app.locals.msalClient.getTokenCache().removeAccount(userAccount);
      }
    }

    // Destroy the user's session
    req.session.destroy(() => {
      res.redirect("/");
      logger.info("User sucessfully logged out");
    });
  }
}

module.exports = Auth;
