const logger = require("../config/winstonlog");
const config = require("../config");

class GetIndex {
  static async index(req, res) {
    try {
      res.redirect(config.clientHost);
      logger.info("Index page visited");
    } catch (err) {
      res.status(500).send(err);
      logger.warn(`Error: ${err}`);
    }
  }
}

module.exports = GetIndex;
