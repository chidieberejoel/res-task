import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  DbUrl: process.env.DB_URL,
  clientHost: process.env.CLIENT_HOST,
  sessionSecret: process.env.SESSION_SECRET,
  clientId: process.env.OAUTH_APP_ID,
  authority: process.env.OAUTH_AUTHORITY,
  clientSecret: process.env.OAUTH_APP_SECRET,
  scopes: process.env.OAUTH_SCOPES,
  redirectUri: process.env.OAUTH_REDIRECT_URI,
};
