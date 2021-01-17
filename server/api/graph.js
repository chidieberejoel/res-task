import logger from "./config/winstonlog";
import User from "./models/user";

const graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

const getAuthenticatedClient = (accessToken) => {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to
    // authenticate requests
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return client;
};

module.exports = {
  async getUserDetails(accessToken, req) {
    const client = getAuthenticatedClient(accessToken);

    const userClient = await client
      .api("/me")
      .select("displayName,mail,userPrincipalName")
      .get();

    const user = await User.findOne({
      email: userClient.mail || userClient.userPrincipalName,
    });

    try {
      if (!user) {
        const newUser = new User({
          email: userClient.mail || userClient.userPrincipalName,
          displayName: userClient.displayName,
        });
        await newUser.save();
        logger.info("New User Saved");

        req.session.user = newUser;
      } else {
        req.session.user = user;
      }
      req.session.isLoggedIn = true;
      // save session upon login
      await req.session.save();
      logger.info("Session Saved");
    } catch (err) {
      logger.info(`Error: ${err}`);
    }

    logger.info("UserClient Returned");
    return userClient;
  },
};
