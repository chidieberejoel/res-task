const mongoDBSession = require("connect-mongodb-session");
const session = require("express-session");
const config = require("./index");

const MongoDBStore = mongoDBSession(session);

// Store user sessions in DB
module.exports = new MongoDBStore({
  uri: config.DbUrl,
  collection: "sessions",
});
