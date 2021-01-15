import mongoDBSession from "connect-mongodb-session";
import session from "express-session";
import config from "./index";

const MongoDBStore = mongoDBSession(session);

module.exports = new MongoDBStore({
  uri: config.DbUrl,
  collection: "sessions",
});
